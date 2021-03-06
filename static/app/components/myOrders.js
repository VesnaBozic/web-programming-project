export default {
    data() {
        return {
            loggedUser: {},
            myOrders: [],
            amount: 0
        }
    },
    methods: {

        getOrders() {
            axios.get("api/orders").then((response) => {
                this.myOrders = response.data;
                for (let i = 0; i < this.myOrders.length; i++) {
                    this.amount += this.myOrders[i].price;} });
        },

        refreshData() {
            axios.get("/api/logged").then((response) => {
                if (localStorage.getItem("token") != null) {
                    this.loggedUser = response.data;}});
        },
        getRole() {
            axios.get("/api/userType").then((response) => {
                if (localStorage.getItem("token") != null) {
                    this.userType = response.data; }});
        }
    },

    created() {

        this.refreshData();
        this.getRole();
        this.getOrders();
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
                    <router-link class="nav-link" to="/profile">Home <i class="fas fa-home"></i></router-link>
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
                    <th class="text-center">Purchase date</th>
                    <th class="text-center">Price</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in myOrders">
                    <td>
                        <div class="product-item">
                            <a class="product-thumb"><img v-bind:src="order.poster_src" alt="Product"></a>
                            <div class="product-info">
                                <h4 class="product-title">{{order.name}}</h4>
                            </div>
                        </div>
                    </td>
                    <td class="purchase-date" class="text-center text-lg text-medium">{{order.purchase_date.slice(0,17)}}</td>
                    <td class="text-center text-lg text-medium">{{order.price}}$</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="shopping-cart-footer">
        <div class="column text-lg">Money you spent: <span class="text-medium">{{amount.toFixed(2)}}$</span></div>
    </div>
    <div class="shopping-cart-footer">                                                                                                    
        <div  class="column"><router-link to="/profile" class="btn">Go Back</router-link></div>
    </div>
</div>
 `,
}