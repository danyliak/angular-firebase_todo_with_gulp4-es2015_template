(function () {
    'use strict';


    angular
        .module('app.core')
        .factory('UserService', UserService);

    /* @ngInject */
    function UserService($q, $firebaseAuth) {
        const service = {};

        service.CreateUser = CreateUser;

        return service;

        function CreateUser(user) {
            const deferred = $q.defer();

			$firebaseAuth().$createUserWithEmailAndPassword(user.username, user.password)
				.then(user => deferred.resolve(user))
				.catch( e => deferred.reject(e));

            return deferred.promise;
        }

    }

})();
