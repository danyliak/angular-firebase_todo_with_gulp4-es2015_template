(function(){
    'use strict';

    angular
        .module('app.core')
		.run(StateChangeConfig)
        .run(FirebaseConfig)
        .config(CookiesConfig)
        .run(TimeoutLogout);

	/* @ngInject */
	function StateChangeConfig($transitions, $cookies) {
		$transitions.onStart({ to: 'home' }, trans => {
			const loggedUserObject = $cookies.getObject('currentUser');
			if (!loggedUserObject) return trans.router.stateService.target('login')
		});
	}

	/* @ngInject */
    function FirebaseConfig($state, AuthenticationService, $firebaseAuth) {
		const config = {
			apiKey: 'AIzaSyACapgxjrjodTEAEjaR-4qab6-u4mtJR7A',
			authDomain: 'simple-todo-833b1.firebaseapp.com',
			databaseURL: 'https://simple-todo-833b1.firebaseio.com',
			projectId: 'simple-todo-833b1',
			storageBucket: '',
			messagingSenderId: '328164186741'
		};
		firebase.initializeApp(config);

		$firebaseAuth().$onAuthStateChanged( user => {
			if (user) {
				AuthenticationService.SetCredentials(user);
				$state.go('home');
			} else {
				$state.go('login');
			}
		});
	}

    /* @ngInject */
    function CookiesConfig($cookiesProvider) {
        const date = new Date();
        const expDate = new Date(date.getFullYear()+1, date.getMonth(), date.getDate());
        $cookiesProvider.defaults.expires = expDate;
    }

    /* @ngInject */
    function TimeoutLogout($timeout, $document, $state, AuthenticationService) {
        const timeOutTimerValue = 60*60*1000;

        let timeOutThread = $timeout(logoutByTimer, timeOutTimerValue);
        const bodyElement = angular.element($document);

        angular.forEach(
            ['keydown', 'keyup', 'click', 'mousemove', 'DOMMouseScroll',
                'mousewheel', 'mousedown', 'touchstart', 'touchmove', 'scroll', 'focus'],
            eventName => bodyElement.bind(eventName,  e => timeOutResetter(e)) );

        function logoutByTimer() {
            AuthenticationService.ClearCredentials();
            $state.go('login');
        }

        function timeOutResetter() {
            $timeout.cancel(timeOutThread);
            timeOutThread = $timeout(logoutByTimer, timeOutTimerValue);
        }
    }


})();