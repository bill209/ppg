
(function() {
	'use strict';

// body view controller
	angular
		.module('PPG')
		.controller('BodyCtrl',function($scope, $location, keywordsFactory, speechFactory){
			this.keywords = {};
			$scope.speechResponses = [];
			$scope.txt = {};
			$scope.txt.input = '';
			$scope.matchedResponse = ''
			$scope.func = {};
			// keeps an eye on connection status, calls noConnection page
			$scope.$watch('online',function(){
				if(!$scope.online){
					$location.path("/noConnection");
				}
			});

			// loads in the keywords that determine which tile is displayed
			var promise = keywordsFactory.getKeywords();
			promise.then(function(keywordData){
				$scope.keywords = keywordData;
			});

			// load in a tile based on a change to speechResponses, which is also available via input box
			$scope.$watch('speechResponses', function() {
				var tile = '', response = '', outmessage = '';

				if(!$scope.online){
					$location.path("/noConnection")
				} else {
					// this prevents inspecting it on var instantiation
					if($scope.speechResponses.length > 0){
						// loop through all the speech-to-text responses
						for (var j = $scope.speechResponses.length - 1; j >= 0; j--) {
							// loop through all of the keywords for a match
							for (var i = $scope.keywords.length - 1; i >= 0; i--) {
								if($scope.speechResponses[j].toLowerCase().indexOf($scope.keywords[i].keyword) != -1){
									// take the first match
									if(tile == ''){
										tile = $scope.keywords[i].tile;
										response = $scope.speechResponses[j];
										outmessage = $scope.keywords[i].outmessage;
									}
								}
							};
						};
						// if a match was found
						if(tile != ''){
							$location.path("/" + tile)
							$scope.matchedResponse = response;

							TTS.speak(outmessage, function() {
								//success
							}, function(error) {
								console.log(error);
							});

						} else {
							$location.path("/error")
							$scope.matchedResponse = "sorry, we did not catch that, please try again";
							outmessage = 'sorry, we did not catch that, please try again';

							TTS.speak(outmessage, function() {
								//success
							}, function(error) {
								console.log(error);
							});

						}
					}
				}
			});
			$scope.goHome = function(){
				$location.path('/main');
			};
			$scope.speechToText = function(){
				$scope.txt.input = "";
				var promise = speechFactory.convertSpeechToText();
				promise.then(function(words){
					$scope.speechResponses = words;
				});
			};
			$scope.textToText = function(){
				$scope.speechResponses = [$scope.txt.input];
				$scope.txt.input = "";
			};
			$scope.goOffline = function(){
				$scope.online=false;
			}
		});

})();
