var SimpleTemplate = {
	ver: '2.0',
	template: {},
	regex: /[{][@](.*?)[}]/g,
	functions: {
		toLowerCase: function(a) {
			a = a + '';
			return a.toLowerCase();
		},
		toUpperCase: function(a) {
			a = a + '';
			return a.toUpperCase();
		},
		firstChar: function(a) {
			a = a + '';
			return a[0];
		},
		underscores: function(a) {
			return a.split(' ').join('_');
		},
		removeUnderscores: function(a) {
			return a.split('_').join(' ');
		},
		checked: function(a) {
			if (a) {
				return 'checked';
			} else {
				return;
			}
		},
		define: function(a) {
			return a || ''
		}
	}
};

SimpleTemplate.loadTemplate = function(who) {
	if (document.getElementById(who)) {
		SimpleTemplate.template[who] = document.getElementById(who).innerHTML;
	} else {
		console.log('failed to load template [' + who + ']')
	}
}

SimpleTemplate.buildTemplateFromString = function(name, str) {
	SimpleTemplate.template[name] = {
		markup: str,
		tags: null
	}
	SimpleTemplate.template[name].tags = SimpleTemplate.getTags(str);
}

SimpleTemplate.addFunction = function(name, callback) {
	this.functions[name] = callback;
}


SimpleTemplate.loadTemplates = function() {
	var temp = document.getElementsByTagName('script');
	for (var i = 0; i != temp.length; i++) {
		if (temp[i].type == 'simple/template') {
			var who = temp[i].id;
			var markup = temp[i].innerHTML
			SimpleTemplate.template[who] = {
				markup: markup,
				tags: null
			}
			SimpleTemplate.template[who].tags = SimpleTemplate.getTags(markup);
		}
	}
}

SimpleTemplate.getTags = function(a) {
	var found = a.match(SimpleTemplate.regex);
	var tags = {};
	for (var i in found) {
		var temp = found[i];
		var prop = null;
		var func = null;
		var subtemplate = null;

		// We need to remove the template tags from our properties.
		temp = temp.replace('{@', '').replace('}', '');

		subtemplate = temp.split(':')[1];
		if(subtemplate){
			temp = temp.split(':')[0];
		}
		// We'll start at the very end of the string and look for a function call.
		func = temp.split(',')[1];
		if (func) { // If we find one, we save it and remove it from temp.
			temp = temp.split(',')[0];
		}

		// Now we look for a propery
		prop = temp.split('.')[1];
		if (prop) { // If we find one, we save it and remove it from temp.
			temp = temp.split('.')[0];
		}

		tags[found[i]] = {
			prop: prop,
			func: func,
			tag: temp,
			subtemplate: subtemplate
		}
	}
	return (tags);
}

SimpleTemplate.fill = function(template, obj) {
	var template = this.template[template];
	var output = template.markup;
	var identifier, value;
	for (var i in template.tags) {
		identifier = new RegExp("\\" + i, "g");
		var result = obj[template.tags[i].tag] || '';
		if (template.tags[i].prop) {
			try {
				result = result[template.tags[i].prop];
			} catch (e) {
				console.log('SimpleTemplate (' + result + '): ' + e.message);
			}
		}
		if (template.tags[i].func) {
			try {
				result = SimpleTemplate.functions[template.tags[i].func](result);
			} catch (e) {
				console.log('SimpleTemplate (' + result + '): ' + e.message);
			}
		} else {
			try {
				result = SimpleTemplate.functions.define(result);
			} catch (e) {
				console.log('SimpleTemplate (' + result + '): ' + e.message);
			}
		}
		if (template.tags[i].subtemplate){
			if(result.length){
				var tempResult = '';
				for(var r = 0; r<result.length; r++){
					tempResult+=SimpleTemplate.fill(template.tags[i].subtemplate, result[r]);
				}
				result = tempResult;
			}else{
				if(result){
					result = SimpleTemplate.fill(template.tags[i].subtemplate, result);
				}
			}
		}

		output = output.replace(identifier, result);
	}
	return (output);
}

SimpleTemplate.loadTemplates();