# 🌊 TaskFlow

**Elevate your productivity with a modern, full-stack Todo Management System.**

TaskFlow is a premium task management application featuring a glassmorphism SPA frontend and a robust Spring Boot REST API.

---

## ✨ Key Features
- **Modern UI**: Minimalist design with soft animations and responsive layout.
- **RESTful API**: Standard-compliant endpoints for full task lifecycle management.
- **Data Integrity**: persistence with MySQL and built-in Jakarta validation.
- **Automated Timestamps**: Seamless tracking of task creation and updates.

---

## 🛠️ Tech Stack
| Tier | Technology |
| :--- | :--- |
| **Frontend** | Vanilla JS, CSS3 (Modern Flex/Grid), Lucide Icons |
| **Backend** | Java 21, Spring Boot 3, Spring Data JPA |
| **Database** | MySQL 8.4 Server |
| **Build** | Maven 3.9.12 |

---

## 🚀 Quick Start

### 1. Database Setup
Ensure MySQL is running and create the database:
```sql
CREATE DATABASE todo_db;
```

### 2. Configuration & Dynamic Environment Variables
TaskFlow is designed with **modern DevOps principles** in mind. It uses dynamic substitution via `${VARIABLE_NAME:DEFAULT_VALUE}` syntax. This means you can override any setting at runtime without changing the code.

#### Key Variables
| Variable | Description | Default Value |
| :--- | :--- | :--- |
| `DB_HOST` | Database Hostname | `localhost` |
| `DB_PORT` | Database Port | `3306` |
| `DB_NAME` | Database Name | `todo_db` |
| `SPRING_DATASOURCE_USERNAME`| Database Username | `root` |
| `SPRING_DATASOURCE_PASSWORD`| Database Password | `root` |
| `PORT` | Web Server Port | `8080` |

#### Three Ways to Pass Variables Dynamically:
1. **Environment Variables** (Recommended for Docker/Cloud):
   ```bash
   export DB_HOST="db_host"
   export DB_NAME="db_name"
   ```
2. **Command Line Arguments** (Java System Properties):
   ```bash
   java -DDB_HOST=db_host -DDB_NAME=db_name -jar app.jar
   ```
3. **Kubernetes Pod Spec** (Native K8s way):
   Pass variables via the `env` section in your deployment manifest.

---

### 📦 Kubernetes Deployment Guide (Cloud Native)

For Kubernetes, your deployment manifest should look like this to ensure the image is **stateless and portable**:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: taskflow-app
spec:
  template:
    spec:
      containers:
      - name: taskflow
        image: chjoshkumar/java-springboot-proj:latest
        env:
        - name: DB_HOST
          value: "mysql-service" # Internal K8s DNS
        - name: DB_NAME
          value: "todo_prod"
        - name: SPRING_DATASOURCE_USERNAME
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: username
        - name: SPRING_DATASOURCE_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: password
```

---

### 3. Run the Application
```bash
# Optional: Set environment variables (Windows PowerShell example)
$env:SPRING_DATASOURCE_PASSWORD="your_password"

mvn clean install -DskipTests
mvn spring-boot:run
```

### 3. Access
- **Dashboard UI**: [http://localhost:8080/](http://localhost:8080/)
- **REST API**: [http://localhost:8080/api/tasks](http://localhost:8080/api/tasks)

---

## 🔌 API Reference

| Method | Endpoint | Description | Status |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/tasks` | Create a new task | 201 |
| `GET` | `/api/tasks` | Retrieve all tasks | 200 |
| `GET` | `/api/tasks/{id}` | Get task by specific ID | 200 |
| `PUT` | `/api/tasks/{id}` | Update task details | 200 |
| `PATCH` | `/api/tasks/{id}/complete` | Mark task as completed | 200 |
| `DELETE` | `/api/tasks/{id}` | Permanently delete task | 204 |

---

---

## 🏗️ DevOps & Deployment Guide

Since you're learning DevOps, here's a structured guide on how to configure and deploy this application.

