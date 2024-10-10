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
    }
}