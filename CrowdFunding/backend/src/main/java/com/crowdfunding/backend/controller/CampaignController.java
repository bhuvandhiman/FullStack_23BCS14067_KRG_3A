package com.crowdfunding.backend.controller;

import com.crowdfunding.backend.model.Campaign;
import com.crowdfunding.backend.service.CampaignService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@Slf4j
@RequestMapping("/api/campaigns")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000"})
public class CampaignController {

    private final CampaignService campaignService;

    @GetMapping
    public ResponseEntity<Page<Campaign>> getCampaigns(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Campaign.Category category) {

        Pageable pageable = PageRequest.of(page, size);

        if (search != null && !search.trim().isEmpty()) {
            return ResponseEntity.ok(campaignService.searchCampaigns(search, pageable));
        } else if (category != null) {
            return ResponseEntity.ok(campaignService.findByCategory(category, pageable));
        } else {
            return ResponseEntity.ok(campaignService.findActiveCampaigns(pageable));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCampaign(@PathVariable Long id) {
        Optional<Campaign> campaign = campaignService.findById(id);
        if (campaign.isPresent()) {
            return ResponseEntity.ok(campaign.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createCampaign(@Valid @RequestBody Campaign campaign) {
        log.info("Incoming createCampaign request: title='{}', category='{}', goal={}, start={}, end={}",
                campaign.getTitle(), campaign.getCategory(), campaign.getGoalAmount(), campaign.getStartDate(), campaign.getEndDate());
        try {
            Campaign savedCampaign = campaignService.createCampaign(campaign);
            log.info("Campaign saved id={}, status={}", savedCampaign.getId(), savedCampaign.getStatus());
            return ResponseEntity.ok(savedCampaign);
        } catch (RuntimeException e) {
            log.warn("Campaign creation failed: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCampaign(@PathVariable Long id,
                                          @Valid @RequestBody Campaign campaign) {
        try {
            campaign.setId(id);
            Campaign updatedCampaign = campaignService.updateCampaign(campaign);
            return ResponseEntity.ok(updatedCampaign);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/{id}/publish")
    public ResponseEntity<?> publishCampaign(@PathVariable Long id) {
        try {
            Campaign publishedCampaign = campaignService.publishCampaign(id);
            return ResponseEntity.ok(publishedCampaign);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<?> cancelCampaign(@PathVariable Long id) {
        try {
            Campaign cancelledCampaign = campaignService.cancelCampaign(id);
            return ResponseEntity.ok(cancelledCampaign);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/categories")
    public ResponseEntity<Campaign.Category[]> getCategories() {
        return ResponseEntity.ok(Campaign.Category.values());
    }
    
    @GetMapping("/all")
    public ResponseEntity<Page<Campaign>> getAllCampaigns(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(campaignService.findAllCampaigns(pageable));
    }
}