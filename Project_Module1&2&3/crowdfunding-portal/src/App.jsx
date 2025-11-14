import React, { useState } from 'react';
import { Heart, Search, TrendingUp, Users, Target, Clock, MapPin, Share2, Facebook, Twitter, Linkedin, Mail, ChevronDown } from 'lucide-react';

// Static placeholder data
const campaigns = [
  {
    id: 1,
    title: "Clean Water for Rural Communities",
    description: "Help us build water wells in underserved rural areas to provide clean drinking water to families in need.",
    fullDescription: "Access to clean water is a fundamental human right, yet millions of people in rural communities lack this basic necessity. Our project aims to construct sustainable water wells that will serve entire villages for generations to come. Each well can provide clean water to up to 500 people daily, dramatically reducing waterborne diseases and improving overall quality of life. The funds will cover drilling equipment, materials, maintenance training for local communities, and a 5-year sustainability program.",
    category: "Health",
    image: "https://images.unsplash.com/photo-1509475826633-fed577a2c71b?w=800&h=500&fit=crop",
    goal: 50000,
    raised: 35000,
    donors: 234,
    daysLeft: 15,
    creator: "Global Water Initiative",
    location: "East Africa",
    featured: true
  },
  {
    id: 2,
    title: "Education for Underprivileged Children",
    description: "Support educational programs and provide school supplies for children from low-income families.",
    fullDescription: "Every child deserves access to quality education. This campaign focuses on breaking the cycle of poverty through education by providing school supplies, uniforms, scholarships, and after-school tutoring programs. We partner with local schools to identify children most in need and ensure they have everything required to succeed academically. Your donation directly impacts a child's future, opening doors to opportunities they never thought possible.",
    category: "Education",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=500&fit=crop",
    goal: 25000,
    raised: 18750,
    donors: 156,
    daysLeft: 22,
    creator: "Future Leaders Foundation",
    location: "Southeast Asia",
    featured: true
  },
  {
    id: 3,
    title: "Reforestation Project: Plant 10,000 Trees",
    description: "Join us in combating climate change by planting native trees and restoring natural habitats.",
    fullDescription: "Climate change is one of the most pressing issues of our time. This reforestation initiative aims to plant 10,000 native trees across degraded lands, helping to restore ecosystems, combat soil erosion, and provide habitats for wildlife. Trees absorb CO2, produce oxygen, and play a crucial role in maintaining the water cycle. By supporting this project, you're investing in a greener, healthier planet for future generations.",
    category: "Environment",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=500&fit=crop",
    goal: 15000,
    raised: 12500,
    donors: 189,
    daysLeft: 30,
    creator: "Green Earth Alliance",
    location: "Amazon Rainforest",
    featured: false
  },
  {
    id: 4,
    title: "Medical Equipment for Local Hospital",
    description: "Help upgrade medical facilities with modern equipment to serve our community better.",
    fullDescription: "Our local hospital serves over 50,000 residents but lacks essential medical equipment needed to provide adequate care. This campaign aims to purchase critical diagnostic tools, patient monitoring systems, and emergency room equipment. The upgrades will reduce wait times, improve diagnostic accuracy, and potentially save countless lives. Your contribution helps ensure quality healthcare is accessible to everyone in our community.",
    category: "Health",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=500&fit=crop",
    goal: 75000,
    raised: 45000,
    donors: 312,
    daysLeft: 45,
    creator: "Community Health Network",
    location: "Local Community",
    featured: true
  },
  {
    id: 5,
    title: "Animal Shelter Renovation",
    description: "Renovate and expand our animal shelter to rescue and care for more abandoned pets.",
    fullDescription: "Our animal shelter has been serving the community for 15 years, providing care and finding homes for abandoned and abused animals. As the number of animals needing help has grown, our facilities have become overcrowded. This renovation project will expand our capacity by 50%, add a veterinary clinic, and create comfortable spaces for animals awaiting adoption. Every animal deserves a second chance at happiness.",
    category: "Animals",
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=500&fit=crop",
    goal: 40000,
    raised: 28000,
    donors: 267,
    daysLeft: 20,
    creator: "Paws & Hearts Shelter",
    location: "Metropolitan Area",
    featured: false
  },
  {
    id: 6,
    title: "Women's Empowerment Workshop Series",
    description: "Empower women through skill development workshops and entrepreneurship training programs.",
    fullDescription: "Economic empowerment is key to breaking cycles of poverty. This program offers comprehensive training in business skills, financial literacy, and vocational trades specifically designed for women in underserved communities. Participants receive mentorship, seed funding for small businesses, and ongoing support. Past graduates have started successful enterprises, gained employment, and become community leaders. Together, we can create lasting change.",
    category: "Social",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=500&fit=crop",
    goal: 20000,
    raised: 8500,
    donors: 78,
    daysLeft: 35,
    creator: "Women Rise Foundation",
    location: "Multiple Locations",
    featured: false
  }
];

