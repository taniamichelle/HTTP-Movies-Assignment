import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Link } from 'react-router-dom';

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = id => {
    axios.delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
      .then(res => {
        console.log(res);
        this.props.history.push('/');
      })
      .catch(err => console.log(err.response));
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className='btn-container'>
        <div className="save-wrapper">
          <MovieCard movie={this.state.movie} />
          <div className="save-button" onClick={this.saveMovie}>
            Save
          </div>
        </div>
        <div className='edit-wrapper'>
          {/* 'Link' is like a button and 'to' sends you to a different url: update-movie/(id from url)*/}
          <Link to='/update-movie/:id'>Update</Link>
          {/* <button className='edit-btn' onClick={() => this.props.history.push(`/update-movie:id`)}>Edit</button> */}
        </div>
        <div className='delete-wrapper'>
          <button className='delete-btn' onClick={this.deleteMovie}>Delete</button>
        </div>
      </div>
    );
  }
}

/*
Henry:

import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import UpdateMovie from './UpdateMovie';
import { Link } from 'react-router-dom';

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = event => {
    event.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
      .then(res => {
        console.log(res);
        this.props.history.push('/');
      })
      .catch(err => console.log(err.response));
  };
  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className='btn-container'>
        <div className="save-wrapper">
          <MovieCard movie={this.state.movie} />
          <div className="save-button" onClick={this.saveMovie}>
            Save
          </div>
        </div>
        <div className='edit-wrapper'>
          <Link to={`/update-movie/${this.state.movie.id}`>Update</Link>
        </div >
  <div className='delete-wrapper'>
    <button className='delete-btn' onClick={this.deleteMovie}>Delete</button>
  </div>
      </div >
    );
  }
}
*/