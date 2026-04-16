import { Link } from 'react-router-dom';

export default function Card({ country }) {
    return (
        <Link
            to={`/country/${country.cca3}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
        >
            <div style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                backgroundColor: '#fff'
            }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                <img
                    src={country.flags.svg}
                    alt={country.name.common}
                    style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <h3 style={{ margin: '10px 0' }}>{country.name.common}</h3>
                <p><strong>Capital:</strong> {country.capital || "N/A"}</p>
                <p><strong>Região:</strong> {country.region}</p>
                <p><strong>População:</strong> {country.population.toLocaleString()}</p>
            </div>
        </Link>
    );
}