import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCountryByCode } from '../services/api';

export default function Detail() {
    const { code } = useParams(); // Pega o ":code" da URL (ex: BRA) 
    const [country, setCountry] = useState(null);

    useEffect(() => {
        getCountryByCode(code).then(response => {
            // Como o endpoint /alpha retorna um array ou objeto, 
            // pegamos a primeira posição se for array.
            const data = Array.isArray(response.data) ? response.data : response.data;
            setCountry(data);
        });
    }, [code]);

    if (!country) return <p>Carregando detalhes...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/">{/* Requisito 40 [cite: 40] */}
                <button>Voltar para a lista</button>
            </Link>
            <h1>{country.name.official}</h1>
            {/* Aqui você vai montar os cards/blocos de info do layout  */}
        </div>
    );
}