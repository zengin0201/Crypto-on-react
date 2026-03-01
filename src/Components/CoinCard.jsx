const CoinCard = ({ coin, isFav, onFavClick }) => {
  return (
    <div className="coin-card">
      <img src={coin.image} alt={coin.name} />
      
      <div className="coin-info">
        <div className="coin-name">{coin.name}</div>
        <div className="coin-symbol">{coin.symbol}</div>
      </div>

      <div className="coin-stats">
        <div className="coin-price">
          ${coin.current_price.toLocaleString()}
        </div>
        <div className={`coin-percent ${coin.price_change_percentage_24h > 0 ? "up" : "down"}`}>
          {coin.price_change_percentage_24h > 0 ? "+" : ""}{coin.price_change_percentage_24h.toFixed(2)}%
        </div>
      </div>

      <button 
        className={`fav-btn ${isFav ? 'active' : ''}`} 
        onClick={() => onFavClick(coin.id)}
      >
        {isFav ? '★' : '☆'}
      </button>
    </div>
  );
};
export default CoinCard;
