var SimpleTemplate={
	ver:'1.1',
	template:{}
};

SimpleTemplate.fill = function(who,where,props){
	var temp=SimpleTemplate.template[who] || who;
	var identifier;
	for (var i in where){
		if(typeof(where[i])=='object'){
			for (var j in where[i]){
				identifier = new RegExp("\\%" + i + "."+j+"\\%", "g");
				temp=temp.replace(identifier,where[i][j]);
			}
		}else{
			var sim=where[i];
			if(typeof(sim)=='boolean' || typeof(sim)=='number') sim.toString(); // convert booleans & numbers to strings for keying
			var simCheck=sim;
			identifier = new RegExp("\\%" + i + "\\%", "g");
			if(simCheck=='Yes' || simCheck=='true' || simCheck== 'false' || simCheck=='No'){
				if(props && props[i]){
					temp=temp.replace(identifier,props[i][simCheck]);
				}
			}else{
				temp=temp.replace(identifier,where[i]);
			}
		}
	}
	return temp;
}

SimpleTemplate.loadTemplate = function(who){
	if(document.getElementById(who)){
		SimpleTemplate.template[who]=document.getElementById(who).innerHTML;
	}else{
		console.log('failed to load template ['+who+']')
	}
}
