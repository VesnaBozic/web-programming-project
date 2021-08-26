export default {
    template: `
   
 
    <div>
    <add-user  v-if="message === false" v-on:save="create"></add-user>
    <message-page v-on:goBack="goBack" v-if="message === true" v-bind:messageType="messageType"> </message-page>
  
    </div>`,
    data() {
        return {
            message: false,
            messageType:""

        }
    },
    methods: {


        goBack(a) {
            this.message = a;
            this.$router.go();
        },


        create(user) {
            axios.post("api/users", user).then((response) => {
                this.messageType = "accountCreated";
                this.message = true;
                this.$router.push("/createAccount");
                
            },_ =>{
                this.messageType = "failed"
                this.$router.push("/createAccount");
                this.message = true;
                return;
            }
            
            );
        },

    },
    created() {



    }
}