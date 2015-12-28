'use strict';

var scrambleApp = angular.module('scrambleApp', ['ngRoute', 'ngFileUpload', 'ngImgCrop'])
                            .filter('randomSrc', function () {
                                return function (input) {
                                    if (input)
                                        return input + '?r=' + Math.round(Math.random() * 999999);
                                };
                            });

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

scrambleApp.controller('ScrambleCtrl', ['$scope', 'Upload', '$rootScope', '$timeout', 'ScrambleService', function($scope, Upload, $rootScope, $timeout, ScrambleService) {
  $scope.formDataNewTeam = {};
  $scope.formDataEditTeam = {};
  $scope.formDataMember = {};
  $scope.teams = [];
  $scope.members = [];
  $scope.selectedTeam = {};
  $scope.dataSeved = false;
  $scope.avatarUrl = '';
  $scope.membersView = 'gui';
  $scope.membersWidth = 100/($scope.members.length/2) + '%';
  
  function selectIfIsTheOnlyTeam() {
    if ($scope.teams.length === 1) {
        $scope.selectTeam($scope.teams[0]);
    }
  }
  
  function updateMembersPos() {
    $scope.members.forEach(function(member, i) {
        member.coordinates = getCoordinates(member.pos, $scope.members.length, {});
    });
  }
  
  ScrambleService.getTeams().then(function(response) {
    $scope.teams = response;
    
    selectIfIsTheOnlyTeam();
  });

  $scope.addTeam = function() {
    ScrambleService.addTeam($scope.formDataNewTeam).then(function(response) {
      $scope.teams.push(response);
      $scope.formDataNewTeam = {};
      
      selectIfIsTheOnlyTeam();
    });
  };

    $scope.removeTeam = function(team) {
      ScrambleService.removeTeam(team).then(function(response) {
        $scope.teams.splice($scope.teams.indexOf(team), 1);
        
        if ($scope.selectedTeam === team) {
          $scope.selectedTeam = {};
        }
      });
    };
  
  $scope.selectTeam = function(team) {
    $scope.selectedTeam = team;
    ScrambleService.getTeamMembers(team).then(function(response) {
      $scope.members = response;
      
      updateMembersPos();
    });
  };
  
    $scope.editTeam = function(team) {  
        ScrambleService.editTeam(team).then(function(response) {
            var index = $scope.teams.indexOf(team);
            $scope.teams[index] = team;
        });
    };
  
    $scope.uploadAvatar = function(dataUrl) {
            //console.log('uploading file');
            return Upload.upload({
                url: '/api/v1/members/avatar/',
                data: {
                    file: Upload.dataUrltoBlob(dataUrl)
                }
            });
    };
    
    $scope.addMember = function(dataUrl) {
        
        function saveMember(newMember) {
            ScrambleService.addMember(newMember).then(function(response) {
                $scope.members.push(response);
                updateMembersPos();
                $scope.formDataMember = {};
            });    
        }
        
        var newMember = {};
        
        newMember.name = $scope.formDataMember.name;
        newMember.team = $scope.selectedTeam.id;
        newMember.avatarUrl = '';
        newMember.pos = $scope.members.length + 1;
        
        if (!dataUrl) {
            saveMember(newMember);
            return;
        }
            
        $scope.uploadAvatar(dataUrl).then(function(resp) {
            //Uploaded successfully
            //console.log('upload ok');
            newMember.avatarUrl = '/images/' + resp.data.fileName;
            saveMember(newMember);
        }, function(resp) {
            // handle error
            saveMember(newMember);
        }, function(evt) {
            // progress notify
            //console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :'+ evt.config.data.file.name);
        });   
    };
  
   $scope.removeMember = function(member) {
    ScrambleService.removeMember(member).then(function(response) {
      $scope.members.splice($scope.members.indexOf(member), 1);
      updateMembersPos();
    });
  };
  
  function getCoordinates(pos, totalPos, customOptions) {
        var options = {
            useAllSides: false,
            secondRowY: '73%'
        };
        var coordinates = {};
        var halfPos = Math.ceil(totalPos/2);
        var col = (pos <= halfPos)? pos : pos - halfPos;
        
        $.extend(options, customOptions);
        
        coordinates.y = (pos <= halfPos)? '0' : options.secondRowY;
        coordinates.x = (100/halfPos)*(col - 1) + '%';
        
        return coordinates;
    }
    
  $scope.scrambleMembers = function() {
    var positions = [];
    var j, x, i;
    
    for (i = 1; i<= $scope.members.length; positions.push(i++));
    for(i = positions.length; i; j = parseInt(Math.random() * i), x = positions[--i], positions[i] = positions[j], positions[j] = x);
    $scope.members.forEach(function(member, i) {
        member.pos = positions[i];
        member.coordinates = getCoordinates(member.pos, $scope.members.length, {});
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
  
  $scope.editMember = function(member, dataUrl) {
    
    function saveChanges(member) {
        ScrambleService.updateMembers(member).then(function(response) {
            console.log('member saved');
        });
        member.memberAvatarEdit = false;
    }
    
    if (!dataUrl) {
        saveChanges(member);
        return;
    }
    
    $scope.uploadAvatar(dataUrl).then(function(resp) {
        //Uploaded successfully
        //console.log('upload ok');
        member.avatarUrl = '/images/' + resp.data.fileName;
        saveChanges(member);
        
    }, function(resp) {
        // handle error
        saveChanges(member);
    }, function(evt) {
        // progress notify
        //console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :'+ evt.config.data.file.name);
    });   
  };

  
}]);
