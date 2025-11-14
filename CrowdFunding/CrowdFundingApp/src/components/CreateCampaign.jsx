import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateCampaign = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    goal: '',
    category: '',
    duration: '30'
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
  const now = new Date()
  const startDate = now // Start immediately
  const endDate = new Date(now.getTime() + (parseInt(formData.duration) * 24 * 60 * 60 * 1000)) // duration in days
    
    // Format dates as yyyy-MM-ddTHH:mm:ss (without Z and milliseconds)
    const formatDateTime = (date) => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
    }
    
    const campaignData = {
      title: formData.title,
      description: formData.description,
      shortDescription: formData.shortDescription,
      goalAmount: Number(formData.goal).toFixed(2),
      category: formData.category,
      startDate: formatDateTime(startDate),
      endDate: formatDateTime(endDate)
      // Removed status - let backend set it
    }
    
    console.log('Sending campaign data:', JSON.stringify(campaignData, null, 2))
    
    try {
      const response = await fetch('http://localhost:8080/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(campaignData)
      })
      
      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)
      
      if (response.ok) {
        const savedCampaign = await response.json()
        console.log('Success:', savedCampaign)
        // Publish the campaign
        console.log('Publishing campaign with ID:', savedCampaign.id)
        const publishResponse = await fetch(`http://localhost:8080/api/campaigns/${savedCampaign.id}/publish`, {
          method: 'POST'
        })
        console.log('Publish response status:', publishResponse.status)
        if (publishResponse.ok) {
          const publishedCampaign = await publishResponse.json()
          console.log('Published campaign:', publishedCampaign)
          alert('Campaign created and published successfully! Status: ' + publishedCampaign.status)
          navigate('/browse')
        } else {
          const publishError = await publishResponse.text()
          console.error('Publish error:', publishError)
          alert('Campaign created but failed to publish: ' + publishError)
          navigate('/browse')
        }
      } else {
        const errorText = await response.text()
        console.log('Error response:', errorText)
        try {
          const error = JSON.parse(errorText)
          if (error.details) {
            const msgs = Object.entries(error.details).map(([f,m]) => `${f}: ${m}`).join('\n')
            alert('Please fix the following:\n' + msgs)
          } else {
            alert('Error: ' + (error.error || 'Unknown error'))
          }
        } catch {
          alert('Error: ' + errorText)
        }
      }
    } catch (error) {
      console.error('Network error:', error)
      alert('Network error: ' + error.message)
    }
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      shortDescription: '',
      goal: '',
      category: '',
      duration: '30'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center">Start Your Campaign</h2>
            <p className="mt-2 text-center text-gray-600">
              Bring your idea to life and get funding from supporters around the world.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="input-field"
                placeholder="Give your campaign a clear, descriptive title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                className="input-field"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                <option value="ART">Art & Design</option>
                <option value="MUSIC">Music</option>
                <option value="FILM">Film & Video</option>
                <option value="GAMES">Games</option>
                <option value="DESIGN">Design</option>
                <option value="TECHNOLOGY">Technology</option>
                <option value="FOOD">Food</option>
                <option value="PUBLISHING">Publishing</option>
                <option value="COMICS">Comics</option>
                <option value="FASHION">Fashion</option>
                <option value="THEATER">Theater</option>
                <option value="PHOTOGRAPHY">Photography</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows="6"
                required
                minLength="20"
                maxLength="5000"
                className="input-field resize-none"
                placeholder="Tell your story and explain why people should support your campaign (minimum 20 characters)"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div>
              <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Short Description *
              </label>
              <textarea
                id="shortDescription"
                name="shortDescription"
                rows="3"
                required
                minLength="10"
                maxLength="200"
                className="input-field resize-none"
                placeholder="A brief summary of your campaign (10-200 characters)"
                value={formData.shortDescription}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-2">
                  Funding Goal ($) *
                </label>
                <input
                  type="number"
                  id="goal"
                  name="goal"
                  required
                  min="1"
                  className="input-field"
                  placeholder="1000"
                  value={formData.goal}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Duration
                </label>
                <select
                  id="duration"
                  name="duration"
                  className="input-field"
                  value={formData.duration}
                  onChange={handleChange}
                >
                  <option value="15">15 days</option>
                  <option value="30">30 days</option>
                  <option value="45">45 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                </select>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                  Campaign Guidelines
                </a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="btn-primary w-full py-3 text-lg font-medium"
              >
                Create Campaign
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateCampaign