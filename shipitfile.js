var utils = require('shipit-utils')

module.exports = function (shipit) {
  require('shipit-deploy')(shipit)
  require('shipit-shared')(shipit)

  const deployTo = '/home/applepicke/apps/ethicaltree-web'

  shipit.initConfig({
    default: {
      shared: {
        overwrite: true,
        files: [
          '.env.local'
        ]
      },
      workspace: '/tmp/ethicaltree-web-build',
      deployTo: deployTo,
      repositoryUrl: 'git@github.com:applepicke/ethicaltree-web.git',
      keepReleases: 5,
      branch: 'master',
      ignores: ['.git', 'node_modules'],
      deleteOnRollback: false,
    },
    production: {
      servers: 'applepicke@beta.ethicaltree.com'
    }
  })

  shipit.task('syncBuild', function () {
    shipit.remoteCopy('./build', deployTo + '/current')
  })

  // build everything up with webpack
  shipit.task('build', function () {
    shipit.local('npm run build').then(function () {
      shipit.emit('built')
    })
  })

  // then deploy to server
  shipit.on('built', function () {
    shipit.start('deploy')
  })

  // then copy build directory
  shipit.on('deployed', function () {
    shipit.start('syncBuild')
  })

}
