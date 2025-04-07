const baseUri = "http://localhost:5279/api";

Vue.createApp({
    data() {
        return {
            users: [],
            error: "",
            errorGet:"",
            errorDelete:"",
            userId: null,
            user: null,
            deleteUserId: null,
            updateData: { id: 0, userName: "", email: "", passwordHash: "", role: "" },
            updateMessage: ""
            
        };
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
        },
        async getUser(userId) {
            try {
                const response = await axios.get(`${baseUri}/users/${userId}`);
                this.user = response.data; // Fix assignment
                this.errorGet = null; // Clear the error if successful
                if (!this.user) {
                    this.errorGet = "No user with that Id"; // More informative error handling
                }
            } catch (ex) {
                console.error("Error fetching user:", ex); // Log the error
                this.errorGet ="No User"; // More informative error handling
            }
        },
        async clearUsers() {
            try {
                
                
                this.users = []; // Clear the users array
                this.error = null; // Clear the error if successful
            } catch (ex) {
                console.error("Error deleting users:", ex); // Log the error
                this.error = ex.message || "No Users"; // More informative error handling
            }
        },
       async deleteUser(userId) {
            this.deleteUserId = userId;
            try {
                await axios.delete(`${baseUri}/users/${userId}`);
                this.error = null;
                this.deleteUserId = null; // Clear the deleteUserId after deletion
                // Refresh the user list after deletion
                await this.getUsers();
            } catch (ex) {
                if (ex.response && ex.response.status === 404) {
                    this.errorDelete = "No user with that ID"; // Specific error message for 404
                } else {
                    console.error("Error deleting user:", ex);
                    this.error = ex.message || "Failed to delete user";
                }
            }
        },
        async updateUser() {
            const url = baseUri + "/users/" + this.user.id;
            try {
                response = await axios.put(url, this.updateData);
                this.updateMessage = "response " + response.status + " " + response.statusText;
                this.getUsers();
                this.user= null; // Clear the user after update
                
                
            } catch (ex) {
                console.log(updateData);
                alert(ex.message)
            }
            
        }
        
        
    },
}).mount("#app");