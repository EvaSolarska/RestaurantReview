import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../api/authService';
import { createRestaurant } from '../api/restaurantService';
import FormField from '../components/FormField';
import '../css/AddRestaurant.css';

const AddRestaurant = () => {
    const [form, setForm] = useState({
        name: '',
        description: '',
        street: '',
        streetNumber: '',
        city: '',
        postalCode: ''
    });

    const [fieldErrors, setFieldErrors] = useState({});
    const [generalError, setGeneralError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (fieldErrors[field]) {
            setFieldErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFieldErrors({});
        setGeneralError(null);

        try {
            const user = getCurrentUser();
            if (!user || user.role !== 'ADMIN') {
                setGeneralError('Brak uprawnień');
                return;
            }

            await createRestaurant(form, user.token);
            navigate('/');
        } catch (err) {
            const data = err.response?.data;
            if (data?.messages) {
                setFieldErrors(data.messages);
                setGeneralError(data.message);
            } else {
                setGeneralError('Wystąpił błąd');
            }
        }
    };

    return (
        <div className="add-restaurant-container">
            <h2>Dodaj nową restaurację</h2>

            {generalError && <div className="error-banner">{generalError}</div>}

            <form className="add-restaurant-form" onSubmit={handleSubmit}>
                <FormField placeholder="Nazwa" value={form.name} error={fieldErrors.name} onChange={v => handleChange('name', v)} />
                <FormField as="textarea" placeholder="Opis" value={form.description} error={fieldErrors.description} onChange={v => handleChange('description', v)} />
                <FormField placeholder="Ulica" value={form.street} error={fieldErrors.street} onChange={v => handleChange('street', v)} />
                <FormField placeholder="Numer" value={form.streetNumber} error={fieldErrors.streetNumber} onChange={v => handleChange('streetNumber', v)} />
                <FormField placeholder="Miasto" value={form.city} error={fieldErrors.city} onChange={v => handleChange('city', v)} />
                <FormField placeholder="Kod pocztowy" value={form.postalCode} error={fieldErrors.postalCode} onChange={v => handleChange('postalCode', v)} />

 <div className="form-actions"> <button type="submit" className="submit-button">Dodaj</button> <button type="button" className="cancel-button" onClick={() => navigate('/')} > Anuluj </button> </div>
            </form>
        </div>
    );
};

export default AddRestaurant;
