# Readme

## Prerequisites

To run this project, you need to have Docker and Docker Compose installed on your machine. For installation instructions, refer to the [official Docker documentation](https://docs.docker.com/get-docker/).

## Launching the Project

1. **Clone the repository**: Clone this repository to your local machine.

2. **Navigate to the project directory**: Change into the project's root directory where the `docker-compose.yml` file is located.

3. **Build and start the services**: Run the following command to build and start all the services defined in the `docker-compose.yml` file:
    ```bash
    docker-compose up --build
    ```
    This command builds the images for the services and starts them. The `--build` flag ensures that the images are built with the latest changes in your project.

4. **Accessing the game**: Once all the services are up and running, you can access the game by opening a web browser and navigating to:
    ```
    http://localhost:8080
    ```

5. **Accessing the API documentation**: If the API service is built using a framework like FastAPI, you can access the auto-generated API documentation by navigating to:
    ```
    http://localhost/docs
    ```

## Stopping the Project

To stop and remove the containers, networks, and volumes created by `docker-compose up`, run the following command in the project directory:

```bash
docker-compose down
```
