# Git Name

This application generates branch and commit names from a feature name and number, following specific rules.

## Project Setup

### Using Docker

1. Build the Docker image:

   ```bash
   docker build -t git-name-image .
   ```

2. Run the Docker Compose:

   ```bash
   docker compose up
   ```

   Url: [http://localhost:7890/](http://localhost:7890/).

### Without Docker

1. Install project dependencies:

   ```bash
   yarn install
   ```

2. Run the development server:

   ```bash
   yarn run dev
   ```

   Url: What appears on the console
