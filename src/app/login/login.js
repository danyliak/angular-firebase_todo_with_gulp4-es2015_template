(function () {
    'use strict';

    angular
        .module('app.login')
        .directive('appLogin', appLogin);

    /* @ngInject */
    function appLogin() {
        return {
            restrict: 'E',
            templateUrl: 'app/login/login.html',
            replace: true,
            scope: {},
            controller: LoginCtrl,
            controllerAs: 'vm'
        };
    }

    /* @ngInject */
    function LoginCtrl(AuthenticationService, $state) {
        const vm = this;
        vm.login = login;
        vm.onFieldChange = onFieldChange;
		vm.errorLoginMessage = null;
        vm.activate = activate;

        vm.activate();

        function activate() {
            AuthenticationService.ClearCredentials();
        }

        function onFieldChange() {
			vm.errorLoginMessage = null;
		}

        function login() {
			vm.errorLoginMessage = null;
            vm.dataLoading = true;
			AuthenticationService.Login(vm.username, vm.password)
				.then( user => AuthenticationService.SetCredentials(user).then(() => $state.go('home')) )
				.catch( error => {
					vm.errorLoginMessage = error.message;
					vm.dataLoading = false;
				});
        }
    }

})();