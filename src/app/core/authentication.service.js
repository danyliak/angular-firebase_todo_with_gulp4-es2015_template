(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('AuthenticationService', AuthenticationService);


    /* @ngInject */
    function AuthenticationService($http, $q, $cookies, $rootScope, $firebaseAuth) {
        const service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(username, password) {
            const deferred = $q.defer();

			$firebaseAuth().$signInWithEmailAndPassword(username, password)
                .then(user => deferred.resolve(user))
                .catch(e => deferred.reject(e));

            return deferred.promise;
        }

        function SetCredentials(user) {
            const deferred = $q.defer();

            const authdata = user.Yd;

            $rootScope.globals = $rootScope.globals || {};

            $rootScope.globals.currentUser = {
                userName: user.email,
				uid: user.uid,
                authdata
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
            $cookies.putObject('currentUser', $rootScope.globals.currentUser);
            deferred.resolve();

            return deferred.promise;
        }

        function ClearCredentials() {
			$firebaseAuth().$signOut();
            $rootScope.globals = {};
            $cookies.remove('currentUser');
            $http.defaults.headers.common.Authorization = 'Basic';
        }
    }

})();