import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const CampaignDetail = () => {
  const { id } = useParams()
  const [campaign, setCampaign] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:8080/api/campaigns/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Campaign not found')
        return res.json()
      })
      .then(data => {
        setCampaign(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])
  const [backingAmount, setBackingAmount] = useState('')
    const [donorName, setDonorName] = useState('')
    const [donorEmail, setDonorEmail] = useState('')
    const [donationMessage, setDonationMessage] = useState('')

  const handleBackCampaign = async () => {
    if (!backingAmount || parseFloat(backingAmount) <= 0) {
      alert('Please enter a valid backing amount')
      return
    }

      if (!donorName || donorName.trim() === '') {
        alert('Please enter your name')
        return
      }

      if (!donorEmail || donorEmail.trim() === '') {
        alert('Please enter your email')
        return
      }

    const donationData = {
      amount: parseFloat(backingAmount),
        donorName: donorName.trim(),
        donorEmail: donorEmail.trim(),
        message: donationMessage.trim() || null,
        anonymous: false
    }

    try {
      const response = await fetch(`http://localhost:8080/api/donations?campaignId=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(donationData)
      })

      if (response.ok) {
        alert(`Thank you for donating $${backingAmount}!`)
        setBackingAmount('')
          setDonorName('')
          setDonorEmail('')
          setDonationMessage('')
        // Refresh campaign data
        const updatedCampaign = await fetch(`http://localhost:8080/api/campaigns/${id}`).then(res => res.json())
        setCampaign(updatedCampaign)
      } else {
          const errorText = await response.text()
          try {
            const error = JSON.parse(errorText)
            alert('Error: ' + (error.error || error.message || 'Unknown error'))
          } catch {
            alert('Error: ' + errorText)
          }
      }
    } catch (error) {
        console.error('Donation error:', error)
        alert('Error: ' + error.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading campaign...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/browse" className="btn-primary">
            Browse All Campaigns
          </Link>
        </div>
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Campaign Not Found</h2>
          <p className="text-gray-600 mb-6">The campaign you're looking for doesn't exist.</p>
          <Link to="/browse" className="btn-primary">
            Browse All Campaigns
          </Link>
        </div>
      </div>
    )
  }

  const progressPercentage = (campaign.raisedAmount / campaign.goalAmount) * 100
  const daysLeft = Math.max(0, Math.ceil((new Date(campaign.endDate) - new Date()) / (1000 * 60 * 60 * 24)))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="hero-section py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold text-white mb-4">{campaign.title}</h1>
              <p className="text-white/90 text-lg mb-6">{campaign.description}</p>

              <div className="flex flex-wrap gap-4 text-white/80">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {campaign.category}
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {campaign.status}
                </span>
              </div>
            </div>

            {/* Progress Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  ${campaign.raisedAmount.toLocaleString()}
                </div>
                <div className="text-gray-600">
                  raised of ${campaign.goalAmount.toLocaleString()} goal
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                ></div>
              </div>

              <div className="text-center mb-6">
                <div className="text-2xl font-bold text-blue-600">
                  {progressPercentage.toFixed(1)}%
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{daysLeft}</div>
                  <div className="text-sm text-gray-600">days left</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{campaign.status}</div>
                  <div className="text-sm text-gray-600">status</div>
                </div>
              </div>

              {/* Back Campaign Form - Only show if campaign is ACTIVE */}
              {campaign.status === 'ACTIVE' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input-field"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="input-field"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Donation Amount ($) *
                    </label>
                    <input
                      type="number"
                      placeholder="25"
                      className="input-field"
                      value={backingAmount}
                      onChange={(e) => setBackingAmount(e.target.value)}
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      placeholder="Leave a message of support..."
                      className="input-field resize-none"
                      value={donationMessage}
                      onChange={(e) => setDonationMessage(e.target.value)}
                      rows="3"
                      maxLength="500"
                    />
                  </div>
                  <button
                    onClick={handleBackCampaign}
                    className="btn-primary w-full"
                  >
                    Donate Now
                  </button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="text-lg text-gray-700 font-semibold mb-2">This campaign is not accepting donations right now.</div>
                  <div className="text-gray-500">Only ACTIVE campaigns can be funded.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Story Section */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Campaign</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">{campaign.description}</p>
              </div>
            </div>

            {/* Rewards Section */}
            {/* Rewards not implemented yet */}

            {/* Updates Section */}
            {/* Updates not implemented yet */}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Goal</span>
                  <span className="font-medium">${campaign.goalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Raised</span>
                  <span className="font-medium text-green-600">${campaign.raisedAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Days Left</span>
                  <span className="font-medium">{daysLeft}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium">{campaign.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetail