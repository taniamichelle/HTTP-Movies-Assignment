import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateMovie = (props) => {
    const [updateMovie, setUpdateMovie] = useState({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    });

    const fetchMovie = id => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setUpdateMovie(res.data))
            .catch(err => console.log(err.response))
    };

    useEffect(() => {
        fetchMovie(props.match.params.id);
    }, [props.match.params.id]);

    const handleChange = event => setUpdateMovie({ ...updateMovie, [event.target.name]: event.target.value });

    const handleSubmit = event => {
        event.preventDefault();
        // you can do your put request straight from here, getting the id from props.match.params.id and send your `updateMovie` as data 
        //since you are rendering the UpdateMovie component from props you cannot pass the function as props
        axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, updateMovie)
            .then(res => {
                console.log(res);
                // receiving history from props from the Route and pushing to Home
                props.history.push('/')
            })
            .catch(err => console.log(err.response));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='id'
                placeholder='id'
                value={updateMovie.id}
                onChange={handleChange}
            />
            <input
                type='text'
                name='title'
                placeholder='title'
                value={updateMovie.title}
                onChange={handleChange}
            />
            <input
                type='text'
                name='director'
                placeholder='director'
                value={updateMovie.director}
                onChange={handleChange}
            />
            <input
                type='text'
                name='metascore'
                placeholder='metascore'
                value={updateMovie.metascore}
                onChange={handleChange}
            />
            <input
                type='text'
                name='stars'
                placeholder='stars'
                value={updateMovie.stars}
                onChange={handleChange}
            />
            <button type='submit'>Submit</button>
        </form>
    );
};

export default UpdateMovie;

/*
HENRY'S:

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateForm = (props) => {
    //console.log(props);
    const [movie, setMovie] = useState(null);

    const fetchMovie = id => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setMovie(res.data))
            .catch(err => console.log(err.response))
    };

    useEffect(() => {
        fetchMovie(props.match.params.id);
    }, [props.match.params.id]);

    const handleChange = e => setMovie({ ...movie, [e.target.name]: e.target.value });

    // handleStar is a function that takes in an index and produces a new function that takes in e.
    //the fxn taking e updates
    const handleStar = index => e => {
        setMovie({...movie, stars: movie.stars.map((star, starIndex) => {
            return starIndex === index ? e.target.value : star;
        })});
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                console.log(res)
                props.history.push('/')
            })
            .catch(err => console.log(err.response));
    };

    const addStar = event => {
        event.preventDefault();
        setMovie({...movie, stars: [...movie.stars, '']});
    };

    if(!movie) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='title'
                placeholder='title'
                value={updateMovie.title}
                onChange={handleChange}
            />
            <input
                type='text'
                name='director'
                placeholder='director'
                value={updateMovie.director}
                onChange={handleChange}
            />
            <input
                type='text'
                name='metascore'
                placeholder='metascore'
                value={updateMovie.metascore}
                onChange={handleChange}
            />
            {movie.stars.map((starName, index) => {
                return <input
                    type='text'
                    name='stars'
                    placeholder='stars'
                    value={starName}
                    key={index}
                    onChange={handleStar(index)}/>;
            })}
            <button onClick={addStar}>Add Star</button>
            <button type='submit'>Submit</button>
        </form>
    );
};

export default UpdateForm;
*/