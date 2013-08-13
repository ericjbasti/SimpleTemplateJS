SimpleTemplateJS
================

An extremely simple template system. 


example use:



var demoTemplate='%name%, %age%, %working%, %image.0%'; // string, string, boolean, array
var demoObject={name:'Eric',age:'32',working:true,image:['imageSrc.jpg']};

SimpleTemplates.fill(demoTemplate,demoObject,{working:{'true':'has a job','false':'needs a job'}});