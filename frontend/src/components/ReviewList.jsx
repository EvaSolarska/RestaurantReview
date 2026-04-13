import ReviewItem from './ReviewItem';

const ReviewList = ({ reviews, onUpdate, onDelete, currentUser }) => (
    <div className="reviews-list">
        {reviews?.length === 0 ? <p>Brak opinii</p> : 
            reviews.map(rev => (
                <ReviewItem 
                    key={rev.id} 
                    review={rev} 
                    onUpdate={onUpdate} 
                    onDelete={onDelete} 
                    currentUser={currentUser?.username}
                />
            ))
        }
    </div>
);

export default ReviewList;