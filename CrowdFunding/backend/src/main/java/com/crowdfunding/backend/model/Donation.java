package com.crowdfunding.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import javax.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "donations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "1.00", message = "Donation amount must be at least $1.00")
    @DecimalMax(value = "100000.00", message = "Donation amount cannot exceed $100,000.00")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Size(max = 500, message = "Message cannot exceed 500 characters")
    private String message;

        @NotBlank(message = "Donor name is required")
        @Size(max = 100, message = "Donor name cannot exceed 100 characters")
        @Column(nullable = false)
        private String donorName;

        @NotBlank(message = "Donor email is required")
        @Email(message = "Invalid email format")
        @Size(max = 150, message = "Email cannot exceed 150 characters")
        @Column(nullable = false)
        private String donorEmail;

    @Column(nullable = false)
    private boolean anonymous = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @Size(max = 100, message = "Payment method cannot exceed 100 characters")
    private String paymentMethod;

    @Size(max = 255, message = "Transaction ID cannot exceed 255 characters")
    private String transactionId;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id", nullable = false)
    @JsonIgnore
    private Campaign campaign;

    public enum PaymentStatus {
        PENDING, COMPLETED, FAILED, REFUNDED
    }
}