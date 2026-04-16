export default function Card({ country }) {
    return (
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
            <img
                src={country.flags.svg}
                alt={country.name.common}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <h3>{country.name.common}</h3>
            <p><strong>Capital:</strong> {country.capital || "N/A"}</p>
            <p><strong>Região:</strong> {country.region}</p>
            <p><strong>População:</strong> {country.population.toLocaleString()}</p>
        </div>
    );
}