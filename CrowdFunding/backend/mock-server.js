const express = require('express');
const cors = require('cors');
const app = express();
const port = 8081;

// Middleware
app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true
}));
app.use(express.json());

// In-memory storage
let campaigns = [
  {
    id: 1,
    title: 'Help Build a Community Garden',
    description: 'We want to create a beautiful community garden in our neighborhood.',
    goalAmount: 5000.00,
    currentAmount: 1200.00,
    startDate: '2024-01-15T00:00:00.000Z',
    endDate: '2024-03-15T00:00:00.000Z',
    status: 'ACTIVE',
    createdAt: '2024-01-10T00:00:00.000Z'
  },
  {
    id: 2,
    title: 'Educational Books for Children',
    description: 'Providing educational books to underprivileged children.',
    goalAmount: 3000.00,
    currentAmount: 800.00,
    startDate: '2024-02-01T00:00:00.000Z',
    endDate: '2024-04-01T00:00:00.000Z',
    status: 'ACTIVE',
    createdAt: '2024-01-25T00:00:00.000Z'
  }
];

let donations = [];

// Campaign endpoints
app.get('/api/campaigns', (req, res) => {
  res.json(campaigns);
});

app.get('/api/campaigns/:id', (req, res) => {
  const campaign = campaigns.find(c => c.id === parseInt(req.params.id));
  if (campaign) {
    res.json(campaign);
  } else {
    res.status(404).json({ error: 'Campaign not found' });
  }
});

app.post('/api/campaigns', (req, res) => {
  const newCampaign = {
    id: campaigns.length + 1,
    ...req.body,
    currentAmount: 0.00,
    status: 'ACTIVE',
    createdAt: new Date().toISOString()
  };
  campaigns.push(newCampaign);
  res.status(201).json(newCampaign);
});

// Donation endpoints
app.get('/api/donations', (req, res) => {
  res.json(donations);
});

app.post('/api/donations', (req, res) => {
  const newDonation = {
    id: donations.length + 1,
    ...req.body,
    donationDate: new Date().toISOString()
  };
  donations.push(newDonation);

  // Update campaign current amount
  const campaign = campaigns.find(c => c.id === newDonation.campaignId);
  if (campaign) {
    campaign.currentAmount += newDonation.amount;
  }

  res.status(201).json(newDonation);
});

app.listen(port, () => {
  console.log(`Mock backend server running at http://localhost:${port}`);
});