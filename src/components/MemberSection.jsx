import { useState } from "react";
import { createMember, getMemberById } from "../api/api";

function MemberSection() {
  const [formData, setFormData] = useState({
    memberName: "",
    email: "",
    pointBalance: "",
  });

  const [searchId, setSearchId] = useState("");
  const [memberResult, setMemberResult] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleCreateMember = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await createMember({
        memberName: formData.memberName,
        email: formData.email,
        pointBalance: Number(formData.pointBalance),
      });

      setMemberResult(response.data);
      setMessage("✓ Member created successfully.");
      setMessageType("success");

      setFormData({
        memberName: "",
        email: "",
        pointBalance: "",
      });
    } catch (error) {
      setMessage("✗ Could not create member.");
      setMessageType("error");
    }
  };

  const handleGetMember = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await getMemberById(searchId);
      console.log("API Response:", response.data);
      setMemberResult(response.data);
      setMessage("✓ Member found.");
      setMessageType("success");
    } catch (error) {
      setMemberResult(null);
      setMessage("✗ Member not found.");
      setMessageType("error");
    }
  };

  return (
    <section className="w-full">
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-t-2xl px-8 py-8">
        <p className="text-purple-200 text-sm font-semibold tracking-wider uppercase">Members</p>
        <h2 className="text-4xl font-bold text-white mt-2">Register and Search</h2>
      </div>

      <div className="bg-white rounded-b-2xl shadow-lg p-8">
        {/* Register Member Form */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Create New Member</h3>
          <form onSubmit={handleCreateMember} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                name="memberName"
                value={formData.memberName}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Points Balance</label>
              <input
                name="pointBalance"
                type="number"
                value={formData.pointBalance}
                onChange={handleChange}
                placeholder="25000"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>

            <button
              type="submit"
              className="md:col-span-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 transform hover:scale-105"
            >
              Create Member
            </button>
          </form>
        </div>

        <div className="border-t border-gray-200 pt-8 mb-8">
          {/* Search Member Form */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Search Member</h3>
          <form onSubmit={handleGetMember} className="flex gap-3">
            <input
              value={searchId}
              onChange={(event) => setSearchId(event.target.value)}
              placeholder="Enter Member ID"
              type="number"
              required
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold py-2 px-8 rounded-lg transition duration-200 transform hover:scale-105"
            >
              Search
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

        {/* Member Result Display */}
        {memberResult && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 border-2 border-purple-200">
            <h4 className="text-lg font-bold text-gray-800 mb-4">Member Details</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 shadow">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">ID</p>
                <p className="text-xl font-bold text-purple-600">{memberResult.id}</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Name</p>
                <p className="text-lg font-semibold text-gray-800">{memberResult.name}</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow md:col-span-2">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Email</p>
                <p className="text-sm text-gray-700 break-all">{memberResult.email}</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Points</p>
                <p className="text-2xl font-bold text-indigo-600">{memberResult.pointBalance.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default MemberSection;
