import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CampaignCard from './components/CampaignCard'
import CampaignDetail from './components/CampaignDetail'
import CreateCampaign from './components/CreateCampaign'
import './App.css'

const Home = () => (
  <div className="min-h-screen">
    <div className="hero-section py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Welcome to CrowdFunding App</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover amazing projects, support innovative ideas, and make a difference in the world.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/browse" className="btn-primary px-8 py-3 text-lg">
            Browse Campaigns
          </Link>
          <Link to="/create" className="btn-secondary px-8 py-3 text-lg">
            Start a Campaign
          </Link>
        </div>
      </div>
    </div>

    <div className="features-section py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h5 className="text-xl font-semibold text-gray-900 mb-2">Easy Funding</h5>
            <p className="text-gray-600">Simple and secure way to fund your favorite projects.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h5 className="text-xl font-semibold text-gray-900 mb-2">Community Driven</h5>
            <p className="text-gray-600">Connect with like-minded people and support causes you care about.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h5 className="text-xl font-semibold text-gray-900 mb-2">Transparent</h5>
            <p className="text-gray-600">Track your contributions and see the impact of your support.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const BrowseCampaigns = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [campaigns, setCampaigns] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/api/campaigns')
      .then(res => res.json())
      .then(data => setCampaigns(data.content || []))
      .catch(err => console.error('Error fetching campaigns:', err))
  }, [])

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === '' || campaign.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(campaigns.map(campaign => campaign.category))]

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Campaigns</h1>
          <p className="text-xl text-gray-600">Discover projects that need your support</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                className="input-field"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                className="input-field"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map(campaign => (
            <CampaignCard
              key={campaign.id}
              id={campaign.id}
              title={campaign.title}
              description={campaign.shortDescription || campaign.description}
              goal={campaign.goalAmount}
              raised={campaign.raisedAmount}
            />
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No campaigns found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<BrowseCampaigns />} />
        <Route path="/campaign/:id" element={<CampaignDetail />} />
        <Route path="/create" element={<CreateCampaign />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
