# CrowdFunding Backend

## ✅ Project Status: WORKING!

Spring Boot application for crowdfunding platform with Java 11 and Spring Boot 2.7.18.

## 🚀 Quick Start

### Prerequisites
- Java 11 (you have Eclipse Adoptium JDK 11.0.28 installed)
- Maven 3.9.11 (installed)

### Run the Application

```bash
cd backend
mvn spring-boot:run
```

The backend will start on **http://localhost:8080**

### Build the Project

```bash
mvn clean package
```

### Run the JAR file

```bash
java -jar target/crowdfunding-backend-0.0.1-SNAPSHOT.jar
```

## 📋 API Endpoints

### Campaigns
- `GET /api/campaigns` - Get all active campaigns (paginated)
- `GET /api/campaigns/{id}` - Get campaign by ID
- `POST /api/campaigns` - Create new campaign
- `PUT /api/campaigns/{id}` - Update campaign
- `POST /api/campaigns/{id}/publish` - Publish campaign
- `POST /api/campaigns/{id}/cancel` - Cancel campaign
- `GET /api/campaigns/categories` - Get all categories

### Donations
- `POST /api/donations?campaignId={id}` - Create donation
- `GET /api/donations/campaign/{campaignId}` - Get donations for campaign
- `GET /api/donations/{id}` - Get donation by ID
- `GET /api/donations/campaign/{campaignId}/stats` - Get donation stats

## 🗄️ Database

Using **H2 in-memory database**
- Console: http://localhost:8080/h2-console
- URL: `jdbc:h2:mem:crowdfundingdb`
- Username: `sa`
- Password: `password`

## 🔧 Tech Stack

- **Spring Boot**: 2.7.18
- **Java**: 11
- **Database**: H2 (in-memory)
- **JPA/Hibernate**: For ORM
- **Lombok**: For reducing boilerplate code
- **Validation**: Bean Validation (javax.validation)

## 📝 Features

- Campaign management (CRUD operations)
- Donation processing
- Campaign categories and search
- Campaign status tracking (DRAFT, ACTIVE, COMPLETED, CANCELLED)
- Donation tracking
- CORS enabled for frontend integration

## 🌐 CORS Configuration

Frontend URLs allowed:
- http://localhost:5173
- http://localhost:5174
- http://localhost:3000

## 📦 Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/crowdfunding/backend/
│   │   │       ├── config/          # Configuration classes
│   │   │       ├── controller/      # REST Controllers
│   │   │       ├── model/           # Entity classes
│   │   │       ├── repository/      # JPA Repositories
│   │   │       └── service/         # Business logic
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── pom.xml
└── README.md
```

## ✨ What Was Fixed

1. Changed from Spring Boot 3.5.0 to 2.7.18 (stable version)
2. Changed Java version from 21 to 11 (matches your installed JDK)
3. Updated `jakarta.*` imports to `javax.*` (Spring Boot 2.x uses javax)
4. Fixed deprecated `BigDecimal.ROUND_HALF_UP` to `RoundingMode.HALF_UP`
5. Added Lombok dependency
6. Created CORS configuration
7. Simplified pom.xml configuration

## 🎉 Success!

Your backend is now fully functional and ready to use!
