/*
	Formy library
*/
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}

(function ($) {
	
	$.fn.setRequiredFields = function() {
		return this.each(function() {
			var frm = $(this);
			frm.find('input[type="text"],input[type="password"],input[type="hidden"],input[type="email"],textarea,select').each(function() {
				if ( $(this).hasAttr('data-required') && $(this).data('required') == '1' ) {
					$(this).addClass('required');
				}
			});
		});
	};
	
	/*
		Clear Bootstrap visual errors in a form
	*/
	$.fn.clearFormErrors = function() {
		return this.each(function() {
			var frm = $(this);
			frm.find('.form-group,.error-group,.input-group').removeClass('has-error');
		});
	};
	
	$.fn.clearForm = function() {
		var frm = $(this);
		
		frm.find('input[type="text"],input[type="password"],input[type="hidden"],input[type="email"],textarea,select').removeAttr('disabled').val('').each(function(idx, item) {
			if ( $(item).hasAttr('data-default') ) {
				$(item).val( $(item).data('default') ).trigger('change');
			}
		});
		
		frm.find('input[type="checkbox"],input[type="radio"]').each(function(idx, item) {
			if ( $(item).is(':checked') ) {
				$(item).iCheck('uncheck');
			}
		});
	};
	
	/* Get form data */
	$.fn.getFormData = function() {
		var values = {};
		var frm = $(this);
		var elt;
		
		frm.find('input[type="text"],input[type="password"],input[type="hidden"],input[type="email"],textarea,select').each(function(idx, item) {
			elt  = $(item);
			if ( elt.hasAttr('name') ) {
				try {
					values[ elt.attr('name') ] = elt.val().trim();
				} catch (err) {
					values[ elt.attr('name') ] = '';
				}
			}
		});
		
		frm.find('input[type="checkbox"]').each(function(idx, item) {
			elt = $(item);
			
			if ( elt.hasAttr('name') ) {
				values[ elt.attr('name') ] = elt.is(':checked') ? 1 : 0;
			}
		});
		
		return values;
	};
	
	$.fn.getBitFlag = function() {
		var total = 0;
		
		this.each(function(idx, item) {
			if ( $(item).is(':checked') ) {
				total = total | parseInt( $(item).data('value') );
			}
		});
		
		return total;
	};
	
	$.fn.setBitFlag = function(flag) {
		this.each(function(idx, item) {
			$(item).iCheck('uncheck'); 
			if ( flag & parseInt( $(item).data('value') )  ) {
				$(item).iCheck('check'); 
			}			
		});
	};
	
	
	$.fn.checkFormValidation = function() {
		var frm = $(this);
		
		frm.find('input[type="text"],input[type="password"],input[type="email"],textarea,select').each(function(idx, item) {
			var elt = $(this);
			
			/* Check for required and blank */
			if ( !elt.is(':hidden') && elt.hasAttr('data-required') && elt.data('required') == '1' && 
				( !elt.val()  || elt.val().trim().length == 0 ) ) {
				var grp = elt.parents('.form-group');
				
				if ( grp.length ) {
					grp.addClass('has-error');
				} else {
					grp = elt.parents('.input-group');
					if ( grp.length ) {
						grp.addClass('has-error');
					}
				}
			}
		});
		
		return frm.find('.has-error').length == 0;
	};
	
	/* Shortcut to find if a form has errors */
	$.fn.hasErrors = function() {
		var frm = $(this);
		
		return frm.find('.has-error').length > 0;
	};
	
	/* Toggle disable/enable of form */
	$.fn.toggleForm = function(enable) {

		return this.each(function(idx, item) {
			var frm = $(item);
			var elts = frm.find('input[type="text"],input[type="password"],input[type="checkbox"],input[type="radio"],input[type="email"],textarea,select,button');
			
			if ( enable ) {
				elts.removeAttr('disabled');
			} else {
				elts.attr('disabled','disabled');
			}
		});
	};
	
	$.fn.setFormData = function(data) {
		var frm = $(this);
		if ( data ) {
			for (var key in data) {
				if (!data.hasOwnProperty(key)) continue;
				frm.find('[name="'+key+'"]').each(function(idx, item) {
					$(item).val( data[key] );
					if ( $(item).is('input[type="checkbox"]') ) {
						if ( parseInt(data[key]) == 1 ) {
							$(item).iCheck('check');
						} else {
							$(item).iCheck('uncheck');
						}
						
						//$(item).attr('checked', 'checked');
					}
				});
			}
		}
		
		return this;
	};
	
	$.fn.numericOnly = function(options) {
		
        // This is the easiest way to have default options.
        var settings = $.extend({
            allowFloat: false,
			alignRight: true
        }, options );
		
		
		return this.each(function(idx, item) {
			$(item).on('keydown', function(evt) {
				// Numbers, tab, left, right, and optionally dot or decimal
				if ( !((evt.keyCode >= 48 && evt.keyCode <= 57) || 
					(evt.keyCode >= 96 && evt.keyCode <= 105) || 
					(settings.allowFloat && evt.keyCode == 110) || 
					(settings.allowFloat && evt.keyCode == 190) || 
					(evt.keyCode == 9 || evt.keyCode == 13 || evt.keyCode == 8) ||
					(evt.keyCode == 46 || evt.keyCode == 37 || evt.keyCode == 39)
				)) {
					evt.preventDefault();
				}
			}).css({'text-align': (settings.alignRight ? 'right' : 'left')});
			
		});
	};
	
	$.fn.readOnly = function(options) {
		return this.each(function(idx, item) {
			$(item).on('keydown', function(evt) {
				evt.preventDefault();
			});
		});
	};
	
	$.fn.implodeValues = function(delimiter) {
		
		var vals = new Array();
		if ( !delimiter ) {
			delimiter = '|';
		}
		this.each(function(idx, item) {
			if ( $(item).is(':checked') ) {
				vals.push( $(item).val() );
			}
		});
		
		return vals.join(delimiter);
	};
	
	$.fn.autocompleteOff = function() {

		return this.each(function(idx, item) {
			var frm = $(item);
			var elts = frm.find('input[type="text"],input[type="password"],input[type="email"],textarea');
			elts.attr('autocomplete', 'off');
		});
	};
	
})(jQuery);
