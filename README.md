SimpleTemplateJS
================

An extremely simple template system. 


creating a template:

`var demoTemplate='%name%, %age%, %working%, %image.0%';`

or

`<script id="test_template" type="template"><div class="%name%"></div></script>`
`SimpleTemplate.loadTemplate('test_template');`

Your object:

`var demoObject={name:'Eric',age:'32',dog:true,image:['imageSrc.jpg']};`

Filling your template:

`SimpleTemplate.fill(demoTemplate,demoObject,{working:{'true':'has a dog','false':'needs a dog'}});`

or 

`SimpleTemplate.fill('test_template',demoObject);`
