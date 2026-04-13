import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getRestaurants } from '../api/restaurantService';
import '../css/RestaurantList.css';
import RestaurantCard from '../components/RestaurantCard';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAdmin } = useAuth();

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await getRestaurants();
                setRestaurants(data);
            } catch (err) {
                console.error("Szczegóły błędu:", err.message);
                setError("Nie udało się załadować listy restauracji.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) return <div className="center-text">Ładowanie restauracji... </div>;
    if (error) return <div className="center-text" style={{ color: 'red' }}>{error}</div>;

    return (
        <div className="restaurant-container">
            <header className="restaurant-header">
                <h1>Restauracje</h1>
                {isAdmin && (
                    <Link to="/add-restaurant" className="add-button">+ Dodaj nową restaurację</Link>
                )}
            </header>

            <div className="restaurant-grid">
                {restaurants.length === 0 ? (
                    <p className="center-text">Brak restauracji do wyświetlenia.</p>
                ) : (
                    restaurants.map(res => (
                        <RestaurantCard key={res.id} res={res} />
                    ))
                )}
            </div>

        </div>
    );
};

export default RestaurantList;