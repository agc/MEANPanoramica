var MovieApp = {
    Models: {},
    Collections: {},
    Views: {},
    Templates: {}
};

MovieApp.Models.Movie = Backbone.Model.extend({
    defaults: {
        title: "Bag IT",
        year: 2010,
        averageRating: 4.6,
        rating: "NR"
    },

    initialize: function () {
        console.log("Movie Model created");
    }
});

var movie = new MovieApp.Models.Movie();
console.log("The Movie Title: " + movie.get("title") + "; Rating: " + movie.get("rating"));