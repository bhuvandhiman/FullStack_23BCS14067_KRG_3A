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
Payment Gateway: Stripe
● Ensures secure, reliable, and fast online transactions.
Architecture Overview:
● Users interact with the React frontend.
● The frontend communicates with the Spring Boot backend via REST APIs.
● PostgreSQL stores structured data (users, campaigns, donations).
● Stripe handles payment processing, integrated into the backend.
5. Current Solutions in the Market
GoFundMe: Widely used but has high service fees.
Ketto (India): Popular but limited customization and charges transaction fees.
ImpactGuru: Provides medical crowdfunding but lacks campaign diversity.
These platforms provide basic donation functionalities but are not affordable or fully transparent
for smaller initiatives.
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


Online Donation and Crowdfunding Portal
Name: Bhuvan Dhiman
UID: 23BS14067
Section: Krg 3-A
Module 1: Frontend UI/UX and Static Pages
This module is all about building the visual skeleton of your application. Think of it as
building a detailed movie set before the actors (the data) arrive. The goal is to create a fully
interactive and responsive user interface using React.js.
1. Project Setup & Foundational Components
● Initialize a new React project using Create React App or Vite.
● Choose a UI library like Material-UI or Bootstrap for a consistent design
system, or build custom components with styled-components/Tailwind CSS.
● Set up a routing system using React Router to manage navigation between
different pages.
2. Key Components to Build
● Navbar: For site-wide navigation (Home, Browse Campaigns, Login).
● CampaignCard: A reusable component to display a summary of a campaign
(image, title, goal, amount raised).
● Footer: Contains links and site information.
● InputField & Button: Standardized form elements for use across the site.
3. Static Page Implementation
Home Page
● Create a visually appealing landing page.
● Use static placeholder data to populate sections like "Featured Campaigns" or
"Recently Added".
Browse Campaigns Page
● Design a grid or list layout to display multiple CampaignCard components.
● Add static filter and sort options that are visually functional but not yet
connected to an API.
Campaign Detail Page
● Build a detailed view that will eventually show all information for one
campaign.
● Include sections for the campaign description, a gallery of images, donor
comments, and a prominent, but static, progress bar.
User Forms
● Create the HTML and CSS for the User Registration and Login pages.
● Implement basic client-side validation (e.g., checking if an email format is
valid).
Module 2: Backend Foundation & User Management
Now, you'll bring the user forms to life by building the backend logic and database to handle
user accounts.
1. Technology Setup
● Initialize a Spring Boot project with dependencies like Spring Web, Spring
Data JPA, and the PostgreSQL Driver.
● Configure the application.properties file to connect to your PostgreSQL
database.
● Implement Spring Security for handling authentication and authorization.
2. Feature: User Registration
● Database (PostgreSQL): Create a users table with columns: id (Primary
Key), username, email (unique), password_hash, created_at.
● Backend (Spring Boot): Create a User entity to map to the users table.
● Implement a UserService to handle business logic, including hashing the user's
password.
● Create a REST API endpoint: POST /api/auth/register.
● Frontend (React): Connect the registration form to the POST
/api/auth/register endpoint.
● Handle API responses, showing success or error alerts.
3. Feature: User Login & Authentication
● Backend (Spring Boot): Configure Spring Security to handle the login
process.
● Implement JWT (JSON Web Tokens) for authentication.
● Create an endpoint: POST /api/auth/login.
● Frontend (React): Connect the login form to the POST /api/auth/login
endpoint.
● Upon successful login, store the received JWT securely.
● Implement logic to send this JWT with all future authenticated API requests.
● Update the UI to reflect the logged-in state.
Module 3: Campaign Creation & Management
This module focuses on allowing users to create and manage their own fundraising campaigns.
1. Feature: Create a Campaign
● Database (PostgreSQL): Create a campaigns table with columns: id, title,
description, goal_amount, current_amount, end_date, status, creator_id
(Foreign Key).
● Backend (Spring Boot): Create a Campaign entity and repository. Create a
secured endpoint: POST /api/campaigns to save campaign data.
● Frontend (React): Build a multi-step form for campaign creation.
● On submission, send the data to the POST /api/campaigns endpoint.
2. Feature: View Campaigns
● Backend (Spring Boot): Create an endpoint GET /api/campaigns to fetch a list
of all active campaigns.
● Create an endpoint GET /api/campaigns/{id} to fetch a single campaign's
details.
● Frontend (React): Replace static data on the "Browse Campaigns" and
"Campaign Detail" pages with live data from the new APIs.
Module 4: Donation Processing with Stripe Integration
This module is crucial for handling financial transactions securely and updating campaign
progress in real-time.
1. Feature: Making a Donation
● Database (PostgreSQL): Create a donations table with columns: id, amount,
donation_date, is_anonymous, donor_id (FK), campaign_id (FK).
● Backend (Spring Boot): Integrate the Stripe Java library. Create a secured
endpoint POST /api/donations/create-payment-intent to create a Stripe
payment session. Create a webhook to listen for successful payment
notifications from Stripe. When a payment is confirmed, this webhook will
save transaction details and update the campaign's current_amount.
● Frontend (React): On the Campaign Detail page, add a donation form. When
the user clicks "Donate," call the create-payment-intent endpoint. Use the
response to redirect the user to the secure Stripe Checkout page.
2. Feature: Real-Time Progress Tracking
● Backend (Spring Boot): The logic is handled by the Stripe webhook.
● Frontend (React): The progress bar should calculate its percentage based on
current_amount and goal_amount fetched from the API. Implement logic to
refresh campaign data after a donation is made.
Module 5: Dashboards, Reporting, & Notifications
This final module enhances the user experience by providing tools for campaigners and
donors to track their activities.
1. Feature: Campaign Owner Dashboard
● Backend (Spring Boot): Create an endpoint GET
/api/dashboard/my-campaigns to return campaigns created by the user. Create
an endpoint GET /api/dashboard/campaigns/{id}/donations to list donations
for a campaign.
● Frontend (React): Build a new "Dashboard" page. This page will fetch and
display the user's campaigns, funds raised, and donation logs.
2. Feature: Donor History & Reports
● Backend (Spring Boot): Create a secured endpoint GET
/api/dashboard/my-donations to fetch all donations made by the user.
● Frontend (React): Add a "My Donations" section to the user's profile or
dashboard. This section will display a list of their past contributions.
3. Feature: Milestone Notifications
● Backend (Spring Boot): In the Stripe webhook logic, add a check after
updating a campaign's total. If the new total crosses a milestone (e.g., 50%,
100%), trigger an event. This could save a notification to a new notifications
table or send an email.
● Frontend (React): Add a small notification icon in the Navbar. This
component will periodically check a new endpoint (GET /api/notifications) for
unread notifications.