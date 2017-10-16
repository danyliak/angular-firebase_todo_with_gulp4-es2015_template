(function () {
    'use strict';

    angular
        .module('app.register')
        .directive('appRegister', appRegister);

    /* @ngInject */
    function appRegister() {
        return {
            restrict: 'E',
            templateUrl: 'app/register/register.html',
            replace: true,
            scope: {},
            controller: RegisterCtrl,
            controllerAs: 'vm'
        };
    }

    /* @ngInject */
    function RegisterCtrl(UserService, $uibModal) {
        const vm = this;
		vm.errorLoginMessage = null;
        vm.register = register;
		vm.onFieldChange = onFieldChange;

        function register() {
            vm.dataLoading = true;
			vm.errorLoginMessage = null;

            UserService.CreateUser(vm.user)
                .then( user => {
                    vm.user = {};
                    vm.welcomeUserName = user.email;
                    vm.registerForm.$setPristine();
                    vm.dataLoading = false;
                    openWelcomeModal();
                })
                .catch( error => {
                    vm.errorLoginMessage = error.message;
                    vm.dataLoading = false;
                });
        }


        function openWelcomeModal() {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/register/welcome.modal.html',
                controller: OpenWelcomeModalCtrl,
                controllerAs: 'vm',
                resolve: {
                    userName: () => vm.welcomeUserName
                }
            });

            /* @ngInject */
            function OpenWelcomeModalCtrl($location, $uibModalInstance, userName) {
                const vm = this;
                vm.userName = userName;
                vm.cancelModal = cancelModal;
                vm.goTo = goTo;

                function cancelModal() {
                    $uibModalInstance.close(false);
                }

                function goTo(url) {
                    vm.cancelModal();
                    $location.path(url);
                }
            }
        }

		function onFieldChange() {
			vm.errorLoginMessage = null;
		}
    }

})();