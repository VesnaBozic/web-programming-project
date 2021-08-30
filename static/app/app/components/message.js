export default {
    props: ["messageType"],
 
    data() {
        return {}
    },

    template: ` 

<nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
  <div class="container-fluid">
    <router-link  class="navbar-brand" class="nav-link active" to="/">Home</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link to="/directors"class="nav-link active" aria-current="page" >Directors</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login">Log in</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" v-on:click="$emit('goBack', 'false')" to="/createAccount">Create account</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
   
<div class="form">
  <div v-if="messageType == 'accountCreated'" class="alert alert-info" role="alert">
        <p><i class="far fa-thumbs-up"></i> </p>
        Account created! You can log in!
    <router-link class="nav-link" to="/login">Login</router-link>
  </div>

  <div v-if="messageType ==  'failed'" class="alert alert-warning" role="alert">
  <p> <i class="fas fa-exclamation-triangle"></i> </p>
        That username already exist! Try again!
    <router-link class="nav-link" to="/createAccount" v-on:click="$emit('goBack', 'false')">Create account</router-link>
  </div>

  <div v-if="messageType ==  'failedLogin'" class="alert alert-warning" role="alert">
 <p> <i class="fas fa-exclamation-triangle"></i> </p>
 Wrong password or username! Try again!
    <router-link class="nav-link" to="/login" v-on:click="$emit('goBack', 'false')">Sign in</router-link>
  </div>

  <div v-if="messageType ==  'accountDeleted'" class="alert alert-warning" role="alert">
        <p><i class="fas fa-user-slash"></i></p>
        Sorry to see you leave! Your account is deleted! 
    <router-link class="nav-link" to="/createAccount" v-on:click="$emit('goBack', 'false')">Create new account</router-link>
  </div>

</div>
<page-footer></page-footer>
`}