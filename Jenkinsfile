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
        stage('Test code'){
            steps{
                echo "Tested successfully..."
            }
        }
        stage('Build application'){
            steps{
                sh 'nohup npm start &'
                sleep 10
                sh 'curl -I http://localhost:5000 || exit 1'
            }
        }
    }
}