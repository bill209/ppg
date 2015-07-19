(function() {
	'use strict';

//------------------------------ keywords factory  ------------------------------
	angular
		.module('PPG')
		.factory('keywordsFactory', function($q, $http){
			return {
				getKeywords: function(){
					var deferred = $q.defer();
					var url ='data/keywords.json';
					$http
						.get(url)
						.then(function(d){
							deferred.resolve(angular.fromJson(d.data))
						})
					return deferred.promise;
				}
			}
		});

//------------------------------ speech factory  ------------------------------
	angular
		.module('PPG')
		.factory('speechFactory', function($q){
			return {
				convertSpeechToText: function(){
					var deferred = $q.defer();
					var maxMatches = 3;
					var promptString = "Speak now"; // optional
					var language = "en-US";                     // optional

					window.plugins.speechrecognizer.startRecognize(function(result){
						deferred.resolve(result);
					}, function(errorMessage){
						deferred.resolve("Error Message" + errorMessage);
					}, maxMatches, promptString, language);

					return deferred.promise;
				}
			}
		});

})();
