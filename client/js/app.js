angular
  .module('app', [
    'ui.router',
    'lbServices'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('users', {
        url: '/users',
        templateUrl: 'views/users/users.html',
        controller: 'UsersCtrl'
      })
      .state('rates', {
        url: '/rates',
        templateUrl: 'views/rates/rates.html',
        controller: 'RatesCtrl'
      });
    $urlRouterProvider.otherwise('users');
  }])
  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      // redirect to login page if not logged in
    });
  }]);
