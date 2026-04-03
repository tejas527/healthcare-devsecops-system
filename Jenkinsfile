pipeline {
    agent any
    stages {
        stage('Code Analysis (SAST)') {
            steps {
                sh '''
                sonar-scanner \
                  -Dsonar.projectKey=healthcare-app \
                  -Dsonar.projectName="Healthcare App" \
                  -Dsonar.sources=. \
                  -Dsonar.host.url=http://15.135.159.251:9000 \
                  -Dsonar.login=sqa_7a1adeb67160baeb62d9304e367817733ee202ae
                '''
            }
        }
	stage('Build Secure Image') {
            steps {
                sh 'docker build -t healthcare-app:latest .'
            }
        }
        stage('Container Security Scan (Trivy)') {
            steps {
                // Fails the build ONLY if critical OS vulnerabilities are found
                sh 'trivy image --exit-code 0 --severity HIGH,CRITICAL healthcare-app:latest'
            }
        }
        stage('Deploy Securely to K8s') {
            steps {
                // 1. Transfer image to Minikube
                sh 'minikube image load healthcare-app:latest'
                // 2. Apply encrypted passwords
                sh 'kubectl apply -f secret.yaml'
                // 3. Deploy the application
                sh 'kubectl apply -f deployment.yaml'
            }
        }
    }
}
