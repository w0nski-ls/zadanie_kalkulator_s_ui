var app = angular.module('calc', []);

app.controller("CalculatorController", [ "$http", "$scope", "$location",
		CalculatorController ]);

function CalculatorController($http, $scope) {

	$scope.form = {
		number : 0
	};
	$scope.calcResults = [];
	$scope.isErrorMessage = false;
	$scope.errorMessage = null;

	$scope.calculate = function() {
		var request = callRest($http, $scope.form.number);
		request.then(function(response) {
			$scope.isErrorMessage = false;
			$scope.errorMessage = null;
			$scope.calcResults = response.data.calculationOutputs;
			console.log(JSON.stringify(response.data.calculationOutputs));
		}, function(response) {
			$scope.isErrorMessage = true;
			$scope.errorMessage = response.data.errorMessage;
			$scope.calcResults = [];
		});
	};
	$scope.calculate();

	function callRest($http, value) {
		console.log(location.hostname);
		return $http.get('http://' + location.hostname
				+ ':9090/calculator?value=' + value);
	}
}
