import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

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
        totalResults: 38
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsApp`
  }

  async updateNews() {
    console.log("updateNews");
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=311916cd37ea490e9dd529471866896c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      const data = await fetch(url);
      const parsedData = await data.json();
      this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false});
  }
    
  async componentDidMount() {
    console.log("componentDidMount");
    this.updateNews();
  }

  handleNextClick = async()=> {
    console.log("next");
    await this.setState({page: this.state.page + 1});
    this.updateNews();
    window.scrollTo(0, 0);
  }
  
  handlePreviousClick = async()=> {
    console.log("previous");
    await this.setState({page: this.state.page - 1});
    this.updateNews();
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="container my-3">
        <h2>Newsapp - Top headlines</h2>
        <div className="row">
            {this.state.articles.map((element)=>{
              return(
                <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author}/>
                    </div>
                )
              })}
        </div>
        {this.state.loading?<Spinner/>:<div style={{height: '74px'}}></div>}
        <div className="container d-flex justify-content-center">
        <button type="button" disabled={this.state.page<=1} className="btn btn-primary" onClick={this.handlePreviousClick} style={{marginRight: "6px", width: "7rem "}}>&#8592; Previous</button>
        <button type="button" disabled={this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-primary" onClick={this.handleNextClick} style={{marginLeft: "6px", width: "7rem "}}>Next &#8594;</button>
        </div>
      </div>
    );
  }
}

export default News;
