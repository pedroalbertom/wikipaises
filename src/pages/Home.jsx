import { useState, useEffect } from 'react';
import { getAllCountries, getCountriesByName, getCountriesByRegion } from '../services/api';
import Card from '../components/Card';
import './Home.css';

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
        <main className='main-container'>
            <header className="home-header">
                <h2 className="atlas-title">Explore the Atlas</h2>
                <p className="atlas-subtitle">A curated digital archive of sovereign nations and cultures</p>
            </header>

            <div className='search-container'>
                <input
                    className='search-input'
                    type="text"
                    placeholder="Search by nation, capital..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setRegion('');
                    }}
                />

                <select
                    className='search-select'
                    value={region}
                    onChange={(e) => {
                        setRegion(e.target.value);
                        setSearchTerm('');
                    }}
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
                <p style={{ textAlign: 'center' }}>Carregando...</p>
            ) : (
                <>
                    <div className='countries-grid'>
                        {currentCountries.map((country) => (
                            <Card key={country.cca3} country={country} />
                        ))}
                    </div>

                    {countries.length > countriesPerPage && (
                        <div className="pagination-container">
                            <button
                                className="pagination-button"
                                onClick={handlePrev}
                                disabled={currentPage === 1}
                            >
                                ← PREVIOUS
                            </button>

                            <span className="page-indicator">
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                className="pagination-button"
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
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