# RecipeBox

RecipeBox is a modern recipe management application built with React, Tailwind CSS, and Mongoose. It allows users to easily search, view, and add new recipes, providing a seamless and enjoyable cooking experience.

![recipebox wallpaper](/staff/angel-patino/project/doc/images/wallpaper.jpg)

## Functional

### Use cases

### User

- **Register User**: Users can create a new account.
- **Login User**: Users can log in to their account.
- **View Recipes**: Users can browse and view recipes.
- **View favorites**: Users can view yours favorites recipes.
- **Upload Recipes**: Users can upload new recipes.
- **Edit Your Recipes**: Users can edit their own recipes.

## Features

- **View Recipes**: Browse through a curated list of recipes with all necessary details.
- **Add Recipes**: Users can contribute by adding their own recipes.
- **Edit Recipes**: Users can edit their own recipes.
- **Like Recipes**: Users can like recipes, and the likes are stored and displayed.
- **Search Functionality**: Users can search for recipes by title or description.

## UX/UI Design

[Figma prototype](https://www.figma.com/proto/O3CJf7C2xr9autdqWyRPC9/RecipeBox.App?node-id=12-6&t=sjWccB84sOJSECvU-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1)

## Technical

### Data Model

#### User

- id (auto)
- name (string, required)
- surname (string, required)
- username (string, required)
- email (string, required)
- password(string, required)
- profilePicture (string, optional)?

#### Recipe

- id (auto)
- author (user.id)
- title (string, required)
- thumbnail (string, required)
- date(date, required)
- Ingredients (array of objects, required)
  - Each ingredient object contains:
    - name(string,required)
      -quantity(number,required)
      unit(string, required)
- description (string, required)
- cookTime (number, required, in minutes)
- likes(array of user.id)

## Technologies Used

- **Frontend**:

  - React
  - Vite
  - Tailwind CSS

- **Backend**:
  - Node.js
  - Express
  - Mongoose
  - MongoDB

## Installation and Setup

### Prerequisites

Make sure you have the following installed:

- Node.js and npm: [Install Node.js](https://nodejs.org/)
- MongoDB: [Install MongoDB](https://docs.mongodb.com/manual/installation/)
