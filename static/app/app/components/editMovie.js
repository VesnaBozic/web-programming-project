export default{
    props:["movie","director","directors","updated","removed", "removeFail"],
    emits: ["goBack", "save","remove"],
   
    data() {
        return {
         
        }
    },
    template: `
<div>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
    <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <router-link class="nav-link" to="/myProfile">My profile  <i class="fas fa-user"></i></router-link>
            </li>
            </ul>
            
        </div>
    </div>
</nav>

<div class="profile">
<form class="mt-3">
<div class="card p-3 text-center">
    <div class="d-flex flex-row justify-content-center mb-3">

    </div>
    <h4>Edit movie <i class="fas fa-film"></i></h4>
    <div class="row">
        <div class="col-md-6">
            <div class="inputs"> <label>Name</label> <input class="form-control" type="text" v-model="movie.name" required> </div>
        </div>
        <div class="col-md-6">
            <div class="inputs"> <label>Image link</label> <input class="form-control" type="text" v-model="movie.poster_src" required > </div>
        </div>
        <div class="col-md-6">
            <div class="inputs"> <label>Genre</label> <input class="form-control" type="text" v-model="movie.genre" required > </div>
        </div>
        <div class="col-md-6">
            <div class="inputs"> <label>Year</label> <input class="form-control" type="number" min="1901" max="2099" step="1" value="2021"  v-model="movie.year" required > </div>
        </div>
        <div class="col-md-6">
            <div class="inputs"> <label>Price</label> <input class="form-control" type="number" step="0.01" v-model="movie.price" required > </div>
        </div>
        <div class="col-md-6">
            <div class="inputs"> <label>Director </label> 
                <select class="form-select" class="ta" aria-label=".form-select-lg example" class="form-control" v-model="movie.directors_id" required>
                    <option  v-for="director in directors" v-bind:value="director.id">{{director.name}}  {{director.surname}}</option>
                </select>
        </div>
        </div>
        <div class="col-md-6">
            <div class="inputs"> <label>Description</label> <textarea class="ta" class="form-control" v-model="movie.decription" required></textarea> </div>
        </div>
        <div v-if="updated === true" class="col-md-6" class="alert-success" id="profile-alert" role="alert">
        You successfully updated movie!
   </div>
   <div v-if="removed === true" class="col-md-6" class="alert-success" id="profile-alert" role="alert">
       You successfully removed movie!
   </div>
   <div v-if="removeFail === true" class="col-md-6" class="alert-success" id="profile-alert" role="alert">
       You cannot delete this movie!
   </div>

    <div class="mt-3 gap-2 d-flex">
     <button class="px-3 btn btn-sm btn-outline-primary"  v-on:click="$emit('goBack', 'false')">Go back</button> 
    <button class="px-3 btn btn-sm btn-primary" v-on:click.prevent="$emit('save', {...movie})">Save</button> 
    <button class="px-3 btn btn-sm btn-primary" v-on:click.prevent="$emit('remove', movie.id)">Delete</button> 
</div>
</div>
</form>
</div>



    `
}