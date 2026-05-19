import { useState } from "react";
import { createBooking, getBookingsById } from "../api/api";

function BookingSection() {
  const [formData, setFormData] = useState({
    memberId: "",
    destinationId: "",
    checkin: "",
    checkout: "",
  });

  const [historyMemberId, setHistoryMemberId] = useState("");
  const [bookingResult, setBookingResult] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleCreateBooking = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await createBooking({
        memberId: Number(formData.memberId),
        destinationId: Number(formData.destinationId),
        checkin: formData.checkin,
        checkout: formData.checkout,
      });

      setBookingResult(response.data);
      setMessage("✓ Booking created successfully.");
      setMessageType("success");

      setFormData({
        memberId: "",
        destinationId: "",
        checkin: "",
        checkout: "",
      });
    } catch (error) {
      setBookingResult(null);
      setMessage("✗ Could not create booking.");
      setMessageType("error");
    }
  };

  const handleLoadHistory = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await getBookingsById(historyMemberId);
      setBookings(response.data);
      setMessage("✓ Booking history loaded.");
      setMessageType("success");
    } catch (error) {
      setBookings([]);
      setMessage("✗ Could not load booking history.");
      setMessageType("error");
    }
  };

  return (
    <section className="w-full">
      <div className="bg-green-600 rounded-t-lg px-6 py-6">
        <p className="text-green-200 text-sm font-semibold uppercase">Bookings</p>
        <h2 className="text-3xl font-bold text-white mt-1">Create and Review</h2>
      </div>

      <div className="bg-white rounded-b-lg shadow p-6">
        {/* Create Booking Form */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Create Booking</h3>
          <form onSubmit={handleCreateBooking} className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Member ID</label>
              <input
                name="memberId"
                type="number"
                value={formData.memberId}
                onChange={handleChange}
                placeholder="1"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination ID</label>
              <input
                name="destinationId"
                type="number"
                value={formData.destinationId}
                onChange={handleChange}
                placeholder="1"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
              <input
                name="checkin"
                type="date"
                value={formData.checkin}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
              <input
                name="checkout"
                type="date"
                value={formData.checkout}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className="md:col-span-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition"
            >
              Create Booking
            </button>
          </form>
        </div>

        {/* Booking Result */}
        {bookingResult && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h4 className="font-semibold text-gray-800 mb-2">Booking Confirmation</h4>
            <p><strong>Booking ID:</strong> {bookingResult.id}</p>
            <p><strong>Member:</strong> {bookingResult.memberName}</p>
            <p><strong>Destination:</strong> {bookingResult.destinationName || bookingResult.name}</p>
            <p><strong>Dates:</strong> {bookingResult.checkin} to {bookingResult.checkout}</p>
            <p><strong>Points Used:</strong> {bookingResult.pointsUsed}</p>
            <p><strong>Remaining Points:</strong> {bookingResult.remainingPointBalance}</p>
          </div>
        )}

        {/* Search History */}
        <div className="mb-6 border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Booking History</h3>
          <form onSubmit={handleLoadHistory} className="flex gap-2">
            <input
              value={historyMemberId}
              onChange={(event) => setHistoryMemberId(event.target.value)}
              placeholder="Member ID"
              type="number"
              required
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition"
            >
              Load History
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

        {/* Bookings List */}
        {bookings.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Bookings</h4>
            <div className="space-y-2">
              {bookings.map((booking) => (
                <div key={booking.id} className="p-3 border border-gray-200 rounded-md flex justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{booking.destinationName || booking.name}</p>
                    <p className="text-sm text-gray-600">{booking.checkin} to {booking.checkout}</p>
                  </div>
                  <p className="font-semibold text-gray-800">{booking.pointsUsed} pts</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default BookingSection;
