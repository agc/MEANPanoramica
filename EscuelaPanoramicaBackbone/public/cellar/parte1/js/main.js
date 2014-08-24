$(function(){


var Wine = Backbone.Model.extend(
    {idAttribute: '_id'}
);

var WineCollection = Backbone.Collection.extend({
    model:Wine,
    url:"/wines"

});



var WineListView = Backbone.View.extend({

    tagName:'ul',

    initialize:function () {
        this.collection.bind("reset", this.render, this);
    },

    render:function (eventName) {

        _.each(this.collection.models, function (wine) {
            $(this.el).append(new WineListItemView({model:wine}).render().el);
        }, this);
        return this;
    }

});

var WineListItemView = Backbone.View.extend({

    tagName:"li",

    template:_.template($('#tpl-wine-list-item').html()),

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

var WineView = Backbone.View.extend({

    template:_.template($('#tpl-wine-details').html()),

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});


// Router
var AppRouter = Backbone.Router.extend({

    routes:{
        "":"list",
        "wines/:id":"wineDetails"
    },

    initialize:function () {
        this.wineList       = new WineCollection();

        this.wineListView   = new WineListView({collection:this.wineList});

        var self = this

        this.wineList.fetch({
            success: function(){

            $("#sidebar").html(self.wineListView.render().el);
        },error: function() {

        $("#content").html("error")}});


    },

    list:function () {

        this.wineList.fetch({success: function(){
            $("#sidebar").html(new WineListView({collection: this.wineList}).el);
        }});
        $('#sidebar').html(this.wineListView.render().el);
    },

    wineDetails:function (id) {
        this.wine = this.wineList.get(id);
        var self= this
        this.wineView = new WineView({model:self.wine});
        $('#content').html(this.wineView.render().el);
    }
});





    window.router = new AppRouter();
    Backbone.history.start();
});