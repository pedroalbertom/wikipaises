import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCountryByCode } from '../services/api';
import './Detail.css'

export default function Detail() {
    const { code } = useParams();
    const [country, setCountry] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await getCountryByCode(code);
                const data = Array.isArray(response.data) ? response.data[0] : response.data;
                setCountry(data);
            } catch (error) {
                console.error("Erro ao buscar detalhes:", error);
            }
        };
        fetchDetail();
    }, [code]);

    if (!country) return <p>Carregando detalhes...</p>;

    const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
    const currencies = country.currencies ?
        Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ') : 'N/A';

    return (
        <div className='main-container'>
            <Link to="/">
                <button className='button'>← Voltar para a lista</button>
            </Link>

            <div className='country'>
                <img src={country.flags.svg} alt={country.name.common} style={{ width: '400px', borderRadius: '8px' }} />
                <h1>{country.name.official}</h1>
                <p><strong>{country.name.common}</strong></p>
                <div className='info-wrapper'>
                    <div className='info-column'>
                        <p><strong>Capital:</strong> {country.capital}</p>
                        <p><strong>Continente:</strong> {country.region}</p>
                        <p><strong>Sub-região:</strong> {country.subregion}</p>
                        <p><strong>Área:</strong> {country.area.toLocaleString()} km²</p>
                    </div>

                    <div className='info-column'>
                        <p><strong>População:</strong> {country.population.toLocaleString()}</p>
                        <p><strong>Idiomas:</strong> {languages}</p>
                        <p><strong>Moedas:</strong> {currencies}</p>
                        <p><strong>Código (cca3):</strong> {country.cca3}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}