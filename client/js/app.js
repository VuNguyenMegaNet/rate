angular
  .module('app', [
    'ui.router',
    'lbServices',
    'ngTouch',
    'ui.grid',
    'ui.grid.pagination',
    'ui.grid.moveColumns',
    'ui.grid.expandable',
    'ui.grid.pinning',
    'ui.grid.resizeColumns'
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
    $urlRouterProvider.otherwise('location');
  }])
  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      // redirect to login page if not logged in
    });
  }]);
