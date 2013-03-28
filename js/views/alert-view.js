// <div class="alert alert-block alert-error fade">
//                   <button type="button" class="close" data-dismiss="alert">×</button>
//                   <h4 class="alert-heading"></h4>
//                   <p></p>
//                 </div>
var AlertView = Backbone.View.extend({
	className: 'alert fade in',
	alerts: ['success', 'error', 'info'],
	template: _.template([
		'<div>',
		'<a href="#" data-dismiss="alert" class="close">&times;</a>',
		'<%= message %>',
		'</div>'
	].join('')),
	initialize: function(options) {
		var message = options.msg || '';
		var alert = options.hasOwnProperty('alert') ? options.alert : 'info';

		if(_.indexOf(this.alerts, alert) === -1) {
			throw new Error('Invalid alert: [' + alert + '] Must be one of: ' + this.alerts.join(', '));
		}

		this.alert = alert;
		this.message = message;
	},
	render: function() {
		var output = this.template({ message: this.message });
		this.$el.addClass('alert-'+this.alert).
			html(output).
			alert(); // jquery plugin
		return this;
	}
});

AlertView.msg = function($el, options) {
	var alert = new AlertView(options);
	$el.prepend(alert.render().el);
	setTimeout(function() {
		alert.$el.alert('close');
	}, 10000);
	return alert;
};