export default{
    emits: ["save"],
   
    data() {
        return {
          newUser: []
        }
    },
    template: `

    <nav  class="navbar navbar-expand-lg navbar-dark bg-dark" >
      <div class="container-fluid">
        <router-link  class="navbar-brand" class="nav-link active" to="/movies">Movies</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
          <router-link  class="navbar-brand" class="nav-link active" to="/login">Sign in</router-link>
          </li>
            </ul>
        </div>
       </div>
     </div>
    </nav>

<div class="form">
  <div class="loginbox">

    <h1>Create new account</h1>
    <form v-on:submit.prevent="$emit('save', {...newUser})">
        <p>Name</p>
          <input id="user-name" type="text" name="" placeholder="Enter your name" v-model="newUser.name" required>
        <p>Surname</p>
          <input  type="text" name="" placeholder="Enter your surname" v-model="newUser.surname" required>
        <p>Username</p>
          <input id="user-username" type="text" name="" placeholder="Enter Username" v-model="newUser.username" required>
        <p>Password</p>
          <input id="user-password" type="password" name="" placeholder="Enter Password" v-model="newUser.lozinka" required>
          <input type="submit" name="" id="form-button" value="Create new account">
          <router-link to="/login"><a>Already have an account? Go and login!</a></router-link>
    </form>
  </div>
</div>

<footer id="main-footer">
    <p>Your MOVIES &copy; 2021, All Rights reserved</p>    
</footer>


    `
}