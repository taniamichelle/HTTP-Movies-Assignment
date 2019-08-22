import React, { useState } from 'react';
import axios from 'axios';

const UpdateMovie = (props) => {
    const [updateMovie, setUpdateMovie] = useState({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    });

    const handleChange = event => setUpdateMovie({ ...updateMovie, [event.target.name]: event.target.value });

    const handleSubmit = event => {
        event.preventDefault();
        // you can do your put request straight from here, getting the id from props.match.params.id and send your `updateMovie` as data 
        //since you are rendering the UpdateMovie component from props you cannot pass the function as props
        axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, updateMovie)
            .then(res => {
                // you are recieving history from props from the Route and pushing to Home
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
