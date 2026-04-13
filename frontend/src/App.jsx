import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RestaurantList from './pages/RestaurantList';
import RestaurantDetails from './pages/RestaurantDetails';
import Login from './pages/Login';
import AddRestaurant from './pages/AddRestaurant';
import EditRestaurant from './pages/EditRestaurant';
import AdminRoute from './components/AdminRoute';
import Register from './pages/Register';

function App() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<RestaurantList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-restaurant" element={<AdminRoute><AddRestaurant /></AdminRoute>} />
          <Route path="/edit-restaurant/:id" element={<AdminRoute><EditRestaurant /></AdminRoute>} />
        </Routes>
      </main>
    </>
  );
}

export default App;