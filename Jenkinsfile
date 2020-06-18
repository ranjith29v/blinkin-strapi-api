node {
// Defining Variables

  def dockerRegistry = 'docker-registry.blinkin.io'

    stage ('Checkout') {
    checkout scm
    }

  stage ('Build and Push Docker Image')
      {
    withDockerRegistry(credentialsId: 'docker-registry', url: 'https://docker-registry.blinkin.io') {
      def image1 = docker.build("${dockerRegistry}/strapi-development:v1", '--file docker/Dockerfile .')
      image1.push()
    }
      }

  withCredentials( [sshUserPrivateKey( credentialsId: 'blinkin-strapi', keyFileVariable: 'SSH_KEY', passphraseVariable: '', usernameVariable: 'USERNAME')])
{
    stage('Pull and Deploy Docker Image')
  {
      sh 'scp -i ${SSH_KEY} ./docker/docker-compose.yml ${USERNAME}@15.206.226.142:/home/docker'
      sh '''
          ssh -i ${SSH_KEY} ${USERNAME}@15.206.226.142
          mv /home/docker/strapi/docker-compose.yml /home/docker/strapi/docker-compose.yml_bkp
          mv /home/docker-compose.yml /home/docker/strapi/docker-compose.yml
          docker pull docker-registry.blinkin.io/strapi-development:v1
          docker images
          docker-compose -f /home/docker/strapi/docker-compose.yml down
          sleep 5
          docker-compose -f /home/docker/strapi/docker-compose.yml up -d
          docker ps
          exit'''
  }
}
}

def Properties getProperties(filename) {
  def properties = new Properties()
  properties.load(new StringReader(readFile(filename)))
  return properties
}

@NonCPS
def jsonParse(def json) {
  new groovy.json.JsonSlurperClassic().parseText(json)
}
