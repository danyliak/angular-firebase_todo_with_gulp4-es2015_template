(function () {
    'use strict';

    angular
        .module('app.core')
        .config(config);


    /* @ngInject */
    function config($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                template: '<home></home>'
            });

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
    }

})();
