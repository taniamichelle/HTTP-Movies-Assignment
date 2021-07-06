import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateMovie = (props) => {
    const [movie, setMovie] = useState(null);
    // removed initial value from useState- id: '',title: '',director: '',metascore: '',stars: []

    // same as fetchMovie in Movie file
    const fetchMovie = id => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setMovie(res.data))
            .catch(err => console.log(err.response))
    };

    // rather than componentDidMount
    useEffect(() => {
        fetchMovie(props.match.params.id);
        // have it run whenever props.match.params.id changes
    }, [props.match.params.id]);

    const handleChange = event => setMovie({ ...movie, [event.target.name]: event.target.value });

    // a change handler that takes an index so we know which star to update
    const handleStar = index => event => {
        setMovie({
            ...movie, stars: movie.stars.map((star, starIndex) => {
                return starIndex === index ? event.target.value : star;
            })
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        /* you can do your put request straight from here, getting the id from {movie.id} or props.match.params.id 
        (to get id out of our url) and send your `movie` as data since you are rendering the 
        UpdateMovie component from props you cannot pass the function as props */
        axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
            .then(res => {
                console.log(res);
                // receiving history from props from the Route and pushing to Home
                props.history.push('/');
            })
            .catch(err => console.log(err.response));
    };

    const addStar = event => {
        event.preventDefault();
        setMovie({ ...movie, stars: [...movie.stars, ""] });
    };

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* <input
                type='text'
                name='id'
                placeholder='id'
                value={movie.id}
                onChange={handleChange}
            /> */}
            <input
                type='text'
                name='title'
                placeholder='title'
                value={movie.title}
                onChange={handleChange}
            />
            <input
                type='text'
                name='director'
                placeholder='director'
                value={movie.director}
                onChange={handleChange}
            />
            <input
                type='text'
                name='metascore'
                placeholder='metascore'
                value={movie.metascore}
                onChange={handleChange}
            />
            {movie.stars.map((starName, index) => {
                return <input
                    type='text'
                    placeholder='star'
                    // use the index of map to set our value
                    value={starName}
                    key={index}
                    // produces a fxn that can handle the event
                    onChange={handleStar(index)} />;
            })}
            <button onClick={addStar}>Add Star</button>
            <button type='submit'>Update Movie</button>
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

        //alternative syntax to above:
    // const handleStar = index => {
    //     return e => {
    //         setUpdateMovie({...movieUpdate, stars: movieUpdate.stars.map((star, starIndex) => {
    //             return starIndex === index ? e.target.value : star;
    //         })});
    //     };
    // };


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
                     //alternative syntax to go with alternate handleStar fxn syntax above:
                // onChange={(event) => handleStar(index, event)} />
            })}
            <button onClick={addStar}>Add Star</button>
            <button type='submit'>Submit</button>
        </form>
    );
};

export default UpdateForm;
*/