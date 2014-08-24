(function($){

    var ListView = Backbone.View.extend({
        el: $('body'),

        initialize: function(){
            _.bindAll(this, 'render');

            this.render();
        },

        render: function(){
            $(this.el).append("<ul> <li>hello world</li> <li>Hola Mundo</li> </ul>");
        }
    });
    // **listView instance**: Instantiate main app view.
    var listView = new ListView();
})(jQuery);