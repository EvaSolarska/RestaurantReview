import { Link } from "react-router-dom";
import "../css/RestaurantCard.css";

const RestaurantCard = ({ res }) => {
    return (
        <div className="restaurant-card">
            <div className="card-content">
                <h2 className="restaurant-title">{res.name}</h2>
                <div className="location-badge">
                    <span className="location-icon">📍</span>
                    <span className="location-text">
                        {res.street} {res.streetNumber}, {res.city}
                    </span>
                </div>

                <p className="restaurant-description">
                    {res.description?.length > 100
                        ? `${res.description.substring(0, 100)}...`
                        : res.description}
                </p>
            </div>

            <div className="card-footer">
                <div className="rating-section">
                    <div className="star-rating-wrapper">
                        <span className="star full">★</span>
                    </div>
                    <span className="rating-value">
                        {res.averageRating?.toFixed(1) ?? "0.0"}
                    </span>
                    <span className="reviews-count">({res.reviewCount ?? 0})</span>
                </div>
                <Link to={`/restaurant/${res.id}`} className="details-link">
                    Szczegóły
                </Link>
            </div>
        </div>
    );
};

export default RestaurantCard;
