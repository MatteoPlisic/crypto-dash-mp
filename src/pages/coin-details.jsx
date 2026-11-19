import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import CoinChart from "../components/CoinChart";
const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinDetailsPage = () => {
    const {id} = useParams();
    const [coin, setCoin] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error,setError] = useState(null)

    useEffect(() => {
        const fetchCoin = async () => {
            try {
                const res = await fetch(`${API_URL}/${id}`)
                const data = await res.json();
                setCoin(data)
            } catch (err) {
                setError(err.message);
                console.log(err);
            }finally{
                setLoading(false)
            }

        }
        fetchCoin()

        console.log(id)
    },[id])

    return ( 
        <div className='coin-details-container'>
            <Link to='/'>Back to home</Link>
            <h1 className="coint-details-title">
                {coin ? `${coin.name} (${coin.symbol.toUpperCase()}) ` : 'Coin details'}
                {loading && <Spinner color='white'/>}
                {error && <div className="error">{error}</div>}
            </h1>
            {!loading && !error && (
                <>
                    <img src={coin.image.large} alt={coin.name} className="coin-details-image"/>
                <p>
                    {coin.description.en.split('. ')[0] + '.'}
                </p>
                <div className="coin-details-info">
                    <h3>Rank: {coin.market_cap_rank}</h3>
                    <h3>Current price: €{coin.market_data.current_price.eur.toLocaleString()}</h3>
                    <h4>Market cap: €{coin.market_data.market_cap.eur.toLocaleString()} </h4>
                    <h4>24h High: €{coin.market_data.high_24h.eur.toLocaleString()} </h4>
                    <h4>24h Low: €{coin.market_data.low_24h.eur.toLocaleString()} </h4>
                    <h4>24h price change: €{coin.market_data.price_change_24h.toFixed(2)}{' '}({coin.market_data.price_change_percentage_24h.toFixed(2)}{'%'}) </h4>
                    <h4>ATH: €{coin.market_data.ath.eur.toLocaleString()} on {''} {new Date(coin.market_data.ath_date.eur).toLocaleDateString()} </h4>
                    <h4>ATL: €{coin.market_data.atl.eur.toLocaleString()} on {''} {new Date(coin.market_data.atl_date.eur).toLocaleDateString()} </h4>
                    <h4>Last updated: {new Date(coin.last_updated).toLocaleDateString()} {new Date(coin.last_updated).toLocaleTimeString()} </h4>
                </div>
                <CoinChart coinId={id}/>
                <div className="coin-details-links">
                    <Link to={coin.links.homepage[0]}>
                        Link for more
                    </Link>
                    {coin.categories.length > 0 && (
                        <p>Categories: {coin.categories.join(', ')}</p>
                    )}
                </div>
                {!loading && !error && !coin && <p>No data for coin found</p>}
                </>
                
            )}
        </div>
     );
}
 
export default CoinDetailsPage;