const donorComments = [
  { name: "Sarah Johnson", amount: 500, comment: "Such an important cause! Happy to contribute.", date: "2 days ago" },
  { name: "Michael Chen", amount: 250, comment: "Keep up the great work!", date: "5 days ago" },
  { name: "Anonymous", amount: 1000, comment: "Proud to support this initiative.", date: "1 week ago" },
  { name: "Emily Rodriguez", amount: 150, comment: "Every little bit helps. Good luck!", date: "1 week ago" }
];

// Reusable Components
const Button = ({ children, variant = 'primary', className = '', onClick, type = 'button' }) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105';
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg',
    secondary: 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50',
    outline: 'border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600',
    success: 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg'
  };
  
  return (
    <button 
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const InputField = ({ label, type = 'text', placeholder, value, onChange, error, required = false }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

const CampaignCard = ({ campaign, onClick }) => {
  const progress = (campaign.raised / campaign.goal) * 100;
  
  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={campaign.image} 
          alt={campaign.title}
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {campaign.category}
        </div>
        {campaign.featured && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <TrendingUp size={14} /> Featured
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{campaign.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold text-gray-700">Progress</span>
            <span className="font-bold text-blue-600">{progress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-2xl font-bold text-gray-800">${campaign.raised.toLocaleString()}</p>
            <p className="text-sm text-gray-500">raised of ${campaign.goal.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-blue-600">{campaign.daysLeft} days</p>
            <p className="text-sm text-gray-500">remaining</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-gray-600">
            <Users size={18} />
            <span className="text-sm font-medium">{campaign.donors} donors</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={18} />
            <span className="text-sm">{campaign.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ activePage, setActivePage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setActivePage('home')}>
            <Heart className="text-blue-600 mr-2" size={32} />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              FundHope
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setActivePage('home')}
              className={`font-semibold transition-colors ${activePage === 'home' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setActivePage('browse')}
              className={`font-semibold transition-colors ${activePage === 'browse' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Browse Campaigns
            </button>
            <button 
              onClick={() => setActivePage('login')}
              className="text-gray-700 hover:text-blue-600 font-semibold transition-colors"
            >
              Login
            </button>
            <Button onClick={() => setActivePage('register')} variant="primary">
              Start a Campaign
            </Button>
          </div>
          
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <ChevronDown className={`transform transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <button 
              onClick={() => { setActivePage('home'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
            >
              Home
            </button>
            <button 
              onClick={() => { setActivePage('browse'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
            >
              Browse Campaigns
            </button>
            <button 
              onClick={() => { setActivePage('login'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
            >
              Login
            </button>
            <button 
              onClick={() => { setActivePage('register'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 bg-blue-600 text-white rounded"
            >
              Start a Campaign
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Heart className="text-blue-500 mr-2" size={28} />
              <span className="text-xl font-bold">FundHope</span>
            </div>
            <p className="text-gray-400">
              Empowering communities through transparent and impactful crowdfunding.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">How It Works</li>
              <li className="hover:text-white cursor-pointer transition-colors">Success Stories</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">Health</li>
              <li className="hover:text-white cursor-pointer transition-colors">Education</li>
              <li className="hover:text-white cursor-pointer transition-colors">Environment</li>
              <li className="hover:text-white cursor-pointer transition-colors">Social Causes</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <Facebook className="cursor-pointer hover:text-blue-500 transition-colors" />
              <Twitter className="cursor-pointer hover:text-blue-400 transition-colors" />
              <Linkedin className="cursor-pointer hover:text-blue-600 transition-colors" />
              <Mail className="cursor-pointer hover:text-red-500 transition-colors" />
            </div>
            <p className="text-gray-400 text-sm">
              Subscribe to our newsletter for updates
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 FundHope. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

// Page Components
const HomePage = ({ setActivePage, setSelectedCampaign }) => {
  const featuredCampaigns = campaigns.filter(c => c.featured);
  
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Turn Compassion Into Action
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Support meaningful causes and make a real difference in the world
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" onClick={() => setActivePage('browse')}>
              Explore Campaigns
            </Button>
            <Button variant="success" onClick={() => setActivePage('register')}>
              Start Your Campaign
            </Button>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">$2.5M+</div>
              <p className="text-gray-600 text-lg">Total Funds Raised</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">1,250+</div>
              <p className="text-gray-600 text-lg">Active Campaigns</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">15K+</div>
              <p className="text-gray-600 text-lg">Happy Donors</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Campaigns */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Campaigns</h2>
            <p className="text-xl text-gray-600">Support these impactful initiatives making a difference</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCampaigns.map(campaign => (
              <CampaignCard 
                key={campaign.id} 
                campaign={campaign}
                onClick={() => {
                  setSelectedCampaign(campaign);
                  setActivePage('detail');
                }}
              />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button variant="outline" onClick={() => setActivePage('browse')}>
              View All Campaigns
            </Button>
          </div>
        </div>
      </div>
      
      {/* How It Works */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to make an impact</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Find a Cause</h3>
              <p className="text-gray-600">Browse through verified campaigns that align with your values</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Make a Donation</h3>
              <p className="text-gray-600">Contribute securely with flexible payment options</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Track Impact</h3>
              <p className="text-gray-600">See real-time updates on how your contribution is making a difference</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BrowseCampaigns = ({ setActivePage, setSelectedCampaign }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  
  const categories = ['All', 'Health', 'Education', 'Environment', 'Animals', 'Social'];
  
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || campaign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Browse Campaigns</h1>
          <p className="text-xl text-gray-600">Discover causes that matter to you</p>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="featured">Featured First</option>
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="ending">Ending Soon</option>
            </select>
          </div>
        </div>
        
        {/* Results */}
        <div className="mb-4 text-gray-600">
          Showing {filteredCampaigns.length} campaigns
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map(campaign => (
            <CampaignCard 
              key={campaign.id} 
              campaign={campaign}
              onClick={() => {
                setSelectedCampaign(campaign);
                setActivePage('detail');
              }}
            />
          ))}
        </div>
        
        {filteredCampaigns.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No campaigns found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CampaignDetail = ({ campaign, setActivePage }) => {
  const [donationAmount, setDonationAmount] = useState('');
  const progress = (campaign.raised / campaign.goal) * 100;
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => setActivePage('browse')}
          className="text-blue-600 hover:text-blue-700 font-semibold mb-6 flex items-center gap-2"
        >
          ← Back to Campaigns
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
              <img 
                src={campaign.image} 
                alt={campaign.title}
                className="w-full h-96 object-cover"
              />
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {campaign.category}
                </span>
                {campaign.featured && (
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{campaign.title}</h1>
              
              <div className="flex items-center gap-4 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin size={20} />
                  <span>{campaign.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <span>{campaign.daysLeft} days left</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Campaign</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {campaign.fullDescription}
                </p>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{campaign.creator}</p>
                    <p className="text-sm text-gray-600">Campaign Organizer</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Campaign Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                    <img 
                      src={campaign.image} 
                      alt={`Gallery ${i}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Donor Comments */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Donations</h2>
              <div className="space-y-6">
                {donorComments.map((donor, idx) => (
                  <div key={idx} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="font-bold text-blue-600">{donor.name[0]}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{donor.name}</p>
                          <p className="text-sm text-gray-500">{donor.date}</p>
                        </div>
                      </div>
                      <span className="font-bold text-blue-600">${donor.amount}</span>
                    </div>
                    <p className="text-gray-700 ml-13">{donor.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="mb-6">
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  ${campaign.raised.toLocaleString()}
                </div>
                <p className="text-gray-600 mb-4">
                  raised of ${campaign.goal.toLocaleString()} goal
                </p>
                
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{campaign.donors}</p>
                    <p className="text-sm text-gray-600">Donors</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{campaign.daysLeft}</p>
                    <p className="text-sm text-gray-600">Days Left</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {[25, 50, 100].map(amount => (
                    <button
                      key={amount}
                      onClick={() => setDonationAmount(amount.toString())}
                      className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold transition-colors"
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <Button variant="primary" className="w-full">
                  Donate Now
                </Button>
                
                <button className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Share2 size={20} />
                  Share Campaign
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  All donations are secure and protected
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginPage = ({ setActivePage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      alert('Login successful! (This is a demo)');
    }
  };
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Heart className="text-blue-600" size={48} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Login to continue making a difference</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <InputField
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
            />
            
            <InputField
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required
            />
            
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                Forgot Password?
              </a>
            </div>
            
            <Button type="submit" variant="primary" className="w-full mb-4">
              Login
            </Button>
          </form>
          
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button 
                onClick={() => setActivePage('register')}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Register here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const RegisterPage = ({ setActivePage }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const validatePhone = (phone) => {
    const re = /^\+?[\d\s-()]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };
  
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      alert('Registration successful! (This is a demo)');
      setActivePage('login');
    }
  };
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Heart className="text-blue-600" size={48} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Your Account</h1>
            <p className="text-gray-600">Join our community and start making an impact</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="First Name"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                error={errors.firstName}
                required
              />
              
              <InputField
                label="Last Name"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                error={errors.lastName}
                required
              />
            </div>
            
            <InputField
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              error={errors.email}
              required
            />
            
            <InputField
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              error={errors.phone}
            />
            
            <InputField
              label="Password"
              type="password"
              placeholder="Minimum 8 characters"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              error={errors.password}
              required
            />
            
            <InputField
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              error={errors.confirmPassword}
              required
            />
            
            <div className="mb-4">
              <label className="flex items-start">
                <input 
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => handleChange('agreeTerms', e.target.checked)}
                  className="mt-1 mr-2"
                />
                <span className="text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Terms and Conditions
                  </a>
                  {' '}and{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>
              )}
            </div>
            
            <Button type="submit" variant="primary" className="w-full mb-4">
              Create Account
            </Button>
          </form>
          
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={() => setActivePage('login')}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  
  const renderPage = () => {
    switch(activePage) {
      case 'home':
        return <HomePage setActivePage={setActivePage} setSelectedCampaign={setSelectedCampaign} />;
      case 'browse':
        return <BrowseCampaigns setActivePage={setActivePage} setSelectedCampaign={setSelectedCampaign} />;
      case 'detail':
        return <CampaignDetail campaign={selectedCampaign} setActivePage={setActivePage} />;
      case 'login':
        return <LoginPage setActivePage={setActivePage} />;
      case 'register':
        return <RegisterPage setActivePage={setActivePage} />;
      default:
        return <HomePage setActivePage={setActivePage} setSelectedCampaign={setSelectedCampaign} />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      {renderPage()}
      <Footer />
    </div>
  );
};

export default App;