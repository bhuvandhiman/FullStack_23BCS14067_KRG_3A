import { Link } from 'react-router-dom'

const CampaignCard = ({ id, title, description, goal, raised }) => {
  const progress = Math.min((raised / goal) * 100, 100);

  return (
    <Link to={`/campaign/${id}`} className="block h-full">
      <div className="card p-6 h-full flex flex-col hover:shadow-lg transition-all duration-300 cursor-pointer">
        <div className="flex-grow">
          <h5 className="text-xl font-semibold text-blue-600 mb-3 hover:text-blue-700 transition-colors">{title}</h5>
          <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Raised: ${raised.toLocaleString()}</span>
              <span>Goal: ${goal.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">{progress.toFixed(1)}% funded</p>
          </div>
        </div>
        <div className="btn-primary w-full mt-4 text-center hover:scale-105 transition-transform">
          View Campaign
        </div>
      </div>
    </Link>
  )
}

export default CampaignCard