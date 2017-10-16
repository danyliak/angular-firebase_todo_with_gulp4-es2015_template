(function () {
    'use strict';

    angular
        .module('app.header')
        .config(config);

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                template: '<app-login></app-login>'
            })
            .state('register', {
                url: '/register',
                template: '<app-register></app-register>'
            });
    }
})();
