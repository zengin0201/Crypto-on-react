const CoinCard = ({ coin, isFav, onFavClick }) => {
  return (
    <div className="coin-card">
      <img src={coin.image} alt={coin.name} />
      <div className="coin-info">
        <h3>{coin.name}</h3>
        <span className="coin-symbol">{coin.symbol}</span>
        <button
          onClick={() => onFavClick(coin.id)}
          className={`fav-btn ${isFav ? "active" : ""}`}
        >
          {isFav ? "★" : "☆"}
        </button>
      </div>
      <div className="coin-data">
        <p className="coin-price">${coin.current_price.toLocaleString()}</p>
        <p
          className={`coin-percent ${coin.price_change_percentage_24h > 0 ? "price-up" : "price-down"}`}
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default CoinCard;
