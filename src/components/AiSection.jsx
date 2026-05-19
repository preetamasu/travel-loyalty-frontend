import { useState } from "react";
import { aiRecommendation } from "../api/api";

function AiSection() {
  const [formData, setFormData] = useState({
    memberId: "",
    countryPreference: "",
    maxNights: "",
  });

  const [recommendation, setRecommendation] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleRecommendation = async (event) => {
    event.preventDefault();
    setMessage("");
    setRecommendation("");

    try {
      const response = await aiRecommendation({
        memberId: Number(formData.memberId),
        countryPreference: formData.countryPreference,
        maxNights: Number(formData.maxNights),
      });

      setRecommendation(response.data.recommendation);
      setMessage("✓ Recommendation generated.");
      setMessageType("success");
    } catch (error) {
      setMessage("✗ Could not generate recommendation.");
      setMessageType("error");
    }
  };

  return (
    <section className="w-full">
      <div className="bg-orange-600 rounded-t-lg px-6 py-6">
        <p className="text-orange-200 text-sm font-semibold uppercase">AI Recommendation</p>
        <h2 className="text-3xl font-bold text-white mt-1">Suggest a Trip</h2>
      </div>

      <div className="bg-white rounded-b-lg shadow p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Get AI Recommendation</h3>
          <form onSubmit={handleRecommendation} className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Member ID</label>
              <input
                name="memberId"
                type="number"
                value={formData.memberId}
                onChange={handleChange}
                placeholder="1"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country Preference</label>
              <input
                name="countryPreference"
                value={formData.countryPreference}
                onChange={handleChange}
                placeholder="Mexico"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Nights</label>
              <input
                name="maxNights"
                type="number"
                value={formData.maxNights}
                onChange={handleChange}
                placeholder="4"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              className="md:col-span-3 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition"
            >
              Get Recommendation
            </button>
          </form>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-md text-sm font-medium ${
              messageType === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        {/* Recommendation */}
        {recommendation && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h4 className="font-semibold text-gray-800 mb-2">Recommendation</h4>
            <p className="text-gray-700">{recommendation}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default AiSection;

