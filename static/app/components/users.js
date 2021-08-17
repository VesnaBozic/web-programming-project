export default {
    template: ` <div>
    <user-form v-on:sacuvaj="create" v-bind:tekst="'Dodaj'"></user-form>
    <user-form v-bind:user="korisnikZaIzmenu" v-bind:tekst="'Izmeni'" v-on:sacuvaj="update"></user-form>
    <table-user v-bind:users="users" v-on:uklanjanje="remove" v-on:izmena="setKorisnikZaIzmenu"></table-user>
    </div>`,
    data() {
        return {
            users: [],
            korisnikZaIzmenu: {},
     
        }
    },
    methods: {
  

        setKorisnikZaIzmenu(user) {
            this.korisnikZaIzmenu = { ...user };
        },
        refreshData() {
            axios.get("api/users").then((response) => {
                this.users = response.data;
            });
        },
  
    
        remove(id) {
            axios.delete(`api/users/${id}`).then((response) => {
            this.refreshData();});
        },


        create(user) {
            axios.post("api/users", user).then((response) => {
            this.refreshData() });
        },


        update(user) {

            axios.put(`/api/users/${user.id}`, user).then((response) => {
                this.refreshData();});
        }
    }, 
    created() {
        this.refreshData();
        
       
    }  
}