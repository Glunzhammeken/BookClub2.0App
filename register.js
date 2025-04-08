const baseUri = "http://localhost:5279/api/users";

        const app = Vue.createApp({
            data() {
                return {
                    userName: "",
                    email: "",
                    password: "",
                    message: "",
                    role: "",
                };
            },
            methods: {
                async register() {
                    try {
                        const response = await axios.post(baseUri, {
                            userName: this.userName,
                            email: this.email,
                            passwordHash: this.password,
                            role: this.role,
                        });

                        this.message = "Bruger oprettet!";
                        console.log(response.data);
                        this.userName = "";
                        this.email = "";
                        this.password = "";
                        this.role = "";
                        
                    } catch (err) {
                        this.message = err.response?.data || "Der opstod en fejl.";
                        console.error(err.response?.data || err);
                    }
                }
            }
        });

        app.mount("#app");
    