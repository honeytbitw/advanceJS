function submitQ1() {
    fetchApi()
}

function fetchApi() {
    fetch('https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json')
        .then(res => res.json())
        .then(data => {
            
            let req_obj={
                actors:getActors(data),
                genres:getGenres(data)
            }
            console.log(req_obj)
        })
}

function getActors(data) {
    //find unique actors from cast list
    let all_actors = []
    data.map(movie => {
        for (let i = 0; i < movie.cast.length; i++) {
            pattern = /^[a-zA-Z]{2,15}\s[a-zA-Z]{2,15}(?:\s[a-zA-Z]{2,15})?$/
            if (movie.cast[i].match(pattern) !== null) {
                all_actors.push(movie.cast[i])
            }
        }
    })
    let unique_actors = Array.from(new Set(all_actors))

    //find movies where cast list contains actor
    let freq_map = {}
    for (let actor in unique_actors) {
        freq_map[unique_actors[actor]] = []
    }

    data.map(movie => {
        movie.cast.map(actor => {
            let movie_arr = freq_map[actor]
            if (typeof movie_arr !== 'undefined') {
                movie_arr.push(movie.title)
                freq_map[actor] = movie_arr
            }

        })
    })

    let req_data = []
    for (const [key, value] of Object.entries(freq_map)) {
        req_data.push({
            "Name": key,
            "Movies": value
        })
    }
    return req_data
}

function getGenres(data) {
    //find unique genres from genre list
    let all_genres = []
    data.map(movie => {
        for (let i = 0; i < movie.genres.length; i++) {
            pattern = /^[A-Za-z]+$/
            if (movie.genres[i].match(pattern) !== null) {
                all_genres.push(movie.genres[i])
            }
        }
    })
    let unique_genres = Array.from(new Set(all_genres))

    //find movies where genre list contains genre
    let freq_map = {}
    for (let genre in unique_genres) {
        freq_map[unique_genres[genre]] = []
    }
    data.map(movie => {
        movie.genres.map(genre => {
            let movie_arr = freq_map[genre]
            if (typeof movie_arr !== 'undefined') {
                movie_arr.push(movie.title)
                freq_map[genre] = movie_arr
            }

        })
    })

    let req_data = []
    for (const [key, value] of Object.entries(freq_map)) {
        req_data.push({
            "Type": key,
            "Movies": value
        })
    }
    return req_data
}