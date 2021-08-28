export default{
    props:["director", "updated","removed", "removeFail"],
    emits: ["save", "goBack","remove"],
   
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
                <router-link class="nav-link" to="/profile">Home</router-link>
            </li>
            </ul>
            <button v-on:click.prevent="logOut()" class="btn btn-outline-success" type="submit">Log out</button>
        </div>
    </div>
</nav>

<div class="profile">
    <form class="mt-3">
        <div class="card p-3 text-center">
            <div class="d-flex flex-row justify-content-center mb-3">
    
            </div>
        <h4>Edit director</h4>
        <div class="row">
            <div class="col-md-6">
                <div class="inputs"> <label>Name</label> <input class="form-control" type="text" v-model="director.name" > </div>
            </div>
            <div class="col-md-6">
            <div class="inputs"> <label>Surname</label> <input class="form-control" type="text" v-model="director.surname"  > </div>
        </div>
            <div class="col-md-6">
                <div class="inputs"> <label>Image link</label> <input class="form-control" type="text" v-model="director.image_src"  > </div>
            </div>
        </div>
        <div v-if="updated === true" class="col-md-6" class="alert-success" id="profile-alert" role="alert">
             You successfully updated director!
        </div>
        <div v-if="removed === true" class="col-md-6" class="alert-success" id="profile-alert" role="alert">
            You successfully removed director!
        </div>
        <div v-if="removeFail === true" class="col-md-6" class="alert-success" id="profile-alert" role="alert">
            You cannot delete this director, first you must delete his movies!
        </div>
        <div class="mt-3 gap-2 d-flex"> <button class="px-3 btn btn-sm btn-outline-primary"  v-on:click="$emit('goBack', 'false')">Go back</button> 
        <button class="px-3 btn btn-sm btn-primary" v-on:click.prevent="$emit('save', {...director})">Save</button> 
        <button class="px-3 btn btn-sm btn-primary" v-on:click.prevent="$emit('remove', director.id)">Delete</button> 
        
        </div>
    </form>
</div>



    `
}