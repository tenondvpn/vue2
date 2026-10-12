pipeline {
  environment {
    //根据实际情况修改以下变量
    //docker凭证ID
    DOCKER_CREDENTIAL_ID = 'dockerhub-id'
    //k8s凭证ID
    KUBECONFIG_CREDENTIAL_ID = 'kubeconfig-credential-id'
    //git凭证ID
    GIT_CREDENTIAL_ID = 'git'
    //工程的git地址
    GIT_URL= 'http://code.tianhecloud.com:33012/eds/new-eds-frontend-web.git'
    //git分支
    BRANCH_NAME = 'master'
    //harbor地址
    REGISTRY = '192.168.200.210:30002'
    //harbor平台的项目名称或者说命名空间
    DOCKERHUB_NAMESPACE = 'new-eds'
    //kubesphere平台的应用名称
    APP_NAME = 'eds-frontend-vue'
    APP_VERSION = '0.0.1'
    //kubesphere平台的项目名称
    PROJECT_NAME = 'new-eds'
    //邮件信息
    MAIL_TO = '309593586@qq.com'
    MAIL_SUBJECT = '项目：企业空间后台发布'
    MAIL_MSG = '开发环境：企业空间前端门户最新版本发布成功（版本号：'.concat(env.APP_VERSION).concat('-').concat(env.BUILD_NUMBER).concat('）')
  }

  agent {
    node {
      label 'nodejs'
    }

  }
  stages {
    stage('代码拉取') {
      agent none
      steps {
        git(url: GIT_URL, credentialsId: GIT_CREDENTIAL_ID, branch: BRANCH_NAME, changelog: true, poll: false)
      }
    }

    stage('代码编译') {
      steps {
        container('nodejs') {
          sh 'npm install'
          sh 'npm run build'
          sh 'ls -al'
        }

      }
    }

    stage('镜像打包&推送') {
      agent none
      steps {
        container('nodejs') {
          sh 'ls -al'
          sh 'docker build -f ./nginx/Dockerfile -t $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME-$BRANCH_NAME:$APP_VERSION-$BUILD_NUMBER .'
          withCredentials([usernamePassword(credentialsId : DOCKER_CREDENTIAL_ID ,passwordVariable : 'DOCKER_PASSWORD' ,usernameVariable : 'DOCKER_USERNAME' ,)]) {
            sh 'echo "$DOCKER_PASSWORD" | docker login $REGISTRY -u "$DOCKER_USERNAME" --password-stdin'
            sh 'docker push  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME-$BRANCH_NAME:$APP_VERSION-$BUILD_NUMBER'
          }

        }

      }
    }

    stage('部署到k8s') {
      agent none
      steps {
        container('nodejs') {
          withCredentials([kubeconfigContent(credentialsId : KUBECONFIG_CREDENTIAL_ID ,variable : 'KUBECONFIG_CONFIG' ,)]) {
            sh 'mkdir -p ~/.kube/'
            sh 'echo "$KUBECONFIG_CONFIG" > ~/.kube/config'
            sh 'envsubst < ./nginx/deploy.yaml | kubectl apply -f -'
          }

        }

      }
    }

//     stage('邮件发送') {
//       agent none
//       steps {
//         container('maven') {
//           mail(to: MAIL_TO, subject: MAIL_SUBJECT, body: MAIL_MSG)
//         }
//
//       }
//     }
  }
}
