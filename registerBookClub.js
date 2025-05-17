const baseUri = "http://localhost:5279/api/BookClub?ownerId=";

        const app = Vue.createApp({
            data() {
                return {
                   name : "",
                   description : "",
                   ownerid : null,
                };
            },
            methods: {
                async registerBookClub() {
                    try {
                        const response = await axios.post(baseUri + this.ownerid, {
                            name: this.name,
                            description: this.description,
                            
                        });

                        this.message = "BookClub oprettet!";
                        console.log(response.data);
                        this.name = "";
                        this.description = "";
                        this.ownerid = null;
                        
                    } catch (err) {
                        this.message = err.response?.data || "Der opstod en fejl.";
                        console.error(err.response?.data || err);
                    }
                }
            }
        });

        app.mount("#app");