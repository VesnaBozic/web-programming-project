export default{
    props: ["myOrders", "loggedUser"],
   
    data() {
        return {}
            
    },
    template: `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
    <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <router-link class="nav-link" to="/myProfile">{{loggedUser.name}} <i class="fas fa-user"></i></router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/profile">Home</router-link>
                </li>
            </ul>
        </div>
    </div>
</nav>

<div class="container-cart padding-bottom-3x mb-1">
    <div class="table-responsive shopping-cart">
        <table class="table-order">
            <thead>
                <tr>
                    <th>Movie</th>
                    <th class="text-center">Purchase date</th>
                    <th class="text-center">Price</th>
                </tr>
            </thead>
            <tbody>
                <tr  v-for="order in myOrders">
                    <td>
                        <div class="product-item">
                            <a class="product-thumb" ><img v-bind:src="order.poster_src" alt="Product"></a>
                            <div class="product-info">
                                <h4 class="product-title"><a>{{order.name}}</a></h4>
                            </div>
                        </div>
                    </td>
                    <td class="text-center text-lg text-medium">{{order.price}}</td>
                </tr>
            </tbody>
        </table>
    </div>
<div class="shopping-cart-footer">
        <div class="column text-lg">Price to pay: <span class="text-medium">{{order.price}}</span></div>
</div>
<div class="shopping-cart-footer">                                                                                                    
    <div  class="column"><button  class="btn" >Go Back</button></div>
</div>
</div>
    `
}