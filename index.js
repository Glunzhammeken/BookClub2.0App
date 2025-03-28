const baseUri = "http://localhost:5279/api";

Vue.createApp({
    data() {
        return {
            users : [],
            error:"",
        }
    },
    methods: { 
        
    
        async getUsers() {
            console.log(baseUri + "/users");
            try {
                const response = await axios.get(baseUri + "/users");
                console.log("Response data:", response.data);
                this.users = response.data; // Fix assignment
                this.error = null; // Clear the error if successful
            } catch (ex) {
                console.error("Error fetching users:", ex); // Log the error
                this.error = ex.message || "No Users"; // More informative error handling
            }
        }
        
        
    },
}).mount("#app");