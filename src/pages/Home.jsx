import { useState, useEffect } from 'react';
import { getAllCountries, getCountriesByName, getCountriesByRegion } from '../services/api';
import Card from '../components/Card';

export default function Home() {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [region, setRegion] = useState('');
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const countriesPerPage = 12;

    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);
    const totalPages = Math.ceil(countries.length / countriesPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response;
                if (searchTerm) {
                    response = await getCountriesByName(searchTerm);
                } else if (region) {
                    response = await getCountriesByRegion(region);
                } else {
                    response = await getAllCountries();
                }
                setCountries(response.data);
                setCurrentPage(1);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
                setCountries([]);
            } finally {
                setLoading(false);
            }
        };

        const delayDebounce = setTimeout(() => {
            fetchData();
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm, region]);

    return (
        <main style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="Search by nation, capital..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setRegion('');
                    }}
                    style={{ padding: '10px', flex: 1 }}
                />

                <select
                    value={region}
                    onChange={(e) => {
                        setRegion(e.target.value);
                        setSearchTerm('');
                    }}
                    style={{ padding: '10px' }}
                >
                    <option value="">All Continents</option>
                    <option value="africa">Africa</option>
                    <option value="americas">Americas</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="oceania">Oceania</option>
                </select>
            </div>

            {loading ? (
                <p>Carregando...</p>
            ) : (
                <>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '20px'
                    }}>
                        {currentCountries.map((country) => (
                            <Card key={country.cca3} country={country} />
                        ))}
                    </div>

                    {countries.length > countriesPerPage && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '20px',
                            marginTop: '40px'
                        }}>
                            <button
                                onClick={handlePrev}
                                disabled={currentPage === 1}
                                style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer', padding: '10px 20px' }}
                            >
                                ← PREVIOUS
                            </button>

                            <span style={{ fontWeight: 'bold' }}>
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', padding: '10px 20px' }}
                            >
                                NEXT →
                            </button>
                        </div>
                    )}
                </>
            )}
        </main>
    );
}