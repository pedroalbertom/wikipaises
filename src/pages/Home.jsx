import { useState, useEffect } from 'react';
import { getAllCountries } from '../services/api';

export default function Home() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await getAllCountries();
                setCountries(response.data);
            } catch (error) {
                console.error("Erro ao buscar países:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    if (loading) return <p>Carregando países...</p>;

    return (
        <main style={{ padding: '20px' }}>
            <h2>Explore the Atlas</h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '20px'
            }}>
                {countries.slice(0, 10).map((country) => (
                    <div key={country.cca3} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
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
                ))}
            </div>
        </main>
    );
}