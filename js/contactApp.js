var contactApp = angular.module('contactApp', [
  'ngRoute'
]);


contactApp.config(['$routeProvider',
  function($routeProvider) {
      $routeProvider
        .when('/', {
          controller: 'ListCtrl',
          templateUrl: 'contact/list.html'
        })
        .when('/contact', {
          controller: 'SubmitCtrl',
          templateUrl: 'contact/detail.html'
        })
        .otherwise({
          redirectTo: '/'
      });
  }]);


contactApp.controller('SubmitCtrl', function($scope, $http, $location, $timeout) {
    $scope.submit = function(form) {
      
      
      //Submit data to google form.
      $http({
        method: 'POST',
        url: 'https://docs.google.com/forms/d/1gVhxopf2l2_eXHhfbUI4480ooTgm9pJRtL1P7OwjHWU/formResponse',
        headers: {'Accept' : 'application/x-www-form-urlencoded'},
        params: {'entry.143632887': $scope.name,
                 'entry.1620234299': $scope.email,
                 'entry.596833451': $scope.message}
        })
        .success(function(data, status) {
         //I'm still having cross origin error on POST method.
         //There're some solutions work with GET method only

        })
        .error(function(data, status) {
            $scope.status = 'alert-success';
            $scope.messages = 'Thanks for your submission.';
            
            $scope.contactForm.setPristine();
            $scope.name = null;
            $scope.email = null;
            $scope.message = null;
            
           // $scope.status = 'alert-danger';
          //  $scope.messages = 'No connection. Please try again in 5s or later.';
          
         
        });

      //Hide message after 3 seconds.
      $timeout(function() {
        $scope.messages = null;
      }, 3000);
  
      $timeout(function() {
        $location.path('/');
      }, 1000);
      

    };
})
