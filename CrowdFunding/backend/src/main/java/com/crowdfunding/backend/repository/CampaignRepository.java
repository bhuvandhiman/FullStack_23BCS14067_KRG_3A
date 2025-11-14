package com.crowdfunding.backend.repository;

import com.crowdfunding.backend.model.Campaign;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Long> {

    Page<Campaign> findByStatus(Campaign.Status status, Pageable pageable);

    Page<Campaign> findByCategory(Campaign.Category category, Pageable pageable);

    @Query("SELECT c FROM Campaign c WHERE c.status = :status AND c.category = :category")
    Page<Campaign> findByStatusAndCategory(@Param("status") Campaign.Status status,
                                          @Param("category") Campaign.Category category,
                                          Pageable pageable);

    @Query("SELECT c FROM Campaign c WHERE c.status = 'ACTIVE' AND c.endDate > :now")
    Page<Campaign> findActiveCampaigns(@Param("now") LocalDateTime now, Pageable pageable);

    @Query("SELECT c FROM Campaign c WHERE c.status = 'ACTIVE' AND c.endDate > :now AND " +
           "(LOWER(c.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(c.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Campaign> searchActiveCampaigns(@Param("keyword") String keyword,
                                        @Param("now") LocalDateTime now,
                                        Pageable pageable);

    @Query("SELECT c FROM Campaign c WHERE c.status = 'ACTIVE' AND c.endDate > :now AND c.category = :category")
    Page<Campaign> findActiveCampaignsByCategory(@Param("category") Campaign.Category category,
                                                @Param("now") LocalDateTime now,
                                                Pageable pageable);

    @Query("SELECT c FROM Campaign c WHERE c.status = 'COMPLETED' AND c.raisedAmount >= c.goalAmount")
    List<Campaign> findSuccessfulCampaigns();

    @Query("SELECT c FROM Campaign c WHERE c.endDate < :now AND c.raisedAmount < c.goalAmount AND c.status = 'ACTIVE'")
    List<Campaign> findExpiredCampaigns(@Param("now") LocalDateTime now);
}