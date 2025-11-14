package com.crowdfunding.backend.service;

import com.crowdfunding.backend.model.Campaign;
import com.crowdfunding.backend.repository.CampaignRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CampaignService {

    private final CampaignRepository campaignRepository;

    public Campaign createCampaign(Campaign campaign) {
        campaign.setStatus(Campaign.Status.DRAFT);
        return campaignRepository.save(campaign);
    }

    public Optional<Campaign> findById(Long id) {
        return campaignRepository.findById(id);
    }

    public Page<Campaign> findAll(Pageable pageable) {
        return campaignRepository.findAll(pageable);
    }

    public Page<Campaign> findActiveCampaigns(Pageable pageable) {
        return campaignRepository.findActiveCampaigns(LocalDateTime.now(), pageable);
    }
    
    public Page<Campaign> findAllCampaigns(Pageable pageable) {
        return campaignRepository.findAll(pageable);
    }

    public Page<Campaign> searchCampaigns(String keyword, Pageable pageable) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return findActiveCampaigns(pageable);
        }
        return campaignRepository.searchActiveCampaigns(keyword.trim(), LocalDateTime.now(), pageable);
    }

    public Page<Campaign> findByCategory(Campaign.Category category, Pageable pageable) {
        return campaignRepository.findActiveCampaignsByCategory(category, LocalDateTime.now(), pageable);
    }

    public Campaign updateCampaign(Campaign campaign) {
        Campaign existingCampaign = campaignRepository.findById(campaign.getId())
                .orElseThrow(() -> new RuntimeException("Campaign not found"));

        // Update allowed fields
        existingCampaign.setTitle(campaign.getTitle());
        existingCampaign.setDescription(campaign.getDescription());
        existingCampaign.setShortDescription(campaign.getShortDescription());
        existingCampaign.setGoalAmount(campaign.getGoalAmount());
        existingCampaign.setStartDate(campaign.getStartDate());
        existingCampaign.setEndDate(campaign.getEndDate());
        existingCampaign.setCategory(campaign.getCategory());
        existingCampaign.setImageUrl(campaign.getImageUrl());
        existingCampaign.setVideoUrl(campaign.getVideoUrl());

        return campaignRepository.save(existingCampaign);
    }

    public Campaign publishCampaign(Long campaignId) {
        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));

        if (campaign.getStatus() != Campaign.Status.DRAFT) {
            throw new RuntimeException("Only draft campaigns can be published");
        }

        LocalDateTime now = LocalDateTime.now();
        if (campaign.getStartDate().isAfter(now)) {
            throw new RuntimeException("Start date must be now or earlier to publish");
        }

        campaign.setStatus(Campaign.Status.ACTIVE);
        return campaignRepository.save(campaign);
    }

    public Campaign cancelCampaign(Long campaignId) {
        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));

        if (campaign.getStatus() != Campaign.Status.ACTIVE) {
            throw new RuntimeException("Only active campaigns can be cancelled");
        }

        campaign.setStatus(Campaign.Status.CANCELLED);
        return campaignRepository.save(campaign);
    }

    public void updateRaisedAmount(Long campaignId, BigDecimal amount) {
        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));

        campaign.setRaisedAmount(campaign.getRaisedAmount().add(amount));
        campaignRepository.save(campaign);
    }

    public List<Campaign> getExpiredCampaigns() {
        return campaignRepository.findExpiredCampaigns(LocalDateTime.now());
    }

    public void completeExpiredCampaigns() {
        List<Campaign> expiredCampaigns = getExpiredCampaigns();
        for (Campaign campaign : expiredCampaigns) {
            campaign.setStatus(Campaign.Status.COMPLETED);
            campaignRepository.save(campaign);
        }
    }
}