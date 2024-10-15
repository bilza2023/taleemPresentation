
I have 2 child classes PresentationObjBlob and PresentationObjUrl both extends AbstractPresentation.
so AbstractPresentation is parent of both. AbstractPresentation is also parent of some other classes so i do not want to change AbstractPresentation.

Requirement : I want you to study AbstractPresentation , PresentationObjBlob and PresentationObjUrl

    Task1: combine AbstractPresentation and  PresentationObjBlob and PresentationObjUrl and write a new Parent class ("BasePresentation") to replace AbstractPresentation for  PresentationObjBlog and PresentationObjUrl.

    Task2: After new class BasePresentation is written re-write PresentationObjBlob and PresentationObjUrl as children of these classes. since both the classes are very much alike except the contructor and the loadSound method so they will be very small child classes. 

keep in mind: 
 - use PLAY_STATE
 - Expected Behaviour of Start (i think this is how it is currently but do check):
    - if INITIAL return
    - if LOADED or STOP start from 0
    - if PAUSED start from pause place.    
 - before writing code ask questions   