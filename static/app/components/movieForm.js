export default{
    props: ["movie", "tekst"],
    emits: ["sacuvaj"],
    data() {
        return {
            newMovie: this.movie ? {...this.movie} : {}
        }
    },
    watch: {
        movie: function(newValue, oldValue) {
            this.newMovie = {...this.movie};
        }
    },
    template: `
    <form v-on:submit.prevent="$emit('sacuvaj', {...newMovie})">
        <div>
            <label>Poster link: <input type="text" v-model="newMovie.poster_src" required></label>
        </div>
        <div>
            <label>Name: <input type="text" v-model="newMovie.name" required></label>
        </div>
        <div>
            <label>Genre: <input type="text" v-model="newMovie.genre" required></label>
        </div>
        <div>
        <label>Year: <input type="number" v-model="newMovie.year" required></label>
        </div>
        <div>
        <label>Price: <input type="number" v-model="newMovie.price" required  min="0" max="10" step="0.25" value="0.00"></label>
        </div>  
        <div>
        <label>Description: <input type="textarea" v-model="newMovie.decription" required></label>
        </div> 
        <div>
        <label>Director id: <input type="number" v-model="newMovie.directors_id" required></label>
        </div> 
   
        <div>
            <input type="submit" v-bind:value="tekst">
        </div>
    </form>
    `
}