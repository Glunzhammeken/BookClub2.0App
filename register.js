const baseUri = "http://localhost:5279/api/users";

        const urlParams = new URLSearchParams(window.location.search);
        const from = urlParams.get('from');
        console.log("from:", from); // Tilføj denne linje
        let backLink = "index.html";
        let backText = "Tilbage til Forsiden";
        if (from === "admin") {
            backLink = "AdminIndex.html";
            backText = "Tilbage Til Admin Forsiden";
        }

        const app = Vue.createApp({
            data() {
                return {
                    userName: "",
                    email: "",
                    password: "",
                    message: "",
                    role: "",
                    backLink: backLink,
                    backText: backText
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