### 1. Environment Variables (The 12-Factor Way)
In DevOps, we follow the [12-Factor App](https://12factor.net/config) principle: **Store config in the environment**. 

This application is pre-configured to look for these environment variables. If they aren't found, it defaults to `localhost` settings for development.

#### How to set them:
- **Windows (PowerShell)**:
  ```powershell
  $env:SPRING_DATASOURCE_URL="jdbc:mysql://your-db-host:3306/todo_db"
  $env:SPRING_DATASOURCE_USERNAME="admin"
  $env:SPRING_DATASOURCE_PASSWORD="securepassword"
  ```
- **Linux/macOS (Bash/Zsh)**:
  ```bash
  export SPRING_DATASOURCE_URL="jdbc:mysql://your-db-host:3306/todo_db"
  export SPRING_DATASOURCE_USERNAME="admin"
  export SPRING_DATASOURCE_PASSWORD="securepassword"
  ```

### 2. GitHub Integration
1. **Initialize Git**: `git init`
2. **Add Files**: `git add .` (The `.gitignore` I created will skip binary and sensitive files).
3. **Commit**: `git commit -m "feat: add task modification and devops readiness"`
4. **Push**:
   ```bash
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```

---

---

## ☸️ Kubernetes Deployment Tutorial (3-Tier Microservices)

This section provides a step-by-step guide to deploying TaskFlow as a professional 3-tier architecture (Frontend, Backend, Database) on a Kubernetes cluster (e.g., Minikube, Kind, or DigitalOcean/AWS).

### 🛠️ Prerequisites
1.  **A Kubernetes Cluster**: [Minikube](https://minikube.sigs.k8s.io/docs/start/) or [Docker Desktop K8s](https://docs.docker.com/desktop/kubernetes/) enabled.
2.  **kubectl**: The Kubernetes command-line tool.
3.  **Docker Hub Account**: To host your microservice images.

---

### Phase 1: Dockerize & Push (The Images)
Before deploying, you must build the Docker images for your Frontend and Backend.

#### 1. Backend API (Spring Boot)
- **File**: Create a `Dockerfile` in the root (using `eclipse-temurin:21-jre`).
- **Build**: `docker build -t <your-username>/taskflow-backend:v1 .`
- **Push**: `docker push <your-username>/taskflow-backend:v1`

#### 2. Frontend UI (Nginx)
- **File**: Create a `Dockerfile` in `src/main/resources/static`.
- **Build**: `docker build -t <your-username>/taskflow-frontend:v1 .`
- **Push**: `docker push <your-username>/taskflow-frontend:v1`

---

### Phase 2: Deploy to Cluster (The Manifests)

Follow this **exact order** to ensure services can find each other:

#### Step 1: Create Namespace & Configuration
Initialize the environment with Secrets and ConfigMaps.
```bash
kubectl apply -f k8s/config.yaml
```
*   **Verification**: `kubectl get secrets,cm`

#### Step 2: Deploy Database (MySQL)
Deploy the persistent storage layer.
```bash
kubectl apply -f k8s/mysql.yaml
```
*   **Verification**: `kubectl get pods -l app=mysql` (Wait until Status is `Running`).

#### Step 3: Deploy Backend API
Deploy the business logic. It will automatically connect to the `mysql-service`.
```bash
kubectl apply -f k8s/backend.yaml
```
*   **Verification**: `kubectl get pods -l app=backend`

#### Step 4: Deploy Frontend UI
Deploy the user interface.
```bash
kubectl apply -f k8s/frontend.yaml
```
*   **Verification**: `kubectl get pods -l app=frontend`

---

### Phase 3: Access & Verify

#### Way 1: Port Forwarding (Quick Test)
Run this to access the app on your local machine:
```bash
# Access Frontend
kubectl port-forward svc/frontend-service 8080:80
```
Then visit: [http://localhost:8080/](http://localhost:8080/)

#### Way 2: LoadBalancer (Cloud only)
If you are on AWS/GCP, the `frontend-service` will get an `EXTERNAL-IP`.
```bash
kubectl get svc frontend-service
```

---

### 🛡️ K8s Cluster POV Best Practices
- **Namespace Isolation**: Deploy to a dedicated namespace (`kubectl create ns todo-app`) instead of `default`.
- **Scaling**: Increase replicas for the backend: `kubectl scale deployment backend --replicas=3`.
- **Auto-healing**: Delete a backend pod (`kubectl delete pod <backend-name>`) and watch Kubernetes automatically create a new one to maintain the replica count.

---

## 📁 Project Structure
```text
src/main/
├── java/com/example/todo/
│   ├── controller/      # REST Endpoints
│   ├── service/         # Business Logic
│   ├── repository/      # Data Access
│   └── model/           # JPA Entities & DTOs
└── resources/
    ├── static/          # Frontend (HTML, CSS, JS)
    └── application.properties # Environment-ready config
```

---

<details>
<summary><b>Installation Guides (Win/Mac/Linux)</b></summary>

### Windows
`winget install Oracle.MySQL`

### Ubuntu/Debian
`sudo apt install mysql-server`

### macOS
`brew install mysql`
</details>
