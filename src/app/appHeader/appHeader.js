(function () {
    'use strict';

    angular
        .module('app.header')
        .directive('appHeader', AppHeader);


    /* @ngInject */
    function AppHeader() {
        return {
            restrict: 'A',
            templateUrl: 'app/appHeader/appHeader.html',
            scope: {
                searchStr: '='
            },
            controller: HeaderCtrl,
            controllerAs: 'vm'
        };
    }

    /* @ngInject */
    function HeaderCtrl($state, AuthenticationService, $firebaseAuth) {
        const vm = this;
        vm.logout = logout;
        vm.getFullName = getFullName;

        activate();

        function activate() {
			$firebaseAuth().$onAuthStateChanged(function(user) {
				vm.loggedUserObject = user ? user : null;
            });
        }

        function logout() {
			$firebaseAuth().$signOut();
            AuthenticationService.ClearCredentials();
            $state.go('login');
        }

        function getFullName() {
            return vm.loggedUserObject.email;
        }

    }

})();