import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MemberSection from "./components/MemberSection";
import DestinationSection from "./components/DestinationSection";
import BookingSection from "./components/BookingSection";
import AiSection from "./components/AiSection";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/members",
        element: <MemberSection />,
      },
      {
        path: "/destinations",
        element: <DestinationSection />,
      },
      {
        path: "/bookings",
        element: <BookingSection />,
      },
      {
        path: "/ai",
        element: <AiSection />,
      },
      {
        path: "/",
        element: <MemberSection />,
      },
    ],
  },
]);
