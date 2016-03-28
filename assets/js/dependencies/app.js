'use strict';

var scrambleApp = angular.module('scrambleApp', ['ngFileUpload', 'ngImgCrop']);

scrambleApp.controller('ScrambleCtrl', ['$scope', 'Upload', '$rootScope', '$timeout', 'ScrambleService',
    function($scope, Upload, $rootScope, $timeout, ScrambleService) {
        var randomAvatarBaseUrl = 'http://api.adorable.io/avatars/';
  
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
        $scope.useAllSides = false;
        $scope.randomAvatarDisplay = false;
        $scope.randomAvatarUrl = randomAvatarBaseUrl;
        $scope.croppedDataUrl = null;
        $scope.avatar = null;
        
        function selectIfIsTheOnlyTeam() {
            if ($scope.teams.length === 1) {
                $scope.selectTeam($scope.teams[0]);
            }
        }
  
    //$locationProvider.html5Mode(true);
    //$location.path('/en');
    
    function updateMembersPos() {
        $scope.members.forEach(function(member, i) {
            member.style = getStyle(member.pos, $scope.members.length, {});
        });
    }
  
    $scope.updateMembersPos = updateMembersPos;
  
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
                $scope.croppedDataUrl = null;
                $scope.randomAvatarDisplay = false;
            });    
        }
        
        var newMember = {};
        
        newMember.name = $scope.formDataMember.name;
        newMember.team = $scope.selectedTeam.id;
        newMember.avatarUrl = '';
        newMember.pos = $scope.members.length + 1;
        
        if (!$scope.avatar) {
            if ($scope.randomAvatarDisplay) {
                newMember.avatarUrl = $scope.randomAvatarUrl;
            }
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
        function deleteMember(member) {
          ScrambleService.removeMember(member).then(function(response) {
                $scope.members.splice($scope.members.indexOf(member), 1);
                updateMembersPos();
            });
        }
        
        if (member.avatarUrl === '') {
          deleteMember(member);
          return;
        }
        
        if (mamber.avatarUrl.indexOf('http') === 0) {
          deleteMember(member);
          return;
        }
        
        ScrambleService.deleteAvatar(member).then(function(response) {
            console.log('avatar deleted' + response);
            deleteMember(member);
        }).catch(function(reason) {
            console.log('avatar delete error: ' + reason);
            deleteMember(member);
        });
    };
  
    //function getSeats(members, customOptions) {
    //    var options = {
    //        seats: {
    //            left: 1,
    //            top: 5,
    //            right: 1,
    //            bottom: 5
    //        }
    //    };
    //    
    //    $.extend(options, customOptions);
    //    
    //    var availableSeats = options.seats;
    //    var availableMembers = members;
    //    
    //    function getSmallestSide(seats) {
    //        var sortedSeats = Object.keys(seats).sort(function(a,b){return seats[a]-seats[b];});
    //        return sortedSeats[0];
    //    }
    //    
    //    function seatMember(availableSeats, availableMembers) {
    //        //code
    //    }
    //}
    
    function getStyle(pos, totalPos) {
        var options = {
            useAllSides: $scope.useAllSides,
            height: '33'
        };
        
        var style = {};
        var halfPos = Math.ceil(totalPos/2);
        var col = (pos <= halfPos)? pos : pos - halfPos;
        var width = 100/halfPos;
        var left = (100/halfPos)*(col - 1);
        
        style.height = options.height + '%';
        
        style.top = (pos <= halfPos)? '0' : 'auto';
        style.bottom = (pos <= halfPos)? 'auto' : '0';
        style.left = left + '%';
        
        if (options.useAllSides) {
            width = 100/(halfPos+2);
            
            if (pos === 1) {
                style.top = '50' - options.height/2 + '%';
                style.bottom = 'auto';
                style.left = '0';
                return style;
            }
            
            if (pos === halfPos + 1) {
                style.top = '50' - options.height/2 + '%';
                style.bottom = 'auto';
                style.left = 'auto';
                style.right = '0';
                return style;
            }
            
            style.left =  left - width/2 + '%';
        }
        
        style.width =  width + '%';
        
        return style;
    }
    
    $scope.scrambleMembers = function() {
    var positions = [];
    var j, x, i;
    
    for (i = 1; i<= $scope.members.length; positions.push(i++));
        for(i = positions.length; i; j = parseInt(Math.random() * i), x = positions[--i], positions[i] = positions[j], positions[j] = x);
        
        $scope.members.forEach(function(member, i) {
            member.pos = positions[i];
            member.style = getStyle(member.pos, $scope.members.length, {});
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
            $scope.croppedDataUrl = null;
            $scope.randomAvatarDisplay = false;
        }
        
        if (!dataUrl) {
            saveChanges(member);
            return;
        }
    
        ScrambleService.deleteAvatar(member).then(function(response){
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
        }).catch(function(reason) {
            console.log('avatar delete error: ' + reason);
        });
    
    };
  
    $scope.getRandomAvatar = function(memberName) {
        $scope.randomAvatarUrl += encodeURIComponent(memberName);
        $scope.randomAvatarDisplay = true;
    };
  
    $scope.resetNewMember = function() {
        $scope.formDataMember.name = '';
        $scope.randomAvatarUrl = randomAvatarBaseUrl;
        $scope.randomAvatarDisplay = false;
        $scope.croppedDataUrl = null;
    };

  
}]);
