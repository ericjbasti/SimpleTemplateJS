SimpleTemplateJS
================

An extremely simple template system. 


creating a template:

`var demoTemplate='%name%, %age%, %working%, %image.0%';`

or

`<script id="test_template" type="template"><div class="%name%"></div></script>`
`SimpleTemplate.loadTemplate('test_template');`

Your object:

`var demoObject={name:'Eric',age:'32',working:true,image:['imageSrc.jpg']};`

Filling your template:

`SimpleTemplates.fill(demoTemplate,demoObject,{working:{'true':'has a job','false':'needs a job'}});`

or 

`SimpleTemplate.fill('test_template',demoObject);`
