# RecipeBox

RecipeBox is a modern recipe management application built with React, Tailwind CSS, and Mongoose. It allows users to easily search, view, and add new recipes, providing a seamless and enjoyable cooking experience.

![recipebox wallpaper](/staff/angel-patino/project/images/wallpaper.jpg)

## Functional

### Use cases

### User

- **Register User**: Users can create a new account.
- **Login User**: Users can log in to their account.
- **View Recipes**: Users can browse and view recipes.
- **Upload Recipes**: Users can upload new recipes.
- **Edit Your Recipes**: Users can edit their own recipes.
- **View Others' Profiles**: Users can view profiles of other users.
- **Follow Other Users**: Users can follow other users to keep track of their recipes.
- **Rating**: Users can rating others recipes.

## Features

- **View Recipes**: Browse through a curated list of recipes with all necessary details.
- **Add Recipes**: Users can contribute by adding their own recipes.
- **Edit Recipes**: Users can edit their own recipes.
- **User-Friendly Interface**: Designed with Tailwind CSS for a clean and responsive user experience.
- **Robust Backend**: Utilizes Express and Mongoose to handle CRUD operations with a MongoDB database.
- **User Profiles**: View other users' profiles.
- **Follow Users**: Follow other users to stay updated with their recipes.

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
- profilePicture (string)?
-

#### Recipes

- id (auto)
- author (user.id)
- link(string)
- source(string)
- title (string, required)
- thumbnail (string, required)
- date(date, required)
- Ingredients (string, required)
- Instructions (string, required)
- rating (number, required)
- cookTime (number, required)

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
