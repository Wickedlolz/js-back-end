# Cubicle - Workshop

### "Cubicle" is a place, where you can browse some of the most popular Rubik cubes in the world and add some new cubes that you have discovered.

## Requirments

Document with requirments Part 1 [**here**](https://github.com/Wickedlolz/js-back-end/blob/main/03.%20Cubicle-Workshop-Part-1.docx) provided from [**SoftUni**](https://softuni.bg/)

## Part 1

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

## Part 2

### Main Task

Now it's time to upgrade your app and implement a few new features. For instance, replace the way you store data using MongoDB and Mongoose, create and attach new accessories to each cube, make some relations between them, and include a few more pages.

Document with requirments Part 2 [**here**](https://github.com/Wickedlolz/js-back-end/blob/main/04.%20Cubicle-Workshop-Part-2.docx) provided from [**SoftUni**](https://softuni.bg/)

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

### Additional Pages

-   **/create/accessory** - should render the create an accessory form
-   **/attach/accessory/:id** - should render the accessory page about attaching new accessory for cube

And update the view on /details/:id route, that renders the cube's details.

## Part 3

### Main Task

Now it's time to implement user service in your app, so people can register, login and logout. And each cube can be edited or deleted. Some of the functionality should require authentication such as (create a cube, create accessory) and authorization (such as edit and delete). Also, all routes should be protected.

Document with requirments Part 3 [**here**](https://github.com/Wickedlolz/js-back-end/blob/main/05.%20Cubicle-Workshop-Part-3.docx) provided from [**SoftUni**](https://softuni.bg/)

### Installing Dependencies

1. **jsonwebtoken** - allows you to decode, verify and generate JWT
2. **bcrypt** - a library to help you hash passwords
3. **cookie-parser** - parse cookie header and populate req.cookies with an object keyed by the cookie names (if you choose to store the jwt as а cookie)

### Model

The User Model structure:

-   **Id** - ObjectId
-   **username** - string
-   **password** - string **(hashed)** - User **bcrypt** to hash and compare the password

### Routes Protection

Make sure the anonymous (guest) users can't reach the functionality which requires authentication, such as creating a cube view. And already logged-in users have generated and stored jwt, can see the correct navigation, and can't reach the login and register form. If some of these scenarios happen, make sure the current user is redirected to the home page

### Authentication

Guest users can see and access the following URL:

-   Home page (Browse)
-   About page
-   Login page
-   Register page
-   Cube details page

And can't access and see everyone else...

Logged in users can see and access the following URL:

-   Home page (Browse)
-   About page
-   Add cube
-   Add accessory
-   Logout
-   Cube details page
-   Cube accessories page
-   Edit cube page
-   Delete cube page

### Authorization

Only authorized users should see the **[Edit]** and **[Delete]** buttons and if the currently logged-in user is the creator of this cube. Otherwise, they should be hidden.

### Additional Pages

You should implement 4 new routes:

-   **/login** - should render the login form
-   **/register** - should render the register form
-   **/edit** – should render the edit form
-   **/delete** – should render the delete form

Make sure when you access /edit and /delete routes, they show the current cube information
