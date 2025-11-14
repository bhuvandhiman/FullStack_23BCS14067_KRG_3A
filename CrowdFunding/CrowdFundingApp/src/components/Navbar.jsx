import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link className="text-xl font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300" to="/">
              CrowdFunding
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300" to="/">
              Home
            </Link>
            <Link className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300" to="/browse">
              Browse Campaigns
            </Link>
            <Link className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300" to="/create">
              Start a Campaign
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar