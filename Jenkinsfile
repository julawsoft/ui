pipeline {
    agent any

    tools {
        nodejs "NODE_JS_16"
    }

    environment {
        scannerHome =  tool 'SONARQUBE_SCANNER'
        SONARQUBE_URL = "${env.SONARQUBE_URL}"
        SONARQUBE_FRONTEND_PROJECT = "${env.SONARQUBE_FRONTEND_PROJECT}"
        SONARQUBE_FRONTEND_LOGIN = "${env.SONARQUBE_FRONTEND_LOGIN}"
    }

    stages {
        stage ('Install Dependencies'){
            steps {
                sh 'npm install -f'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                    withSonarQubeEnv('SONARQUBE_SERVER') {
                        sh "${scannerHome}/bin/sonar-scanner -e \
                            -Dsonar.projectKey=${SONARQUBE_FRONTEND_PROJECT} \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=${SONARQUBE_URL} \
                            -Dsonar.login=${SONARQUBE_FRONTEND_LOGIN}"
                    }
            }
        }
        stage('Quality Gate') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
       
    }

    post {
        success {
            echo 'Build and SonarQube analysis completed successfully!'
        }
        failure {
            echo 'Build or SonarQube analysis failed!'
        }
    }

}
