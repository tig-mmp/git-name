# Git Name

This application generates standardized **branch names** and **commit messages** based on a given feature description and a task/issue number, following a specific naming convention. It's designed to help maintain consistency in version control workflows.

---

## 🧠 What this project does

Given a short **feature description** (e.g., "Add login form") and a **number** (e.g., issue #42), this tool generates:

- A **Git branch name**: `feature/42-add-login-form`
- A **commit message**: `feat(42): Add login form`

This is useful for teams or solo developers who want to follow clean, consistent naming rules.

---

## 📁 Project Structure

- `src/`: Source code
- `Dockerfile`: Defines the container image for running the app
- `docker-compose.yml`: Runs the app using Docker, with networking and volume setup
- `vite.config.js`: Configuration for the Vite development server
- `package.json`: Project dependencies and scripts

---

## 🚀 Running the Project

You have **two options**: using Docker (recommended for consistency), or running it directly on your machine.

---

### 🐳 Option 1: Using Docker

> ✅ Recommended if you want to avoid installing Node.js/Yarn globally.

1. **Make sure Docker is installed and running**.

   - You must have Docker Desktop open and showing "Docker is running".

2. **Build the Docker image** (only needed the first time or after changing dependencies):

   ```bash
   docker build -t git-name-image .
   ```

3. Start the development server using Docker Compose:

   ```bash
   docker compose up
   ```

   - This runs the app inside a container and starts the Vite dev server.

   - The container is called git-name.

   - Your code is live-mounted into the container, so any changes are reflected immediately.

4. Open the app in your browser:

   ```bash
   http://localhost:7890/
   ```

   - The container’s internal Vite server runs on port 5173, but it's exposed as 7890 on your machine.

   - You'll see logs and reloads in the terminal window running Docker.

5. To stop the app:

   - Press Ctrl + C in the terminal window. Or run:

   ```bash
   docker compose down
   ```

---

### 💻 Option 2: Without Docker (Local Development)

> ✅ Use this only if you already have Node.js and Yarn installed.

1. Install project dependencies:

   ```bash
   yarn install
   ```

2. Start the development server:

   ```bash
   yarn run dev
   ```

3. Access the app:

   - Open your browser and go to the URL shown in the console (usually http://localhost:5173/).

   - Vite will hot-reload the app as you edit files.

---

### ⚙️ Technologies Used

- Node.js (LTS)

- Yarn as the package manager

- Vite as the dev server and build tool

- Docker and Docker Compose for isolated development

---

### 🛠️ Useful Docker Commands (for future reference)

- Build the image:

  ```bash
  docker build -t git-name-image .
  ```

- Run the app (if Docker is running and Dockerfile exists):

  ```bash
  docker compose up
  ```

- Stop and remove containers:

  ```bash
  docker compose down
  ```

- See running containers:

  ```bash
  docker ps
  ```
