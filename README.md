## FORMY - A simple jQuery Plugin for handling forms, form-like structures, and their data

Formy was originally a jQuery plugin I wrote to take care of a lot of the mundane, repetitive tasks associated with form data. If you also use Bootstrap, you'll find that it has a lot of built-in features to handle showing errors as well by using its CSS error classes.

It also contains a few useful utility functions for customizing user input as well.

This is essentially version 1.0 as released to the public. I hadn't intended on doing so, but there was interest from others to see it, so it's up here on GitHub.

## How to Use

Formy was designed so you don't have to follow a rigid order to get it going. You don't even need to have a `<form>` element wrapping your input elements if you want. All you need is a parent element of any type that wraps everything, which could be a <div>, a <table>, whatever.

### Example structure

Here is the example structure used by the examples below:

```html
<div class="box form-box">
	<div class="box-body">
		<div class="form-group">
			<label>Name</label>
			<input type="text" name="name" placeholder="Your Name" data-required="1" />
		</div>
	</div>
</div>
```

### Required Fields

To set up your required fields, simply put a `data-required="1"` attribute in them. If you want to automatically color all required fields, call `setRequiredFields()` in your initialization routine with a standard jQuery selector.

Changes background color for all required fields for all form-box class forms:

```javascript
$('.form-box').setRequiredFields();
```

This will add a generic class called "required" to the field. Add this to your CSS and you have consistent background coloring!

To turn any specific field off as required, set data-required to "0".

### Checking required fields

To check all required fields to make sure they are filled in, call checkFormValidation(). This function will check any required fields, and if they are blank, will set the error class for that field and return a true or false condition.

Example:

```javascript
if ( !$('.form-box').checkFormValidation() ) {
	// Alert user here
	return;
}
```



## License

Formy is releasd under the MIT License. Do whatever you want with it. If it breaks anything, you get to keep both pieces.