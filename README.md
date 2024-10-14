
# Taleem Presentation v 0.0.5 (Target Candidate 1.0 Release )

Objectives For Presentation Player :

1 : The library should basically export 1 object called "PresentationObj" (PresentationObjUrl if uses sound and PresentationObjBlog is uses blobs)

2: The library should export svelte components that comsumes "PresentationObj" thus a number of components can be attached using one copy of PresentationObj. for example we can have PlayerToolbar and PresentationCanvas seperately both using the same PresentationObj. 

3: PresentationObj also hosts methods which can be used for "save" , stop , pause, play etc etc.it contains all the useful functions to manipulate the presentation. so PresentationObj is the code representation of the presentation and svelte components consumes and display this information. 
    - It also does not need svelte stores since the state is inside the PresentationObj

Objectives For Presentation Editor :

Just like player for editor i will also have 1 main object (PresentationEditorObj) which will edit a presentation and display it using svelte components which consumes this object PresentationEditorObj