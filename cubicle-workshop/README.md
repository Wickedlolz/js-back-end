# Cubicle - Workshop

### "Cubicle" is a place, where you can browse some of the most popular Rubik cubes in the world and add some new cubes that you have discovered.

## Requirments

Document with requirments Part 1 [**here**](https://github.com/Wickedlolz/js-back-end/blob/main/03.%20Cubicle-Workshop-Part-1.docx) provided from [**SoftUni**](https://softuni.bg/)

### Part 1

1.  Cube Model

    -   **Id** - (number)
    -   **Name** - (string)
    -   **Description** - (string)
    -   **Image URL** - (string)
    -   **Difficulty Level** - (number)

2.  Storage

    Store the cubes inside a **/config/database.json**

3.  Routes

    -   **/** - the main page (should visualize all the cubes in the database and a search field)
    -   **/about** – should render the about page
    -   **/create** – should render the create cube form
    -   **/details/:id** – should render the details page about selected cube
    -   **Any other** - should render the 404 not found page

4.  Create Templates

    -   Use the provided HTML to create templates using Handlebars. Identify the dynamic parts and use appropriate syntax for interpolating and rendering the application context.

5.  Bonus Search

    Implement searching logic. Use the following validation:

    -   If the user searches only a string and NO difficulty, render all difficulties

    If the search does NOT meet the requirements, just redirect to the home page **('/')**.

### Part 2

## Main Task

Now it's time to upgrade your app and implement a few new features. For instance, replace the way you store data using MongoDB and Mongoose, create and attach new accessories to each cube, make some relations between them, and include a few more pages.

Document with requirments Part 2 [**here**]() provided from [**SoftUni**](https://softuni.bg/)

### Cube Mongoose Model

-   **Id** - (objectId)
-   **Name** - (String, required)
-   **Description** - (String, required, max length validation)
-   **Image URL** - (String, required, http/https validation)
-   **Difficulty Level** - (Number, required, min and max valid range)
-   **Accessories** - (ObjectId, ref Accessories Model)

### Accessory Mongoose Model

-   **Id** - (ObjectId)
-   **Name** - (String, required)
-   **Image URL** - (String, required, http/https validation)
-   **Description** - (String, required, max length validation)
-   **Cubes** - (ObjectId, ref Cubes Model)

## Additional Pages

-   **/create/accessory** - should render the create an accessory form
-   **/attach/accessory/:id** - should render the accessory page about attaching new accessory for cube

And update the view on /details/:id route, that renders the cube's details.
