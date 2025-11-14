# 🛠️ Development Guide

## Current Project Status ✅

**Working Features:**
- Campaign CRUD operations
- Donation system
- Search & Filter
- Category management
- Progress tracking

**Tech Stack:**
- Backend: Spring Boot 2.7.18 + H2 Database
- Frontend: React 18 + Vite + Tailwind CSS

---

## 📂 Project Structure

```
CrowdFunding/
│
├── backend/
│   └── src/main/java/com/crowdfunding/backend/
│       ├── config/          # CORS, WebConfig
│       ├── controller/      # REST Controllers
│       ├── model/           # Campaign, Donation entities
│       ├── repository/      # JPA Repositories
│       └── service/         # Business Logic
│
└── CrowdFundingApp/
    └── src/
        ├── components/      # React Components
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   ├── CampaignCard.jsx
        │   ├── CampaignDetail.jsx
        │   └── CreateCampaign.jsx
        └── App.jsx          # Main App with Router
```

---

## 🚀 Suggested Enhancements

### 1. User Authentication
**What:** Login/Signup system  
**Backend:** Spring Security + JWT  
**Frontend:** Auth context + Protected routes  
**Effort:** Medium

### 2. Image Upload
**What:** Upload campaign images  
**Backend:** File upload endpoint  
**Frontend:** Image picker component  
**Effort:** Easy

### 3. Payment Integration
**What:** Stripe payment gateway  
**Backend:** Stripe API integration  
**Frontend:** Checkout component  
**Effort:** Medium

### 4. User Dashboard
**What:** User profile & campaigns  
**Backend:** User-specific endpoints  
**Frontend:** Dashboard pages  
**Effort:** Medium

### 5. Campaign Updates
**What:** Post updates & comments  
**Backend:** Updates/Comments entities  
**Frontend:** Update feed component  
**Effort:** Easy

### 6. Email Notifications
**What:** Send email on donations  
**Backend:** Spring Mail  
**Frontend:** Email preferences  
**Effort:** Easy

### 7. Social Sharing
**What:** Share campaigns on social media  
**Backend:** Generate share links  
**Frontend:** Share buttons  
**Effort:** Very Easy

### 8. Analytics
**What:** Campaign performance metrics  
**Backend:** Analytics endpoints  
**Frontend:** Charts & graphs  
**Effort:** Medium

---

## 🎯 Quick Development Tips

### Adding a New Feature:

1. **Backend First:**
   - Create model/entity in `model/`
   - Create repository in `repository/`
   - Create service in `service/`
   - Create controller in `controller/`

2. **Frontend Second:**
   - Create component in `components/`
   - Add route in `App.jsx`
   - Connect to API using `fetch()`

### Testing:
```bash
# Test backend API
curl http://localhost:8080/api/campaigns

# Check H2 database
# Visit: http://localhost:8080/h2-console
```

### Hot Reload:
- Backend: Restarts automatically with Spring DevTools
- Frontend: Vite auto-refreshes on save

---

## 📝 Code Standards

### Backend:
- Use Lombok for getters/setters
- Validate input with `@Valid`
- Handle errors gracefully
- Use meaningful variable names

### Frontend:
- Use functional components
- Keep components small & focused
- Use Tailwind for styling
- Handle loading & error states

---

## 🐛 Common Issues

**CORS Error:** Check `WebConfig.java`  
**Date Format:** Use `yyyy-MM-ddTHH:mm:ss`  
**Port Conflict:** Change in `application.properties` or `vite.config.js`

---

**Ready to build? Pick a feature and let's go! 🚀**
