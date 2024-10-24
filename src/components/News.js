import React, { Component } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)}-News`;
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;  // Use environment variable for API key
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f6a49194f15f4400856971e8c71ffec1&page=${this.state.page}&pageSize=6`;
    this.setState({ loading: true });
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      let parsedData = await response.json();
      console.log('Parsed Data:', parsedData);  // Log the parsed data
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
      });
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      this.setState({ loading: false });
    }
  }

  handlePrevClick = async () => {
    console.log("Previous");
    this.setState(
      (state) => ({ page: state.page - 1, loading: true }),
      this.fetchData
    );
  }

  handleNextClick = async () => {
    console.log("Next");
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / 6)) {
      this.setState(
        (state) => ({ page: state.page + 1, loading: true }),
        this.fetchData
      );
    }
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{ margin: '35px 0px',marginTop: '90px' }}>News-Top Headlines {this.capitalizeFirstLetter(this.props.category)}</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItems 
                  title={element.title ? element.title.slice(0, 45) : ""} 
                  description={element.description ? element.description.slice(0, 88) : ""} 
                  imageurl={element.urlToImage} 
                  newsUrl={element.url}
                  author={element.author} 
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 6)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;






