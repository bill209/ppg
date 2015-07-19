(function() {
	'use strict';

	angular
		.module('PPG',['ngRoute','ngAnimate']);

	// check online status
	angular
		.module('PPG')
		.run(function($window, $rootScope) {
			$rootScope.online = navigator.onLine;
			$window.addEventListener("offline", function () {
				$rootScope.$apply(function() {
					$rootScope.online = false;
				});
			  }, false);
			  $window.addEventListener("online", function () {
				$rootScope.$apply(function() {
					$rootScope.online = true;
				});
			  }, false);
		});

	// routing
	angular
		.module('PPG')
		.config(['$routeProvider',
			function($routeProvider) {
				$routeProvider.
				when('/ppg', {
					templateUrl: 'views/ppg.html'
				}).
				when('/bubbles', {
					templateUrl: 'views/bubbles.html'
				}).
				when('/buttercup', {
					templateUrl: 'views/buttercup.html'
				}).
				when('/blossom', {
					templateUrl: 'views/blossom.html'
				}).
				when('/c', {
					templateUrl: 'views/claim.html'
				}).
				when('/ff', {
					templateUrl: 'views/ff.html'
				}).
				otherwise({
					redirectTo: '/ppg'
				});
			}
		]);

	// angular
	// 	.module('PPG')
	// 	.run(function($rootScope, $window) {
	// 	// publish current transition direction on rootScope
	// 	$rootScope.direction = 'ltr';
	// 	// listen change start events
	// 	$rootScope.$on('$routeChangeStart', function(event, next, current) {
	// 		$rootScope.direction = 'rtl';
	// 		// console.log(arguments);
	// 		if (current && next && (current.depth > next.depth)) {
	// 			$rootScope.direction = 'ltr';
	// 		}
	// 		// back
	// 		$rootScope.back = function() {
	// 			$window.history.back();
	// 		}
	// 	});
	// });

})();
