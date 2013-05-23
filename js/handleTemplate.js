Backbone.View.prototype.close = function() {
    console.log( 'Closing view ' + this );
    this.remove();
    this.unbind();
}
 
tpl.loadTemplates(['header'], function () {
    Backbone.history.start();
});