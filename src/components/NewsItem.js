import React, { Component } from "react";
import PropTypes from 'prop-types'

export class NewsItem extends Component {
  static defaultProps = {
    title: null,
    description: null,
    imageUrl: null,
    newsUrl: null,
    date: null,
    author: null
  }
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    newsUrl: PropTypes.string,
    date: PropTypes.string,
    author: PropTypes.string
  }
  
  displayBadge= "inline-block";

  setBadge = ()=> {
    if((new Date().getTime() - new Date(this.props.date).getTime())/86400000 > 1) {
      this.displayBadge = "none";
    }
  }

  render() {
    return (
      <div>
        {this.setBadge()}
        <div className="card my-3">
          <img src={this.props.imageUrl==null?"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg":this.props.imageUrl} className="card-img-top" alt="..." style={{height: "10rem"}}/>
          <div className="card-body" style={{height: "16rem", overflow: "auto"}}>
          <span style={{display: this.displayBadge}} className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" id="cardBadge">New</span>
            <h5 className="card-title" style={{fontSize: "1.1em"}}>{this.props.title}</h5>
            <p className="card-text" style={{fontSize: "0.95em"}}>{this.props.description}</p>
            <p className="card-text"><small className="text-muted" id="newsDate">{new Date(this.props.date).toDateString()}</small></p>
            <a href={this.props.newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
              More Details
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
