export default{
    props: ["loggedUser","movie", "notEnoughMoney", "enoughMoney"],
    emits: ["clickedBtn", "createOrder"],
    
    data() {
        return {}
            
    },
    template: `
    
<nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
    <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <router-link class="nav-link" to="/myProfile">{{loggedUser.name}} <i class="fas fa-user"></router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/myOrders">My orders <i class="fas fa-shopping-cart"></i></router-link>
            </li>
         </ul>
        </div>
    </div>
</nav>

<div class="container-cart padding-bottom-3x mb-1">
    
    <div class="table-responsive shopping-cart">
        <table class="table">
            <thead>
                <tr>
                    <th>Movie</th>
                    <th class="text-center">Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div class="product-item">
                            <a class="product-thumb"><img v-bind:src="movie.poster_src" alt="Product"></a>
                            <div class="product-info">
                                <h4 class="product-title">{{movie.name}}</h4><span><em>Genre: </em>{{movie.genre}}</span>
                            </div>
                        </div>
                    </td>
                    <td class="text-center text-lg text-medium">{{movie.price}}$</td>
                 </tr>
            </tbody>
        </table>
    </div>
    
    <div class="shopping-cart-footer">
        <div class="column text-lg">Price to pay: <span class="text-medium">{{movie.price}}$</span></div>
    </div>
    
    <div v-if="notEnoughMoney === true"  class="alert-success" id="profile-alert" role="alert">
            You don't have enough money on your account! You can add it in profile edit!
    </div>
    <div v-if="enoughMoney === true"  class="alert-success" id="profile-alert" role="alert">
            Your purchase is successful!
    </div>
    <div class="shopping-cart-footer">                                                                                                    
        <div  class="column"><button  class="btn"  v-on:click="$emit('clickedBtn', 'false')">Go Back</button></div>
        <div class="column"><button v-on:click="$emit('createOrder', {...movie})" class="btn btn-success">Confirm purchase</button></div>
    </div>
</div>
    `
}