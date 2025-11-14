# CrowdFunding App

A simple crowdfunding application built with Spring Boot (backend) and React (frontend).

## Features
- Create and browse crowdfunding campaigns
- Make donations to campaigns
- View campaign details and donation statistics

## Tech Stack
- **Backend**: Spring Boot 3.4.0, Java 21, H2 Database, JPA/Hibernate
- **Frontend**: React 18, Vite, Tailwind CSS

## Getting Started

### Prerequisites
- Java 21
- Maven 3.9+
- Node.js 18+

### Backend Setup
1. Navigate to `backend` directory
2. Run `mvn clean compile`
3. Run `mvn spring-boot:run`
4. API available at `http://localhost:8080`

### Frontend Setup
1. Navigate to `CrowdFundingApp` directory
2. Run `npm install`
3. Run `npm run dev`
4. App available at `http://localhost:5173`

## API Endpoints
- `GET /api/campaigns` - List campaigns
- `POST /api/campaigns` - Create campaign
- `GET /api/campaigns/{id}` - Get campaign details
- `POST /api/donations?campaignId={id}` - Make donation
- `GET /api/donations/campaign/{id}` - Get donations for campaign

## Database
Uses H2 in-memory database. Access console at `http://localhost:8080/h2-console`

## Project Structure
```
CrowdFunding/
├── backend/          # Spring Boot application
├── CrowdFundingApp/  # React frontend
└── README.md
```

6. Future Scope
● Blockchain-based transparent donations for higher trust.
● Mobile App version for Android/iOS.
● AI-driven campaign recommendation system to connect donors with causes matching
their interests.
● Recurring donations & subscriptions for regular funders.
● International currency and multi-language support to expand global reach.
7. Conclusion
The proposed Online Donation and Crowdfunding Portal will be a secure, transparent, and
feature-rich platform for individuals and organizations to raise funds online. By integrating Stripe
for payments, PostgreSQL for data management, and React + Spring Boot for seamless user
interaction, the system will solve the challenges of trust, transparency, and accessibility in online
donations. This project will not only benefit NGOs and campaigners but also empower donors by
giving them visibility into how their contributions are making an impact.
