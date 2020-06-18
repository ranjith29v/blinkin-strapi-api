node {
// Defining Variables

  def webPath = '/home/docker/strapi/'
  def dockerRegistry = 'docker-registry.blinkin.io'
  def remote = [:]
  remote.name = 'blinkin-strapi'
  remote.host = '15.206.226.142'

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
    remote.user = USERNAME
    remote.identityFile = SSH_KEY
    remote.allowAnyHosts = true

    stage('Pull and Deploy Docker Image')
  {
      sshCommand remote: remote, command: "docker pull ${dockerRegistry}/strapi-development:v1 ; docker images"
      sshPut remote: remote, from: './docker/docker-compose.yml', into: "${webPath}"
      sshCommand remote: remote, command: "docker-compose -f $webPath/docker-compose.yml down; sleep 5; docker-compose -f $webPath/docker-compose.yml up -d ; docker ps"
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
