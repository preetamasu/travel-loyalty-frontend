import "./App.css";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Travel Rewards
            </h1>
            <ul className="flex gap-6">
              <li>
                <Link
                  to="/members"
                  className="text-gray-700 hover:text-purple-600 font-semibold transition"
                >
                  Members
                </Link>
              </li>
              <li>
                <Link
                  to="/destinations"
                  className="text-gray-700 hover:text-blue-600 font-semibold transition"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  to="/bookings"
                  className="text-gray-700 hover:text-green-600 font-semibold transition"
                >
                  Bookings
                </Link>
              </li>
              <li>
                <Link
                  to="/ai"
                  className="text-gray-700 hover:text-orange-600 font-semibold transition"
                >
                  AI Assistant
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <p className="text-purple-600 text-sm font-semibold tracking-wider uppercase">Travel Loyalty Platform</p>
          <h2 className="text-5xl font-bold text-gray-900 mt-2">Travel Rewards Dashboard</h2>
          <p className="text-gray-600 text-lg mt-3">
            Manage members, destinations, bookings, and AI-powered recommendations.
          </p>
        </div>
      </header>

      {/* Content rendered by router Outlet */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <Outlet />
      </section>
    </div>
  );
}

export default App;
