import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCurrentUser } from '../api/authService';
import { getRestaurant, updateRestaurant } from '../api/restaurantService';
import FormField from '../components/FormField';
import '../css/AddRestaurant.css';

const EditRestaurant = () => {
    const { id } = useParams();
    const navigate = useNavigate();

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
    const [loading, setLoading] = useState(true);

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (fieldErrors[field]) {
            setFieldErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const data = await getRestaurant(id);
                setForm({
                    name: data.name || '',
                    description: data.description || '',
                    street: data.street || '',
                    streetNumber: data.streetNumber || '',
                    city: data.city || '',
                    postalCode: data.postalCode || ''
                });
            } catch {
                setGeneralError("Nie udało się wczytać danych restauracji.");
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurant();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFieldErrors({});
        setGeneralError(null);

        try {
            const user = getCurrentUser();
            if (!user || user.role !== 'ADMIN') {
                setGeneralError("Brak uprawnień do edycji");
                return;
            }

            await updateRestaurant(id, form, user.token);
            navigate(`/restaurant/${id}`);
        } catch (error) {
            const data = error.response?.data;
            if (data?.messages) {
                setFieldErrors(data.messages);
                setGeneralError(data.message);
            } else {
                setGeneralError("Błąd zapisu danych");
            }
        }
    };

    if (loading) return <div className="center-text">Wczytywanie danych...</div>;

    return (
        <div className="add-restaurant-container">
            <h2>Edytuj restaurację</h2>

            {generalError && <div className="error-banner">{generalError}</div>}

  <form className="add-restaurant-form" onSubmit={handleSubmit}>
    <FormField
        placeholder="Nazwa"
        value={form.name}
        error={fieldErrors.name}
        onChange={v => handleChange('name', v)}
    />

    <FormField
        as="textarea"
        placeholder="Opis"
        value={form.description}
        error={fieldErrors.description}
        onChange={v => handleChange('description', v)}
    />

    <FormField
        placeholder="Ulica"
        value={form.street}
        error={fieldErrors.street}
        onChange={v => handleChange('street', v)}
    />

    <FormField
        placeholder="Numer"
        value={form.streetNumber}
        error={fieldErrors.streetNumber}
        onChange={v => handleChange('streetNumber', v)}
    />

    <FormField
        placeholder="Miasto"
        value={form.city}
        error={fieldErrors.city}
        onChange={v => handleChange('city', v)}
    />

    <FormField
        placeholder="Kod pocztowy"
        value={form.postalCode}
        error={fieldErrors.postalCode}
        onChange={v => handleChange('postalCode', v)}
    />

    <div className="form-actions">
        <button type="submit" className="submit-button">Zapisz</button>
        <button type="button" className="cancel-button" onClick={() => navigate(-1)}>
            Anuluj
        </button>
    </div>
</form>

        </div>
    );
};

export default EditRestaurant;
