import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCountryByCode } from '../services/api';

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
        <div style={{ padding: '40px' }}>
            <Link to="/">
                <button style={{ marginBottom: '20px', cursor: 'pointer' }}>← Voltar para a lista</button>
            </Link>

            <div style={{ display: 'flex', gap: '40px', alignItems: 'start' }}>
                <img src={country.flags.svg} alt={country.name.common} style={{ width: '400px', borderRadius: '8px' }} />

                <div>
                    <h1>{country.name.official}</h1>
                    <p><strong>Nome Comum:</strong> {country.name.common}</p>
                    <p><strong>Região:</strong> {country.region} ({country.subregion})</p>
                    <p><strong>Área:</strong> {country.area.toLocaleString()} km²</p>
                    <p><strong>Idiomas:</strong> {languages}</p>
                    <p><strong>Moedas:</strong> {currencies}</p>
                    <p><strong>Código (cca3):</strong> {country.cca3}</p>
                </div>
            </div>
        </div>
    );
}