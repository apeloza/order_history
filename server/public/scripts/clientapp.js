var myApp = angular.module('myApp', []);

myApp.controller('IndexController', ['$scope', '$http', function($scope, $http) {
console.log('Controller ready');
$scope.customers = [];
$scope.order = [];
$scope.customerid = 0;
$scope.orders = [];
$scope.ordertotal = 0;
$scope.getCustomers = function(){
  $http({
    method: 'GET',
    url: '/customers'
  }).then(function(res){
    $scope.customers = res.data;
    $scope.customerid = res.data.id;
  });
};
$scope.showOrders = function(id){
  $scope.customerid = id;
  console.log($scope.customerid);
  $http({
    method: 'GET',
    url: '/customers/' + id
  }).then(function(res){
    $scope.orders = res.data;


  /*  $http({
      method: 'GET',
      url: '/customers/ordertotal/' + id
    }).then(function(res) {
$scope.ordertotal = res.data;
    });*/
  });
};

$scope.getCustomers();
}]);
