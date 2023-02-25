import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./context/UserContext";
import AccountPage from "./pages/AccountPage";
import AccommodationsPage from "./pages/AccommodationsPage";
import AccommodationsFormPage from "./pages/AccommodationsFormPage";
import AccommodationPage from "./pages/AccommodationPage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";



axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials = true;


//layout = template
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/" element={<AccountPage />} />
          <Route path="/account/accommodations" element={<AccommodationsPage />} />
          <Route path="/account/accommodations/new" element={<AccommodationsFormPage />} />
          <Route path="/account/accommodations/:id" element={<AccommodationsFormPage />} />
          <Route path="/accommodation/:id" element={<AccommodationPage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>

      </Routes>

    </UserContextProvider>
  )
}

export default App
