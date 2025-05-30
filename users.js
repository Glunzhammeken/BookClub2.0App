const baseUri = "http://localhost:5279/api";

Vue.createApp({
    data() {
        return {
            users: [],
            error: "",
            errorGet:"",
            msgDelete:"",
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

                // Naviger til $values og udtræk brugere
                if (response.data && response.data.$values) {
                    this.users = response.data.$values.map(user => ({
                        id: user.id,
                        userName: user.userName,
                        email: user.email,
                        role: user.role,
                        ownedBookClubsCount: user.ownedBookClubs?.$values?.length || 0,
                        memberOfBookClubsCount: user.memberOfBookClubs?.$values?.length || 0
                    }));
                } else {
                    this.users = []; // Hvis der ikke er data, sæt en tom liste
                }

                this.error = null; // Ryd fejl, hvis det lykkes
            } catch (ex) {
                console.error("Error fetching users:", ex); // Log fejlen
                this.error = ex.message || "No Users"; // Mere informativ fejlmeddelelse
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
                this.updateMessage = null; // Clear the update message if user is found
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
                this.msgDelete = "Bruger slettet!"; // Success message
            } catch (ex) {
                if (ex.response && ex.response.status === 404) {
                    this.msgDelete = "No user with that ID"; // Specific error message for 404
                } else {
                    console.error("Error deleting user:", ex);
                    this.error = ex.message || "Failed to delete user";
                }
            }
        },
        async updateUser() {
            const url = baseUri + "/users/" + this.user.id;
            try {
                const response = await axios.put(url, this.updateData);
                this.updateMessage = "Bruger opdateret!"; // Success message
                this.getUsers(); // Opdater brugerlisten
                this.user = null; // Ryd den valgte bruger efter opdatering
                this.updateData = { id: 0, userName: "", email: "", passwordHash: "", role: "" }; // Nulstil updateData
                this.error = null; // Ryd fejlbeskeder
            } catch (ex) {
                if (ex.response && ex.response.data) {
                    // Hvis backend returnerer en fejlbesked, vis den
                    this.error = ex.response.data;
                } else {
                    // Generisk fejlbesked, hvis ingen specifik besked er tilgængelig
                    this.error = "Der opstod en fejl under opdateringen.";
                }
                console.error("Error updating user:", ex.response?.data || ex);
            }
        }
        
        
    },
}).mount("#app");