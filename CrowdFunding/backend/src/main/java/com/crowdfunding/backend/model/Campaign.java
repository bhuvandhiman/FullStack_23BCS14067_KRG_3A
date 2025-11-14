package com.crowdfunding.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import javax.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "campaigns")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Size(min = 5, max = 100, message = "Title must be between 5 and 100 characters")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Description is required")
    @Size(min = 20, max = 5000, message = "Description must be between 20 and 5000 characters")
    @Column(nullable = false, length = 5000)
    private String description;

    @NotBlank(message = "Short description is required")
    @Size(min = 10, max = 200, message = "Short description must be between 10 and 200 characters")
    @Column(nullable = false, length = 200)
    private String shortDescription;

    @NotNull(message = "Goal amount is required")
    @DecimalMin(value = "1.00", message = "Goal amount must be at least $1.00")
    @DecimalMax(value = "10000000.00", message = "Goal amount cannot exceed $10,000,000.00")
    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal goalAmount;

    @DecimalMin(value = "0.00", message = "Raised amount cannot be negative")
    @Column(precision = 15, scale = 2)
    private BigDecimal raisedAmount = BigDecimal.ZERO;

    @NotNull(message = "Start date is required")
    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startDate;

    @NotNull(message = "End date is required")
    @Future(message = "End date must be in the future")
    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime endDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    @Size(max = 500, message = "Image URL cannot exceed 500 characters")
    private String imageUrl;

    @Size(max = 1000, message = "Video URL cannot exceed 1000 characters")
    private String videoUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.DRAFT;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // Relationships
    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Donation> donations = new HashSet<>();

    // Computed fields
    @Transient
    public BigDecimal getProgressPercentage() {
        if (goalAmount.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO;
        }
        return raisedAmount.divide(goalAmount, 4, RoundingMode.HALF_UP)
                .multiply(new BigDecimal("100"));
    }

    @Transient
    public boolean isActive() {
        LocalDateTime now = LocalDateTime.now();
        return status == Status.ACTIVE &&
               now.isAfter(startDate) &&
               now.isBefore(endDate) &&
               raisedAmount.compareTo(goalAmount) < 0;
    }

    @Transient
    public boolean isSuccessful() {
        return status == Status.COMPLETED &&
               raisedAmount.compareTo(goalAmount) >= 0;
    }

    @Transient
    public boolean isExpired() {
        return LocalDateTime.now().isAfter(endDate) &&
               raisedAmount.compareTo(goalAmount) < 0;
    }

    public enum Category {
        ART, MUSIC, FILM, GAMES, DESIGN, TECHNOLOGY,
        FOOD, PUBLISHING, COMICS, FASHION, THEATER, PHOTOGRAPHY,
        HEALTH, EDUCATION, ENVIRONMENT, OTHER
    }

    public enum Status {
        DRAFT, ACTIVE, COMPLETED, CANCELLED
    }
}