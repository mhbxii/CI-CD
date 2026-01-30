pipeline {
    agent any
    
    environment {
        PATH = "/usr/bin:/bin:/usr/local/bin"
        // Docker images
        BACKEND_IMAGE = 'todo-backend:latest'
        FRONTEND_IMAGE = 'todo-frontend:latest'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from repository...'
                checkout scm
            }
        }
        
        stage('Build & Test Backend') {
            steps {
                echo 'Building and testing Spring Boot backend...'
                dir('backend') {
                    sh '''
                        chmod +x mvnw
                        ./mvnw clean test
                    '''
                }
            }
            post {
                always {
                    junit 'backend/target/surefire-reports/*.xml'
                }
            }
        }
        
        stage('Build & Test Frontend') {
            steps {
                echo 'Building and testing React frontend...'
                dir('frontend') {
                    sh '''
                        which npm || true
                        ls -l /usr/bin/npm
                        /usr/bin/npm ci
                        /usr/bin/npm test
                    '''
                }
            }
        }
        
        stage('Build Docker Images') {
            parallel {
                stage('Build Backend Image') {
                    steps {
                        echo 'Building backend Docker image...'
                        dir('backend') {
                            sh "docker build -t ${BACKEND_IMAGE} ."
                        }
                    }
                }
                stage('Build Frontend Image') {
                    steps {
                        echo 'Building frontend Docker image...'
                        dir('frontend') {
                            sh "docker build -t ${FRONTEND_IMAGE} ."
                        }
                    }
                }
            }
        }
        
        stage('Deploy with Docker Compose') {
            steps {
                echo 'Deploying application with Docker Compose...'
                sh '''
                    docker-compose down || true
                    docker-compose up -d
                '''
            }
        }
        
        stage('Health Check') {
            steps {
                echo 'Performing health checks...'
                script {
                    // Wait for backend to be healthy
                    sh '''
                        echo "Waiting for backend to be healthy..."
                        for i in $(seq 1 30); do
                            if curl -f http://localhost:8080/actuator/health > /dev/null 2>&1; then
                                echo "Backend is healthy!"
                                break
                            fi
                            echo "Attempt $i: Backend not ready yet..."
                            sleep 5
                        done
                    '''
                    
                    // Check frontend
                    sh '''
                        echo "Checking frontend..."
                        for i in $(seq 1 10); do
                            if curl -f http://localhost:3000 > /dev/null 2>&1; then
                                echo "Frontend is accessible!"
                                break
                            fi
                            echo "Attempt $i: Frontend not ready yet..."
                            sleep 3
                        done
                    '''
                }
            }
        }
    }
    
    post {
        success {
            echo '''
            ═══════════════════════════════════════════════════
            ✅ DEPLOYMENT SUCCESSFUL - Release 1.0
            ═══════════════════════════════════════════════════
            📱 Frontend:    http://localhost:3000
            🔧 Backend:     http://localhost:8080/api/todos
            💓 Health:      http://localhost:8080/actuator/health
            📊 Prometheus:  http://localhost:9090
            📈 Grafana:     http://localhost:3001 (admin/admin)
            ═══════════════════════════════════════════════════
            '''
        }
        failure {
            echo '❌ Pipeline failed. Check the logs above for details.'
        }
        always {
            echo 'Pipeline execution completed.'
        }
    }
}
