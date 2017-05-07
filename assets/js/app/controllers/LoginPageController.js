module.exports = function(module) {
	'use strict';
	/**
	 * @ndoc controller
	 * @name webApp.controller:LoginPageController
	 *
	 * @description
	 * controller for main page.
	 */
	module
	.controller('LoginPageController', LoginPageController);
	 LoginPageController.$inject = ['$scope', '$interval', '$state', '$localStorage', '$sessionStorage'];
    function LoginPageController($scope, $interval, $state, $localStorage, $sessionStorage) {
		/**
 		 * @ngdoc property
 		 * @name vm
 		 *
 		 * @description
 		 * vm is an instance of the current controller.
		 	 */
 		var vm = this;
		vm.checkLogin = checkLogin;
		vm.checkIfLogin = checkIfLogin;
		vm.loginData = {};

		function checkIfLogin() {
			if ($localStorage.login) {
				$state.go("chat");
			}
		};

		vm.checkIfLogin();

		function checkLogin() {
			var login = vm.loginData.name;
			$localStorage.login = login;
			console.log($localStorage.login);
			$state.go("chat");
		}
	}
};
