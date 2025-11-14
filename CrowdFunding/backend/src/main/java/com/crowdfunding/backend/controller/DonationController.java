package com.crowdfunding.backend.controller;

import com.crowdfunding.backend.model.Campaign;
import com.crowdfunding.backend.model.Donation;
import com.crowdfunding.backend.service.CampaignService;
import com.crowdfunding.backend.service.DonationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/donations")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000"})
public class DonationController {

    private final DonationService donationService;
    private final CampaignService campaignService;

    @PostMapping
    public ResponseEntity<?> createDonation(@Valid @RequestBody Donation donation,
                                          @RequestParam Long campaignId) {
        try {
            Optional<Campaign> campaign = campaignService.findById(campaignId);

            if (campaign.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Campaign not found"));
            }

            // Check if campaign is active
            if (!campaign.get().isActive()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Campaign is not active"));
            }

            Donation savedDonation = donationService.createDonation(donation, campaign.get());
            return ResponseEntity.ok(savedDonation);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/campaign/{campaignId}")
    public ResponseEntity<Page<Donation>> getCampaignDonations(@PathVariable Long campaignId,
                                                             @RequestParam(defaultValue = "0") int page,
                                                             @RequestParam(defaultValue = "20") int size) {
        Optional<Campaign> campaign = campaignService.findById(campaignId);
        if (campaign.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(donationService.findByCampaign(campaign.get(), pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDonation(@PathVariable Long id) {
        Optional<Donation> donation = donationService.findById(id);
        if (donation.isPresent()) {
            return ResponseEntity.ok(donation.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/campaign/{campaignId}/stats")
    public ResponseEntity<?> getCampaignDonationStats(@PathVariable Long campaignId) {
        Optional<Campaign> campaign = campaignService.findById(campaignId);
        if (campaign.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        BigDecimal totalAmount = donationService.getTotalDonationsByCampaign(campaign.get());
        long donationCount = donationService.getDonationCountByCampaign(campaign.get());

        return ResponseEntity.ok(Map.of(
            "totalAmount", totalAmount,
            "donationCount", donationCount,
            "goalAmount", campaign.get().getGoalAmount(),
            "progressPercentage", campaign.get().getProgressPercentage()
        ));
    }
}