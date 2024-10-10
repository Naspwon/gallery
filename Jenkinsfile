pipeline{
    agent any
    tools{
        nodejs "node"
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
        stage('Build application'){
            steps{
                sh 'nohup npm start &'
                sleep 10
                sh 'curl -I http://localhost:5000 || exit 1'
            }
        }
        stage('Test Application'){
            steps{
                echo "Tested Successfully"
            }
        }
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
}