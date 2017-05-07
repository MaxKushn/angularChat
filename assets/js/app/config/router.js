module.exports = function(module) {
  "use strict";

module
.config(config);

function config($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');
  $stateProvider
			.state('login', {
				url: '/login',
				templateUrl: '/assets/templates/login.html',
				controller: 'LoginPageController',
				controllerAs: 'vm'
			})
			.state('chat', {
				url: '/',
				templateUrl: '/assets/templates/chat.html',
				controller: 'ChatController',
				controllerAs: 'vm'
			})
		};
};
