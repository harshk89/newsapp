import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  document.title = `${capitalizeFirstLetter(props.category)} - NewsApp`;
  
  const updateNews = async()=> {
    props.setProgress(20);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=311916cd37ea490e9dd529471866896c&page=${page}&pageSize=${props.pageSize}`;
    const data = await fetch(url);
    props.setProgress(40);
    const parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
  }, [])
  

  const fetchData = async()=> {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=311916cd37ea490e9dd529471866896c&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    const data = await fetch(url);
    const parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  }

  return (
    <>
      {/* {console.log(articles.length)} */}
      {/* {console.log(totalResults)} */}
      <h2 style={{margin: "80px auto 20px auto", textAlign: "center"}}>Newsapp - Top headlines</h2>
      <InfiniteScroll
        dataLength={articles.length} //This is important field to render the next data
        next={fetchData}
        hasMore={articles.length < totalResults}
        loader={<Spinner/>}>
      <div className="container">
      <div className="row">
          {articles.map((element)=>{
            return(
              <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author}/>
              </div>
              )
            })} 
      </div>
      </div>
      </InfiniteScroll>
      {/* {console.log(articles.length)} */}
    </>
  );
}

News.defaultProps = {
  pageSize: 6,
  country: "in",
  category: "general"
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News;
