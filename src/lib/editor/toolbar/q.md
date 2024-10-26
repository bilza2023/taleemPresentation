there is a very simple svelte component that i want to write.

 
Starting Example

<script>
//@ts-nocheck

</script>


<div class='flex justify-center items-center text-xs bg-green-700 p-1 rounded-md'>

    
</div>

What will the component display 

 it will display 2 groups on control (side by side but the internal elements of each group should use tailwindcss class flex-col 

    group 1 : stack them vertical
    Purpose : saving presentation to local storage:
        - save button 
        - input for fileName (file name) 


    group 2: stack them vertical
    Purpose : load presentations from local storage:
        - a drop down menu with names of files saved (filesDropDown)
        - a load button which calls a callback

Explanation

    - The component will get a prop "export let slides"
    - when the save button is clicked:
        - check if there is a name in the input (fileName).using that name save the slides in local storage in an array of objects called "taleemPresentations".
        - each element of taleemPresentations is :
                { name: the_given_name , slildes};
        - a list of all the names are updated in the dropdown (filesDropDown).

    - when load button is called it calls a callback.            



        

When the use