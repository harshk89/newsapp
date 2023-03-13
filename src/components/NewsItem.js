import React from "react";
import { useState } from "react";

const NewsItem = (props)=> {

  let {title, description, imageUrl, newsUrl, date, author} = props; 
 
  const [badge, setBadge] = useState("inline-block");

  // const displayBadge = ()=> {
  //   if((new Date().getTime() - new Date(props.date).getTime())/86400000 > 1) {
  //     setBadge("none");
  //   }
  // }

  return (
    <div>
      {/* {displayBadge()} */}
      <a href={newsUrl} target="_blank" rel="noreferrer" style={{textDecoration: "none", color: "inherit"}}>
      <div className="card my-3">
        <img src={imageUrl==null?"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg":imageUrl} className="card-img-top" alt="..." style={{height: "10rem"}}/>
        <div className="card-body">
        <span style={{display: `${(Math.floor((new Date().getTime() - new Date(props.date).getTime())/86400000) > 1)?"none":"inline-block"}`}} className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" id="cardBadge">New</span>
        {/* {console.log(Math.floor((new Date().getTime() - new Date(props.date).getTime())/86400000))} */}
          <h5 className="card-title" style={{fontSize: "1.1em"}}>{title}</h5>
          <p className="card-text" style={{fontSize: "0.95em"}}>{description}</p>
          <p className="card-text"><small className="text-muted" id="newsDate">{new Date(date).toDateString()}</small></p>
          {/* <a href={this.props.newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
            More Details
          </a> */}
        </div>
      </div>
      </a>
    </div>
  );
}

export default NewsItem;
