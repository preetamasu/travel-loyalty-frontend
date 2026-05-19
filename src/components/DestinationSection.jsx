import { useState } from "react";
import { createDestination, getAllDestinations } from "../api/api";

function DestinationSection() {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    roomPricePerNight: "",
  });

  const [destinations, setDestinations] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleCreateDestination = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await createDestination({
        name: formData.name,
        country: formData.country,
        roomPricePerNight: Number(formData.roomPricePerNight),
      });

      setDestinations((current) => [...current, response.data]);
      setMessage("✓ Destination added successfully.");
      setMessageType("success");

      setFormData({
        name: "",
        country: "",
        roomPricePerNight: "",
      });
    } catch (error) {
      setMessage("✗ Could not add destination.");
      setMessageType("error");
    }
  };

  const handleLoadDestinations = async () => {
    setMessage("");

    try {
      const response = await getAllDestinations();
      setDestinations(response.data);
      setMessage("✓ Destinations loaded.");
      setMessageType("success");
    } catch (error) {
      setMessage("✗ Could not load destinations.");
      setMessageType("error");
    }
  };

  return (
    <section className="w-full">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-t-2xl px-8 py-8 flex justify-between items-center">
        <div>
          <p className="text-blue-200 text-sm font-semibold tracking-wider uppercase">Destinations</p>
          <h2 className="text-4xl font-bold text-white mt-2">Add and Browse</h2>
        </div>
        <button
          type="button"
          onClick={handleLoadDestinations}
          className="bg-white hover:bg-blue-50 text-blue-600 font-bold py-2 px-6 rounded-lg transition duration-200 transform hover:scale-105"
        >
          Load Destinations
        </button>
      </div>

      <div className="bg-white rounded-b-2xl shadow-lg p-8">
        {/* Add Destination Form */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Create New Destination</h3>
          <form onSubmit={handleCreateDestination} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Cancun Resort"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Mexico"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Points Per Night</label>
              <input
                name="roomPricePerNight"
                type="number"
                value={formData.roomPricePerNight}
                onChange={handleChange}
                placeholder="3000"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <button
              type="submit"
              className="md:col-span-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 transform hover:scale-105"
            >
              Add Destination
            </button>
          </form>
        </div>

        {/* Message Display */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg font-medium ${
              messageType === "success"
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {message}
          </div>
        )}

        {/* Destinations List */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Destinations</h3>
          {destinations.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No destinations yet. Load or create one!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {destinations.map((destination) => (
                <div key={destination.id} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200 hover:shadow-lg transition">
                  <h4 className="text-lg font-bold text-gray-800">{destination.name}</h4>
                  <p className="text-gray-600 mb-3">{destination.country}</p>
                  <div className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {destination.roomPricePerNight.toLocaleString()} pts/night
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default DestinationSection;
