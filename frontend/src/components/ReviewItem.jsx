import { useState } from 'react';

const ReviewItem = ({ review, onUpdate, onDelete, currentUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(review.content);
    const [editRating, setEditRating] = useState(review.rating);
    const [fieldErrors, setFieldErrors] = useState({});
const handleSave = async () => {
        try {
            setFieldErrors({});
            await onUpdate(review.id, editContent, editRating);
            setIsEditing(false);
        } catch (err) {
            if (err.response?.data?.messages) {
                setFieldErrors(err.response.data.messages);
            }
        }
    };

if (isEditing) {
        return (
            <div className="review-item editing">
                <select value={editRating} onChange={(e) => setEditRating(Number(e.target.value))}>
                    {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} ⭐</option>)}
                </select>
                <textarea 
                    value={editContent} 
                    onChange={(e) => setEditContent(e.target.value)}
                    className={fieldErrors.content ? "input-error" : ""}
                />
                {fieldErrors.content && <p className="error-text">{fieldErrors.content}</p>}
                
                <div className="edit-actions">
                    <button onClick={handleSave}>Zapisz</button>
                    <button onClick={() => { setIsEditing(false); setFieldErrors({}); }}>Anuluj</button>
                </div>
            </div>
        );
    }

    return (
        <div className="review-item">
            <div className="review-header">
                <strong>{review.authorName}</strong>
                <span className="review-stars">{"⭐".repeat(review.rating)}</span>
            </div>
            <p>{review.content}</p>
            {currentUser === review.authorName && (
                <div className="review-actions">
                    <button onClick={() => setIsEditing(true)}>Edytuj</button>
                    <button onClick={() => onDelete(review.id)} className="text-delete">Usuń</button>
                </div>
            )}
        </div>
    );
};

export default ReviewItem;