var scrambleApp = angular.module('scrambleApp', ['ngFileUpload', 'ngImgCrop']);

scrambleApp.service('ScrambleService', function($http, $q) {
  return {
        'getTeams': function() {
          var defer = $q.defer();
          $http.get('/api/v1/team').success(function(resp){
            defer.resolve(resp);
          }).error( function(err) {
            defer.reject(err);
          });
          return defer.promise;
        },
        'getTeamMembers': function(team) {
          var defer = $q.defer();
          $http.get('/api/v1/team/' + team.id + '/members/').success(function(resp){
            defer.resolve(resp);
          }).error( function(err) {
            defer.reject(err);
          });
          return defer.promise;
        },
        'addTeam': function(team) {
          var defer = $q.defer();
          $http.post('/api/v1/team', team).success(function(resp){
            defer.resolve(resp);
          }).error( function(err) {
            defer.reject(err);
          });
          return defer.promise;
        },
        'removeTeam': function(team) {
          var defer = $q.defer();
          $http.delete('/api/v1/team/' + team.id).success(function(resp){
            defer.resolve(resp);
          }).error( function(err) {
            defer.reject(err);
          });
          return defer.promise;
        },
        'editTeam': function(team) {
          var defer = $q.defer();
          $http.put('/api/v1/team/' + team.id, team).success(function(resp){
            defer.resolve(resp);
          }).error( function(err) {
            defer.reject(err);
          });
          return defer.promise;
        },
        'addMember': function(member) {
          var defer = $q.defer();
          $http.post('/api/v1/members', member).success(function(resp){
            defer.resolve(resp);
          }).error( function(err) {
            defer.reject(err);
          });
          return defer.promise;
        },
        'removeMember': function(member) {
          var defer = $q.defer();
          $http({
            method: 'DELETE',
            url: '/api/v1/members/' + member.id
          }).success(function(resp){
            defer.resolve(resp);
          }).error( function(err) {
            defer.reject(err);
          });
          return defer.promise;
        },
        'updateMembers': function(members) {
          var defer = $q.defer();
          $http.put('/api/v1/members/', members).success(function(resp){
            defer.resolve(resp);
          }).error( function(err) {
            defer.reject(err);
          });
          return defer.promise;
        },
        'uploadAvatar': function(fileName, memberName) {
                var defer = $q.defer();
                $http.post('/api/v1/members/avatar', {file: fileName, name: memberName}).success(function(resp){
                defer.resolve(resp);
            }).error( function(err) {
                defer.reject(err);
            });
            return defer.promise;
        },
        'deleteAvatar': function(member) {
                var defer = $q.defer();
                $http.delete('/api/v1/members/' + member.id + '/avatar').success(function(resp){
                defer.resolve(resp);
            }).error( function(err) {
                defer.reject(err);
            });
            return defer.promise;
        }
    };
});