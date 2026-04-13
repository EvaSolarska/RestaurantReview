import { useState } from 'react';

const AddReviewForm = ({ onSubmit, submitting }) => {
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(5);
    const [fieldErrors, setFieldErrors] = useState({}); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFieldErrors({}); 
        
        try {
            await onSubmit(content, rating);
            setContent('');
            setRating(5);
        } catch (err) {
            if (err.response?.data?.messages) {
                setFieldErrors(err.response.data.messages);
            }
        }
    };

return (
    <div className="add-review-section">
        <h3 className="section-title">Twoja opinia</h3>
        <form onSubmit={handleSubmit} className="review-form">
            <div className="form-row">
                <label className="form-label">Twoja ocena:</label>
                <select className="rating-select" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                    {[5, 4, 3, 2, 1].map(num => <option key={num} value={num}>{num} ⭐</option>)}
                </select>
            </div>
            
            <div className="form-group">
                <textarea 
                    value={content} 
                    onChange={(e) => {
                        setContent(e.target.value);
                        if (fieldErrors.content) setFieldErrors({});
                    }} 
                    placeholder="Napisz coś o jedzeniu, obsłudze lub atmosferze..." 
                    className={`review-textarea ${fieldErrors.content ? "input-error" : ""}`}
                />
                {fieldErrors.content && <p className="error-text">{fieldErrors.content}</p>}
            </div>

            <button type="submit" disabled={submitting} className="btn-submit">
                {submitting ? 'Wysyłanie...' : 'Opublikuj opinię'}
            </button>
        </form>
    </div>
);
};

export default AddReviewForm;
