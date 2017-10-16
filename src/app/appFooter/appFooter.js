(function () {
    'use strict';

    angular
        .module('app.footer')
        .directive('appFooter', AppFooter);

    /* @ngInject */
    function AppFooter() {
        return {
            restrict: 'A',
            templateUrl: 'app/appFooter/appFooter.html',
            scope: {},
            controller: FooterCtrl,
            controllerAs: 'vm'
        };
    }

    /* @ngInject */
    function FooterCtrl() {
        const vm = this;

    }
})();