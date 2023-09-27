# React Blog Application

Welcome to the React Blog Application! This project is a full-fledged blogging platform that allows users to create, publish, update, and delete their own blog posts through an open API with the support of markdown. The application is built using React and utilizes custom Webpack configurations. It is thoroughly tested using Playwright for end-to-end testing and Jest for unit testing. Additionally, it leverages Redux slices for state management, making it a robust and efficient solution for managing application data.

## Features

- **User-Friendly Blogging**: Users can easily create and manage their own blog posts.

- **User Authentication:** The application uses a custom HTTP client to authorize access via tokens. Users can log in to obtain an access token, which is automatically handled by the HTTP client for further interactions with the API.

- **Custom API Client:** An Axios-based API client is implemented to communicate with the backend server. Each API schema has its own dedicated file, and the Zod library is used for schema validation and parsing.

- **Playwright Tests**: Robust Playwright tests ensure the reliability and functionality of the application.

- **React Components**: The project uses React components for a dynamic and responsive user interface.

- **Custom Webpack Configurations**: Tailored Webpack configurations.

- **State Management with Redux Slices:** Instead of traditional reducers and actions, Redux slices are used for managing application state. This results in cleaner, more maintainable code and reduces boilerplate.

- **Authentication**: Access to the API is authorized using access tokens generated via a dedicated HTTP client.

- **Zod Schemas**: Each schema, stored in its own file, utilizes the Zod library for schema definition and parsing.

- **Responsive Design:** The application's user interface is styled using Tailwind CSS, ensuring a responsive and visually appealing design across various devices.

- **Page-Based Architecture:** All pages are organized in a dedicated folder, promoting a structured and modular codebase.

- **Optimistic Updates:** When interacting with certain features like upvoting, downvoting, and adding comments, the application provides an optimistic update experience. While the API may return errors (TODO), the UI gracefully updates to reflect the user's actions temporarily.

- **Custom Hooks:** Custom hooks are used for various functionalities, including user login, image upload and deletion, and fetching articles and comments.

- **Secure**: Authorization tokens are passed automatically for further updates and interactions.

- **Environment Variables**: The project uses an `.env` file to securely store API keys and other environment-specific configuration.

![Alt text](public/mainPage.png?raw=true "App Overview")

## Getting Started

Follow these steps to get the project up and running:

### Prerequisites

- Node.js (>=14.0.0)

- Git

### Installation

1. Clone the repository:

```bash

git clone https://github.com/bananekis/react-blog-app.git

```

2. Navigate to the project directory:

```bash

cd react-blog-app

```

3. Install the dependencies:

```bash

npm install

```

### Configuration

1. Create an `.env` file in the project root directory.

2. Add your API key to the `.env` file:

```

REACT_APP_API_KEY=your_api_key_here

```

3. Use and follow more instructions about open API in .env.sample BASE_URL

### Usage

Start the development server:

```bash

npm start

```

The application will be accessible at `http://localhost:3000`.

### Running Tests

Execute Jest tests:

```bash

npm test

```

Run Playwright tests:

```bash

npm run playwright

```

### Additional Scripts

- Lint and automatically fix code:

```bash

npm run lint-fix

```
