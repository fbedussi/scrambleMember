'use strict';

var scrambleApp = angular.module('scrambleApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

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

scrambleApp.controller('ScrambleCtrl', ['$scope', '$rootScope', '$timeout', 'ScrambleService', function($scope, $rootScope, $timeout, ScrambleService) {
  $scope.formDataNewTeam = {};
  $scope.formDataEditTeam = {};
  $scope.formDataMember = {};
  $scope.teams = [];
  $scope.members = [];
  $scope.selectedTeam = {};
  $scope.dataSeved = false;
  
  ScrambleService.getTeams().then(function(response) {
    $scope.teams = response;
    
    if ($scope.teams.length === 1) {
        $scope.selectTeam($scope.teams[0]);
    }
  });

  $scope.addTeam = function() {
    ScrambleService.addTeam($scope.formDataNewTeam).then(function(response) {
      $scope.teams.push(response);
      $scope.formDataNewTeam = {};
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
    team.name = $scope.formDataEditTeam.name;
    $scope.formDataEditTeam.name = {};
    
    ScrambleService.editTeam(team).then(function(response) {
      var index = $scope.teams.indexof(team);
      $scope.teams[index] = team;
    });
  };
  
  $scope.addMember = function() {
    var newMember = {};
    
    newMember.name = $scope.formDataMember.name;
    newMember.team = $scope.selectedTeam.id;
    
    ScrambleService.addMember(newMember).then(function(response) {
      $scope.members.push(response);
      $scope.formDataMember = {};
    });
  };
  
   $scope.removeMember = function(member) {
    ScrambleService.removeMember(member).then(function(response) {
      $scope.members.splice($scope.members.indexOf(member), 1);
    });
  };
  
  $scope.scrambleMembers = function() {
    var positions = [];
    var j, x, i;
    
    for (i = 1; i<= $scope.members.length; positions.push(i++));
    for(i = positions.length; i; j = parseInt(Math.random() * i), x = positions[--i], positions[i] = positions[j], positions[j] = x);
    $scope.members.forEach(function(member, i) {
        member.pos = positions[i];
    });
    
    ScrambleService.updateMembers($scope.members).then(function(response) {
       $scope.dataSaved = true;
       $timeout(function(){
            $scope.dataSaved = false;
        }, 2000);
       //console.log('saved');
    }, function(response) {
        $scope.dataSaved = false;
        //console.log('not saved');
    });
  };

  
}]);
