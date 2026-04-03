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
    }
}
