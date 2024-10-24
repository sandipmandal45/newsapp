import React, { Component } from 'react';

export class NewsItems extends Component {
  render() {
    let { title, description, imageurl, newsUrl, author, date, source } = this.props;
    return (
      <div className='my-3'>
        <div className="card">
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
          <span className="badge rounded-pill bg-danger">
            {source}
          </span>
          </div>
          <img 
            src={!imageurl ? "https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/381600/381660.6.jpg" : imageurl} 
            className="card-img-top" 
            alt="News" 
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target='_blank' rel='noopener noreferrer' className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItems;

