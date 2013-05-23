var TemplateManager = {
    // ...

    // You could stash an array of well known partials that need to be rendered
    // and registered with your Templating engine of choice.
    partials: [
        { name: 'header', template: 'header' }
    ],
    registerPartials: function (callback) {
        var that = this;

        _.each(this.partials, function (partial, index) {

            // As we're iterating over our partials, we can call our
            // existing `get` function to pre-compile and cache them.
            that.get(partial.template, function (tmp) {
                Handlebars.registerPartial(partial.name, tmp);

                if (index + 1 === that.partials.length) {
                    callback();
                }
            });
        });
    }
};