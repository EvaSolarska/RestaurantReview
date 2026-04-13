const FormField = ({ 
    as = 'input',
    value,
    placeholder,
    error,
    onChange 
}) => {
    const Component = as;

    return (
        <div className="form-group">
            <Component
                value={value}
                placeholder={placeholder}
                onChange={e => onChange(e.target.value)}
                className={error ? 'input-error' : ''}
            />
            {error && <span className="field-error">{error}</span>}
        </div>
    );
};

export default FormField;
