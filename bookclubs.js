const app = Vue.createApp({
    data() {
        return {
            bookClubs: [],
            message: ''
        };
    },
    mounted() {
        this.fetchBookClubs();
    },
    methods: {
        fetchBookClubs() {
            axios.get('http://localhost:5279/api/BookClub')
                .then(response => {
                    this.bookClubs = response.data;
                    if (this.bookClubs.length === 0) {
                        this.message = 'No book clubs found.';
                    }
                })
                .catch(error => {
                    console.error('Error fetching book clubs:', error);
                    this.message = 'Error fetching book clubs. Please try again later.';
                });
        }
    }
});

app.mount('#app');
