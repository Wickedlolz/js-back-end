# Cubicle - Workshop

### "Cubicle" is a place, where you can browse some of the most popular Rubik cubes in the world and add some new cubes that you have discovered.

## Requirments

### Part 1

1.  Cube Model

    -   Id - (number)
    -   Name - (string)
    -   Description - (string)
    -   Image URL - (string)
    -   Difficulty Level - (number)

2.  Storage

    Store the cubes inside a /config/database.json

3.  Routes

    -   / - the main page (should visualize all the cubes in the database and a search field)
    -   /about – should render the about page
    -   /create – should render the create cube form
    -   /details/:id – should render the details page about selected cube
    -   Any other - should render the 404 not found page

4.  Create Templates

    -   Use the provided HTML to create templates using Handlebars. Identify the dynamic parts and use appropriate syntax for interpolating and rendering the application context.

5.  Bonus Search

    Implement searching logic. Use the following validation:

    -   If the user searches only a string and NO difficulty, render all difficulties

    If the search does NOT meet the requirements, just redirect to the home page ('/').
