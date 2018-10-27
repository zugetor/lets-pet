angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})
.controller('findFormCtrl', function($scope, $rootScope, $timeout) {
	$scope.slideIndex = 1;
	
	$scope.showDivs = function(n){
		var i;
		var x = document.getElementsByClassName("mySlides");
		if (n > x.length) {$scope.slideIndex = 1}    
		if (n < 1) {$scope.slideIndex = x.length}
		for (i = 0; i < x.length; i++) {
			x[i].style.display = "none";  
		}
		x[$scope.slideIndex-1].style.display = "block"; 
	};
	$scope.plusDivs = function(n) {
		$scope.showDivs($scope.slideIndex += n);
	}
	$scope.show = function() {
		document.getElementById("ctrlbutton").classList.remove("hide");
		$scope.plusDivs(0);
	};
});