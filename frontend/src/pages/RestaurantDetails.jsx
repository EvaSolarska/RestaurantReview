// src/pages/RestaurantDetails.js
import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    getRestaurant, deleteRestaurant, addReview, updateReview, deleteReview
} from '../api/restaurantService';
import AddReviewForm from '../components/AddReviewForm';
import ReviewList from '../components/ReviewList';
import '../css/RestaurantDetails.css';

const RestaurantDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAdmin } = useAuth();

    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const data = await getRestaurant(id);
            setRestaurant(data);
            setError(null);
        } catch {
            setError("Nie udało się pobrać danych o restauracji.");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDeleteRestaurant = async () => {
        if (!window.confirm("Czy na pewno chcesz usunąć tę restaurację?")) return;
        try {
            await deleteRestaurant(id, user.token);
            navigate('/');
        } catch {
            alert("Błąd usuwania restauracji.");
        }
    };

    const handleAddReview = async (content, rating) => {
        try {
            setSubmitting(true);
            await addReview(id, { content, rating }, user.token);
            fetchData();
        } finally {
            setSubmitting(false);
        }
    };
    const handleEditReview = async (reviewId, content, rating) => {
        try {
            await updateReview(id, reviewId, { content, rating }, user.token);
            fetchData();
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (!window.confirm("Usunąć opinię?")) return;
        try {
            await deleteReview(id, reviewId, user.token);
            fetchData();
        } catch (err) {
            alert("Nie udało się usunąć opinii: " + err.message);
        }
    };

    if (loading) return <div className="loader">Ładowanie...</div>;
    if (error || !restaurant) return <div className="error-msg">{error}</div>;

    return (
        <div className="details-container">
            <div className="details-nav">
<button className="back-btn" onClick={() => navigate('/')}>
    <span className="arrow">←</span> Wróć</button>
                {isAdmin && (
                    <div className="admin-actions-clean">
                        <Link to={`/edit-restaurant/${id}`} className="admin-link-small edit">
                            Edytuj ✏️
                        </Link>
                        <button onClick={handleDeleteRestaurant} className="admin-link-small delete">
                            Usuń 🗑️
                        </button>
                    </div>
                )}
            </div>

            <div className="details-card">
                <h1>{restaurant.name}</h1>
                <p className="description">{restaurant.description}</p>
                <p className="address">📍 {restaurant.city}, {restaurant.street} {restaurant.streetNumber}</p>
                <div className="badge-rating">
                    Ocena: ⭐ {restaurant.averageRating?.toFixed(1) || "0.0"} ({restaurant.reviewCount || 0} opinii)
                </div>

                <hr className="divider" />

                {user ? (
                    <AddReviewForm onSubmit={handleAddReview} submitting={submitting} />
                ) : (
                    <p className="login-prompt">
                        <Link to="/login">Zaloguj się</Link>, aby dodać opinię.
                    </p>
                )}

                <h3 className="reviews-title">Opinie klientów</h3>
                <ReviewList
                    reviews={restaurant.reviews}
                    currentUser={user}
                    onUpdate={handleEditReview}
                    onDelete={handleDeleteReview}
                />

            </div>
        </div>
    );
};

export default RestaurantDetails;
