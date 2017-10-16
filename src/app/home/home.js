(function () {
    'use strict';

    angular
        .module('app.home')
        .directive('home', Home);

    /* @ngInject */
    function Home() {
        return {
            restrict: 'E',
            templateUrl: 'app/home/home.html',
            replace: true,
            scope: {},
            controller: HomeCtrl,
            controllerAs: 'vm'
        };
    }

    /* @ngInject */
    function HomeCtrl($scope, $cookies, $firebaseArray) {
        const vm = this;
        vm.loading = true;
        vm.todos = [];
		vm.loggedUserObject = $cookies.getObject('currentUser');
		vm.addToDo = addTodo;
		vm.removeTodo = removeTodo;
		vm.markAsDone = markAsDone;

        activate();

		$scope.$on('$destroy', () => vm.todos.$destroy() );

        function activate() {
			if (vm.loggedUserObject.uid) {
				const todosRef = firebase.database().ref().child(`todos/${vm.loggedUserObject.uid}`);
				$firebaseArray(todosRef).$loaded()
					.then(todos => {
						vm.todos = todos;
						vm.loading = false;
					})
					.catch(err => {
						console.error(err);
						vm.loading = false;
					});
			}
        }

        function addTodo() {
			/*jslint curly: false, boss: true*/
        	if (!vm.newTodoName) return vm.errorName = true;

			vm.todos.$add({
				name: vm.newTodoName,
				done: false
			});
			vm.newTodoName = '';
		}

		function removeTodo(todo) {
			vm.todos.$remove(todo);
		}

		function markAsDone(todo) {
			todo.done = true;
			vm.todos.$save(todo);
		}

    }
})();
