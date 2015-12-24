'use strict';

var scrambleApp = angular.module('scrambleApp', ['ngRoute', 'ui.bootstrap']);

scrambleApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/templates/scramble.html',
      controller: 'ScrambleCtrl'
    }).otherwise({
      redirectTo: '/',
      caseInsensitiveMatch: true
    });
  }]);

scrambleApp.controller('ScrambleCtrl', ['$scope', '$rootScope', 'ScrambleService', function($scope, $rootScope, ScrambleService) {
  $scope.formDataTeam = {};
  $scope.teams = [];
  $scope.members = [];
  $scope.selectedTeam = {};
  
  ScrambleService.getTeams().then(function(response) {
    $scope.teams = response;
  });

  $scope.addTeam = function() {
    ScrambleService.addTeam($scope.formDataTeam).then(function(response) {
      $scope.teams.push(response);
      $scope.formDataTeam = {};
    });
  };

  $scope.removeTeam = function(team) {
    ScrambleService.removeTeam(team).then(function(response) {
      $scope.teams.splice($scope.teams.indexOf(team), 1);
    });
  };
  
  $scope.selectTeam = function(team) {
    $scope.selectedTeam = team;
    ScrambleService.getTeamMembers(team).then(function(response) {
      $scope.members = response;
    });
  };
  
  $scope.editTeam = function(team) {
    ScrambleService.editTeam(team).then(function(response) {
      var index = $scope.teams.indexof(team);
      $scope.teams[index] = team;
    });
  };
}]);
