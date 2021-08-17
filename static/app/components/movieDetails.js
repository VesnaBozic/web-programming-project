export default {
    props: ["selectedMovie", "isMovieSelected"],
    emits: ["goBack"],
    data() {
        return {

        
            
        }


    },

template: ` 
    <div >
    <button v-on:click="$emit('goBack', 'false')" id="btn" >GO BACK</button>
    </div>
    <div class="box">
        <img id="movie-image" v-bind:src="selectedMovie.poster_src" alt="" class="box-img">
        <h1 id="movie-name">{{selectedMovie.name}}</h1>
        <h5 id="movie-genre">{{selectedMovie.genre}}</h5>
        <h5 id="movie-year">2009</h5>
       
        <p id="movie-description">{{selectedMovie.decription}}</p>
    </div>
    `


}