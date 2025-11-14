package com.crowdfunding.backend.repository;

import com.crowdfunding.backend.model.Donation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {

    Page<Donation> findByCampaignId(Long campaignId, Pageable pageable);

    List<Donation> findByCampaignIdAndPaymentStatus(Long campaignId, Donation.PaymentStatus paymentStatus);

    @Query("SELECT d FROM Donation d WHERE d.campaign.id = :campaignId AND d.paymentStatus = 'COMPLETED' ORDER BY d.createdAt DESC")
    Page<Donation> findCompletedDonationsByCampaignId(@Param("campaignId") Long campaignId, Pageable pageable);

    @Query("SELECT SUM(d.amount) FROM Donation d WHERE d.campaign.id = :campaignId AND d.paymentStatus = 'COMPLETED'")
    BigDecimal getTotalDonationsByCampaign(@Param("campaignId") Long campaignId);

    @Query("SELECT COUNT(d) FROM Donation d WHERE d.campaign.id = :campaignId AND d.paymentStatus = 'COMPLETED'")
    long countCompletedDonationsByCampaign(@Param("campaignId") Long campaignId);

    @Query("SELECT d FROM Donation d WHERE d.paymentStatus = 'PENDING' AND d.createdAt < :cutoffTime")
    List<Donation> findPendingDonationsOlderThan(@Param("cutoffTime") LocalDateTime cutoffTime);

    @Query("SELECT d FROM Donation d WHERE d.paymentStatus = 'COMPLETED' AND d.createdAt BETWEEN :startDate AND :endDate")
    List<Donation> findCompletedDonationsInDateRange(@Param("startDate") LocalDateTime startDate,
                                                    @Param("endDate") LocalDateTime endDate);
}