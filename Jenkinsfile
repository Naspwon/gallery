pipeline{
    agent any
    tools{
        nodejs "node"
    }
    environment {
        // Define your Slack channel and credentials
        SLACK_CHANNEL = 'C07RDNTPQKC'
        SLACK_CREDENTIALS_ID = 'SLACK_GALLERY'
    }
    stages{
        stage('Clone Repo'){
            steps{
                git(
                    url: 'https://github.com/Naspwon/gallery.git',
                    branch: 'master'
                )
            }
        }
        stage('Install dependencies'){
            steps{
                sh 'npm install'
            }
        }
        stage('Run tests'){
            steps{
                sh 'npm test'
            }
        }
        stage('Build application'){
            steps{
                sh 'nohup npm start &'
                sleep 10
                sh 'curl -I http://localhost:5000 || exit 1'
            }
        }
        // stage('Install NPM dependencies'){
        //     steps{
        //         sh 'npm install'
        //     }
        // }
        // stage('Test Application'){
        //     steps{
        //         // Start the application on port 5001 for testing
        //         sh 'PORT=5001 nohup npm start &'
        //         sleep 10 // Wait for the app to start
        //         sh 'curl -I http://localhost:5001 || exit 1' // Check if the app is running
        //         // Run tests using the hardcoded port 5001
        //         sh 'npm test -- --port=5001'
        //     }
        // }
        stage('Deploy to Heroku'){
            steps{
                withCredentials([usernameColonPassword(credentialsId: 'HEROKU_API_KEY', variable: 'HEROKU_CREDENTIALS')]){
                    sh 'git push https://${HEROKU_CREDENTIALS}@git.heroku.com/gallery.git master'
                }
            }
        }
        stage('Deploy to Render'){
            steps{
                withCredentials([string(credentialsId: 'RENDER_API_KEY', variable: 'RENDER_API_KEY')]){
                    sh """
                        curl -X POST https://api.render.com/v1/services/srv-cs42h1qj1k6c73dlpga0/deploys \
                        -H "Authorization: Bearer $RENDER_API_KEY" \
                        -H "Content-Type: application/json" \
                        -d '{
                            "branch": "master"
                        }'
                    """
                }
            }
        }
    }
    // post {
    //     success {
    //         echo "Sending success message to Slack: Build #${env.BUILD_NUMBER} of '${env.JOB_NAME}' was successful!"
    //         slackSend(channel: SLACK_CHANNEL, message: "Build #${env.BUILD_NUMBER} of '${env.JOB_NAME}' was successful! 🎉 Check it out: ${env.BUILD_URL}", tokenCredentialId: SLACK_CREDENTIALS_ID)
    //     }
    // }


    post{
        success{
            slackSend(channel: SLACK_CHANNEL, message: "Build #${env.BUILD_NUMBER} of '${env.JOB_NAME}' was successful! 🎉 Check it out: ${env.BUILD_URL}", tokenCredentialId: SLACK_CREDENTIALS_ID)
        }
        failure {
            slackSend(channel: SLACK_CHANNEL, message: "Build #${env.BUILD_NUMBER} of '${env.JOB_NAME}' failed. 😞 Please check the logs: ${env.BUILD_URL}", tokenCredentialId: SLACK_CREDENTIALS_ID)
        }
        unstable {
            slackSend(channel: SLACK_CHANNEL, message: "Build #${env.BUILD_NUMBER} of '${env.JOB_NAME}' is unstable. ⚠️ Review the results: ${env.BUILD_URL}", tokenCredentialId: SLACK_CREDENTIALS_ID)
        }
        aborted {
            slackSend(channel: SLACK_CHANNEL, message: "Build #${env.BUILD_NUMBER} of '${env.JOB_NAME}' was aborted. ❌", tokenCredentialId: SLACK_CREDENTIALS_ID)
        }
    }
}