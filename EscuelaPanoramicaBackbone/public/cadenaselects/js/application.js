$(function(){
    var Country = Backbone.Model.extend();
    var City = Backbone.Model.extend();

    var Countries = Backbone.Collection.extend({
        url: '/countries',
        model: Country
    });

    var Cities = Backbone.Collection.extend({
        model: City
    });

    // vista de un Country y una City
    // los modelos deben constar de dos campos id name

    var LocationView = Backbone.View.extend({
        tagName: "option",

        initialize: function(){
            _.bindAll(this, 'render');
        },

        render: function(){
            $(this.el).attr('value',
                this.model.get('id')).html(this.model.get('name'));
            return this;
        }
    });

    var LocationsView = Backbone.View.extend({
        initialize: function(){
            _.bindAll(this, 'addOne', 'addAll');
            this.collection.bind('reset', this.addAll);
        },
        events: {
            "change": "changeSelected"
        },

        addOne: function(location){
            // para eliminar las vistas deben existir como objetos
            // this.locationsViews se define en addAll
            // addOne es llamada desde addAll

            var locationView = new LocationView({ model: location });
            this.locationViews.push(locationView);
            $(this.el).append(locationView.render().el);
            // version previa
            //$(this.el).append(new LocationView({ model: location }).render().el);
        },

        addAll: function(){
            _.each(this.locationViews, function(locationView) { locationView.remove(); }); //si es nula la ignora
            this.locationViews = [];
            this.collection.each(this.addOne);
           // versión previa
           // this.collection.each(this.addOne);
        },

        changeSelected: function(){
            this.setSelectedId($(this.el).val());
        }
    });

    var CountriesView = LocationsView.extend({
        setSelectedId: function(countryId) {
            this.citiesView.collection.url = "/cities/" + countryId ; //tiene acceso a la vista de ciudades

            this.citiesView.collection.fetch({reset: true});

            $(this.citiesView.el).attr('disabled', false);
        }
    });

    var CitiesView = LocationsView.extend({
        setSelectedId: function(cityId) {
            // Do nothing - for now
        }
    });





    var countries = new Countries();

    var countriesView   = new CountriesView({el: $("#country"), collection: countries});
    var citiesView      = new CitiesView({el: $("#city"), collection: new Cities()});

    countriesView.citiesView = citiesView;





    countries.fetch({reset: true} ); // en la versión original no aparece {reset: true}
});