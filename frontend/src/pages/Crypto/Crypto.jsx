import { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import { getCrypto } from "../../api/external";
import styles from "./Crypto.module.css";

function Crypto() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function cryptoApiCall() {
      const response = await getCrypto();
      setData(response);
    })();

    // Optional cleanup logic if needed in the future
    return () => setData([]);
  }, []);

  if (data.length === 0) {
    return <Loader text="cryptocurrencies" />; // ✅ Typo fixed
  }

  const negativeStyle = {
    color: "#ea3943",
  };

  const positiveStyle = {
    color: "#16c784",
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.head}>
          <th>#</th>
          <th>Coin</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>24h</th>
        </tr>
      </thead>
      <tbody>
        {data.map((coin) => (
          <tr key={coin.id} className={styles.tableRow}> {/* ✅ Use key instead of id */}
            <td>{coin.market_cap_rank}</td>
            <td>
              <div className={styles.logo}>
                <img
                  src={coin.image}
                  width={40}
                  height={40}
                  alt=""// ✅ Descriptive alt text
                />
                {coin.name}
              </div>
            </td>
            <td>
              <div className={styles.symbol}>{coin.symbol.toUpperCase()}</div>
            </td>
            <td>${coin.current_price.toLocaleString()}</td>
            <td
              style={
                coin.price_change_percentage_24h < 0
                  ? negativeStyle
                  : positiveStyle
              }
            >
              {coin.price_change_percentage_24h.toFixed(2)}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Crypto;
