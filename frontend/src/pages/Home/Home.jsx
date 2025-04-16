import { useState, useEffect } from "react";
import { getNews } from "../../api/external";
import styles from "./Home.module.css";
import Loader from "../../components/Loader/Loader";

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let isMounted = true;

    (async function newsApiCall() {
      const response = await getNews();
      if (isMounted) {
        setArticles(response);
      }
    })();

    // proper cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCardClick = (url) => {
    window.open(url, "_blank");
  };

  if (articles.length === 0) {
    return <Loader text="homepage" />;
  }

  return (
    <>
      <div className={styles.header}>Latest Articles</div>
      <div className={styles.grid}>
        {articles.map((article) => (
          <div
            className={styles.card}
            key={article.url}
            onClick={() => handleCardClick(article.url)}
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title || "article image"}
              />
            )}
            <h3>{article.title}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
