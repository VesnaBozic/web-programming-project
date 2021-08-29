export default{
    props:["newDirector","created"],
    emits: ["save", "goBack"],
   
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
           
        </div>
    </div>
</nav>

<div class="profile">
    <form class="mt-3">
        <div class="card p-3 text-center">
            <div class="d-flex flex-row justify-content-center mb-3">
    
            </div>
        <h4>Add new director</h4>
        <div class="row">
            <div class="col-md-6">
                <div class="inputs"> <label>Name</label> <input class="form-control" type="text" v-model="newDirector.name" required > </div>
            </div>
            <div class="col-md-6">
            <div class="inputs"> <label>Surname</label> <input class="form-control" type="text" v-model="newDirector.surname" required > </div>
        </div>
            <div class="col-md-6">
                <div class="inputs"> <label>Image link</label> <input class="form-control" type="text" v-model="newDirector.image_src" required > </div>
            </div>
        </div>
        <div v-if="created === true" class="col-md-6" class="alert-success" id="profile-alert" role="alert">
             You successfully added director!
        </div>
  
        <div class="mt-3 gap-2 d-flex"> <button class="px-3 btn btn-sm btn-outline-primary"  v-on:click="$emit('goBack', 'false')">Go back</button> 
        <button class="px-3 btn btn-sm btn-primary" v-on:click.prevent="$emit('save', {...newDirector})">Save</button> 
       
        
        </div>
    </form>
</div>



    `
}