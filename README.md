# Todo App - CI/CD Learning Project

## 🎯 Project Overview

A three-tier web application (Frontend + Backend + Database) built to learn and practice CI/CD pipelines with Jenkins, Docker, and monitoring tools.

**Current Version:** Release 1.0 - CREATE & READ functionality

## 🏗️ Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   React     │─────▶│ Spring Boot │─────▶│   MySQL     │
│  Frontend   │      │   Backend   │      │  Database   │
│   (Port 3000)│      │  (Port 8080)│      │ (Port 3306) │
└─────────────┘      └─────────────┘      └─────────────┘
                            │
                            ▼
                     ┌─────────────┐
                     │ Prometheus  │
                     │ (Port 9090) │
                     └──────┬──────┘
                            │
                            ▼
                     ┌─────────────┐
                     │   Grafana   │
                     │ (Port 3001) │
                     └─────────────┘
```

## 📋 Features - Release 1.0

- ✅ **CREATE**: Add new todos with title and description
- ✅ **READ**: View all todos in a list
- ✅ Full test coverage (JUnit, Mockito, Jest, React Testing Library)
- ✅ Dockerized deployment
- ✅ Prometheus metrics collection
- ✅ Grafana monitoring dashboards
- ✅ Automated CI/CD pipeline with Jenkins

## 🚀 Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- MySQL 8.0
- JUnit 5 & Mockito
- Maven

### Frontend
- React 18
- Axios
- Jest & React Testing Library

### DevOps
- Docker & Docker Compose
- Jenkins (Pipeline as Code)
- Prometheus
- Grafana

## 🛠️ Prerequisites

- Java 17
- Node.js 18+
- Docker & Docker Desktop
- Jenkins (with Docker installed)
- Git

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd todo-app
```

### 2. Configure Jenkins

1. Install Jenkins with Docker support
2. Create a new Pipeline job
3. Point to your GitHub repository
4. Configure SCM polling (e.g., `H/5 * * * *` for every 5 minutes)
5. Set Pipeline script from SCM
6. Specify `Jenkinsfile` as the script path

### 3. Run Locally (Without Jenkins)

#### Option A: Using Docker Compose (Recommended)

```bash
# Build and start all services
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

#### Option B: Manual Setup

**Backend:**
```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

**Database:**
```bash
docker run -d \
  --name todo-mysql \
  -e MYSQL_ROOT_PASSWORD=rootpass \
  -e MYSQL_DATABASE=tododb \
  -e MYSQL_USER=todouser \
  -e MYSQL_PASSWORD=todopass \
  -p 3306:3306 \
  mysql:8.0
```

## 🧪 Running Tests

### Backend Tests (JUnit + Mockito)
```bash
cd backend
./mvnw test
```

### Frontend Tests (Jest + RTL)
```bash
cd frontend
npm test
```

## 📊 Accessing the Application

After deployment:

| Service | URL | Credentials |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | - |
| **Backend API** | http://localhost:8080/api/todos | - |
| **Health Check** | http://localhost:8080/actuator/health | - |
| **Prometheus** | http://localhost:9090 | - |
| **Grafana** | http://localhost:3001 | admin/admin |

## 🔄 CI/CD Pipeline

The Jenkins pipeline executes the following stages:

1. **Checkout** - Pull latest code from GitHub
2. **Build & Test Backend** - Maven build + JUnit tests
3. **Build & Test Frontend** - npm install + Jest tests
4. **Build Docker Images** - Create backend and frontend images (parallel)
5. **Deploy** - Start services with Docker Compose
6. **Health Check** - Verify all services are running

**Trigger:** SCM polling (checks GitHub every 5 minutes)

## 📈 Monitoring

### Prometheus Metrics
- HTTP request rate
- Response times
- Error rates
- JVM metrics (memory, threads, CPU)

### Grafana Dashboards
Pre-configured dashboard includes:
- Request rate graph
- Average response time gauge
- HTTP status code distribution
- CPU usage

## 🗂️ Project Structure

```
todo-app/
├── backend/                 # Spring Boot backend
│   ├── src/
│   │   ├── main/java/com/todo/
│   │   │   ├── controller/
│   │   │   ├── service/
│   │   │   ├── repository/
│   │   │   └── model/
│   │   └── test/java/com/todo/
│   ├── Dockerfile
│   └── pom.xml
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.js
│   │   └── App.test.js
│   ├── Dockerfile
│   └── package.json
├── prometheus/
│   └── prometheus.yml
├── grafana/
│   └── provisioning/
├── docker-compose.yml
├── Jenkinsfile
└── README.md
```

## 🔮 Roadmap

- **Release 2.0** - UPDATE functionality
- **Release 3.0** - DELETE functionality
- **Future** - Add SonarQube code quality analysis

## 🐛 Troubleshooting

### Backend won't start
- Check MySQL is running: `docker ps | grep mysql`
- Verify database connection in `application.properties`

### Frontend can't reach backend
- Ensure backend is running on port 8080
- Check CORS configuration in `TodoController.java`

### Jenkins pipeline fails
- Verify Docker is accessible to Jenkins
- Check Jenkins has proper permissions
- View build logs for specific errors

## 📝 API Endpoints

### GET /api/todos
Get all todos
```bash
curl http://localhost:8080/api/todos
```

### POST /api/todos
Create a new todo
```bash
curl -X POST http://localhost:8080/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"My Todo","description":"Description here"}'
```

## 📄 License

This is a learning project - feel free to use and modify!

## 🙏 Acknowledgments

Built as a hands-on CI/CD learning project covering:
- Jenkins pipeline automation
- Docker containerization
- Spring Boot + React development
- Test-driven development
- Monitoring with Prometheus & Grafana
# new Test CI/CD with Kustomize
