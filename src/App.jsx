import { useState } from "react";
import { useEffect } from "react";
import CoinCard from "./Components/CoinCard";

function App() {
  const [coins, setCoin] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState("desc");
  const [sort, sortType] = useState("price");
  const [favorites, setFavorites] = useState(() => {
  const saved = localStorage.getItem("favorites");
  return saved ? JSON.parse(saved) : [];
  });
  const [showOnlyFavs, setShowOnlyFavs] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1",
    )
      .then((res) => res.json())
      .then((data) => {
        setCoin(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка:", err);
        setLoading(false);
      });
  }, []);

  const filteredCoins = coins.filter((coin) => {
    const matchesSearch =
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    if (showOnlyFavs) {
      return matchesSearch && favorites.includes(coin.id);
    }

    return matchesSearch;
  });

  let sortedCoins = [...filteredCoins].sort((a, b) => {
    if (sort === "price") {
      return b.current_price - a.current_price;
    }
    if (sort === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sort === "precent") {
      return b.price_change_percentage_24h - a.price_change_percentage_24h;
    }

    return 0;
  });
  if (direction === "asc") {
    sortedCoins.reverse();
  }

  const toggleFavorite = (id) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };
  return (
    <div className="app-wrapper">
      
      <header className="header" style={{display:"flex",justifyContent:"center",marginTop:"15px"}}>
        <div className="header-content">
          <div style={{ display: 'flex', alignItems: 'center', }}>
            <div className="logo-box" style={{ background: 'var(--accent)', padding: '8px', borderRadius: '10px' }}>
              <span style={{ color: '#000', fontWeight: 'bold' }}>T</span>
            </div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>CryptoFlow</h1>
          </div>
          <div className="market-status">
            <div className="pulse"></div>
            Live Market
          </div>
        </div>
      </header>

      <div className="app-container">
        <div className="controls-panel">
          <input
            type="text"
            placeholder="Search assets..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="sort-container" style={{ marginTop: '20px' }}>
            <span className="sort-label">Sort by:</span>
            <div className="sort-buttons">
              {['price', 'name', 'precent'].map(type => (
                <button
                  key={type}
                  className={sort === type ? "sort-btn active" : "sort-btn"}
                  onClick={() => sortType(type)}
                >
                  {type === 'price' ? 'Price' : type === 'name' ? 'Name' : 'Change %'}
                </button>
              ))}
              <button
                className={showOnlyFavs ? "sort-btn active" : "sort-btn"}
                onClick={() => setShowOnlyFavs(!showOnlyFavs)}
                style={{ marginLeft: 'auto' }}
              >
                {showOnlyFavs ? "★ Favorites" : "All Assets"}
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loader-container" style={{ textAlign: 'center', padding: '100px' }}>
             <div className="pulse" style={{ width: '40px', height: '40px', margin: '0 auto' }}></div>
             <p style={{ marginTop: '20px', color: 'var(--text-dim)' }}>Syncing with Blockchain...</p>
          </div>
        ) : (
          <div className="coin-list">
            {sortedCoins.map((coin) => (
              <CoinCard
                key={coin.id}
                coin={coin}
                onFavClick={toggleFavorite}
                isFav={favorites.includes(coin.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
