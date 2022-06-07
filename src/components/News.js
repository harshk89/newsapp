import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  articles= []

  static defaultProps = {
    pageSize: 6,
    country: "in",
    category: "general"

  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    console.log("constructor of news component is called");
    this.state = {
        articles: this.articles,
        loading: false,
        page: 1,
        totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsApp`
  }
    
  async componentDidMount() {
    console.log("componentDidMount");
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=311916cd37ea490e9dd529471866896c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults});
  }

  fetchData = async()=> {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=311916cd37ea490e9dd529471866896c&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({page: this.state.page + 1});
    // this.setState({loading: true});
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({articles: this.state.articles.concat(parsedData.articles),
       totalResults: parsedData.totalResults});
  }

  render() {
    return (
      <>
        <h2>Newsapp - Top headlines</h2>
        <InfiniteScroll
          dataLength={this.state.articles.length} //This is important field to render the next data
          next={this.fetchData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}>
        <div className="container">
        <div className="row">
            {this.state.articles.map((element)=>{
              return(
                <div className="col-md-4">
                        <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author}/>
                    </div>
                )
              })} 
        </div>
        </div>
        </InfiniteScroll>
        {/* {console.log(this.state.articles.length)} */}
      </>
    );
  }
}

export default News;
