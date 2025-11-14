package com.crowdfunding.backend.service;

import com.crowdfunding.backend.model.Campaign;
import com.crowdfunding.backend.model.Donation;
import com.crowdfunding.backend.repository.DonationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class DonationService {

    private final DonationRepository donationRepository;
    private final CampaignService campaignService;

    public Donation createDonation(Donation donation, Campaign campaign) {
        donation.setCampaign(campaign);
        donation.setTransactionId(generateTransactionId());

        // For now, we'll simulate payment processing
        // In a real application, this would integrate with a payment gateway
        donation.setPaymentStatus(Donation.PaymentStatus.COMPLETED);

        Donation savedDonation = donationRepository.save(donation);

        // Update campaign raised amount
        campaignService.updateRaisedAmount(campaign.getId(), donation.getAmount());

        return savedDonation;
    }

    public Optional<Donation> findById(Long id) {
        return donationRepository.findById(id);
    }

    public Page<Donation> findByCampaign(Campaign campaign, Pageable pageable) {
        return donationRepository.findByCampaignId(campaign.getId(), pageable);
    }

    public BigDecimal getTotalDonationsByCampaign(Campaign campaign) {
        BigDecimal total = donationRepository.getTotalDonationsByCampaign(campaign.getId());
        return total != null ? total : BigDecimal.ZERO;
    }

    public long getDonationCountByCampaign(Campaign campaign) {
        return donationRepository.countCompletedDonationsByCampaign(campaign.getId());
    }

    public List<Donation> getPendingDonationsOlderThan(int hours) {
        LocalDateTime cutoffTime = LocalDateTime.now().minusHours(hours);
        return donationRepository.findPendingDonationsOlderThan(cutoffTime);
    }

    public void cancelPendingDonations(List<Donation> donations) {
        for (Donation donation : donations) {
            donation.setPaymentStatus(Donation.PaymentStatus.FAILED);
            donationRepository.save(donation);
        }
    }

    public List<Donation> getDonationsInDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return donationRepository.findCompletedDonationsInDateRange(startDate, endDate);
    }

    private String generateTransactionId() {
        return "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    // Simulate payment processing - in real app, this would call payment gateway
    public boolean processPayment(Donation donation) {
        // Simulate payment processing delay
        try {
            Thread.sleep(100); // Simulate processing time
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return false;
        }

        // Simulate 95% success rate
        return Math.random() > 0.05;
    }
}