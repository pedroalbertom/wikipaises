import { useState, useEffect } from 'react';
import { getAllCountries } from '../services/api';
import Card from '../components/Card';

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
                    <Card key={country.cca3} country={country} />
                ))}
            </div>
        </main>
    );
}