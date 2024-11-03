I want to seperate my component from code

- there should be a presentation object that i will send to every player and every editor
- by every editor i mean editor of any slide.type or play of any slide.type


My Classes :
    - Presentation class represents a presentation
            - slide class is the Parent class for all slides
            - item class is the Parent class of all items.
Plan:
    Every player and editor gets the same objects and they build their own slide player and slide editor.
                