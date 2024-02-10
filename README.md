# Flixify

Welcome to Flixify! Flixify is a web application designed to provide users with a seamless experience for exploring movies, discovering new releases, and managing their favorites and watchlists.

## Table of Contents
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features
- View detailed information about movies, including ratings, runtime, genres, and release date.
- Explore top cast members for each movie.
- Watch trailers for movies directly within the app.
- Add movies to favorites and watchlists for easy access later.
- Receive personalized movie recommendations based on user preferences.

## Setup
To set up the project locally, follow these steps:

1. Clone the repository:

     ```
     git clone https://github.com/your-username/flixify.git
     ```


3. Navigate to the project directory:
   ``
   cd flixify
   ``

### The Movie Database (TMDb)
3. Sign up for The Movie Database (TMDb) account:
- Go to [TMDb website](https://www.themoviedb.org/) and sign up for an account.
- Retrieve your API key from your TMDb account settings.

4. Set up environment variables:
- Create a `.env` file in the root directory.
- Add the following environment variable:
  ```
  REACT_APP_TMDB_API_KEY=your-tmdb-api-key
  ```

### Alan AI
5. Sign up for Alan AI account:
- Go to [Alan AI website](https://alan.app/) and sign up for an account.
- Retrieve your Alan AI key from your account dashboard.

6. Set up environment variables:
- Add the following environment variable to the `.env` file:
  ```
  REACT_APP_ALAN_AI_KEY=your-alan-ai-key
  ```

7. Install dependencies:
   ``
   npm install
   ``
9. Start the development server:
    ``
   npm run dev
``

11. Open your web browser and navigate to `http://localhost:5173` to view the app.

## Usage
- Browse through the list of movies on the home page.
- Click on a movie to view more details, including cast members, trailers, and recommendations.
- Use the navigation bar to access different sections of the app, such as favorites and watchlists.
- Enjoy exploring and discovering new movies!

## Dependencies
Flixify relies on the following major dependencies:
- React.js: JavaScript library for building user interfaces.
- Material-UI: React UI framework for designing responsive web applications.
- Redux: State management library for managing application state.
- Axios: Promise-based HTTP client for making API requests.
- React Router: Routing library for handling navigation in React applications.
- Alan AI: Used for voice assisstence in React applications.

For a complete list of dependencies, refer to the `package.json` file in the project directory.

## Contributing
Contributions are welcome! If you'd like to contribute to Flixify, please follow these guidelines:
- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes and ensure they adhere to the project's coding style and guidelines.
- Test your changes thoroughly.
- Submit a pull request with a clear description of your changes.

## License
This project is licensed under the MIT License.




