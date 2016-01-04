/**
 * MembersController
 *
 * @description :: Server-side logic for managing members
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var path = require('path');
var fs = require('fs');

module.exports = {
	deleteMember: function(req, res) {
        var criteria =  (req.param('id')) ? {id: req.param('id')} : {};
    
        MembersService.removeMember(criteria, function(success) {
            res.json(success);
        });
    },
	deleteTeamMembers: function(req, res) {
        var teamId =  (req.param('id')) ? req.param('id') : undefined;
//        console.log('------------------');
//		console.log(teamId);
//        console.log('------------------');
		MembersService.removeMember({team: teamId}, function(success) {
            res.json(success);
        });
    },
	getTeamMembers: function(req, res) {
        var teamId =  (req.param('id')) ? req.param('id') : undefined;
//        console.log('------------------');
//		console.log(teamId);
//        console.log('------------------');
		MembersService.getMember({team: teamId}, function(success) {
            res.json(success);
        });
    },
	updateMembers: function(req, res) {
		var members = (req.body) ? req.body : undefined;
		var counter = 0;

        //Single member
        if (members.length === undefined) {
            members = [members];
        }

		members.forEach(function(member) {
			MembersService.updateMember({id: member.id}, member).then(function(success) {
				counter++;
				
				if (counter === members.length) {
                    res.status(200);
                    res.send();
                }
				
			});
		});
    },
    uploadAvatar: function (req, res) {
        var saveDir = 'images';
        
        req.file('file').upload({
            // don't allow the total upload size to exceed ~10MB
            //dirname: '../public/' + saveDir + '/',
            dirname: '../../assets/' + saveDir + '/',
            maxBytes: 10000000
        },function whenDone(err, uploadedFiles) {
            if (err) {
                return res.negotiate(err);
            }
        
            // If no files were uploaded, respond with an error.
            if (uploadedFiles.length === 0){
                return res.badRequest('No file was uploaded');
            }
            
            //Copy the file from /asset to /.tmp in order to access it immediately
            var destPath = path.join('.tmp', 'public', 'images', path.basename(uploadedFiles[0].fd));
            var writable = fs.createWriteStream(destPath);
            fs.createReadStream(uploadedFiles[0].fd).pipe(writable);
            
            writable.on('finish', function() {
                // If a file was uploaded return the url        
                return res.json({
                  // Generate a unique URL where the avatar can be downloaded.
                  url: require('util').format('%s/members/avatar/%s', sails.getBaseUrl(), req.body.name),
            
                  // Grab the first file and use it's `fd` (file descriptor)
                  pubDirName: saveDir,
                  fileName: path.basename(uploadedFiles[0].fd)
                });    
            });
        });
    },
    deleteAvatar: function(req, res) {
        MembersService.getMember({id: req.param('id')}, function(success) {
            fs.unlink(path.join('assets', success[0].avatarUrl), function(err) {
                if (err) {
                    res.status(404);
                } else {
                    res.status(200);
                }
                res.send();
            });
        });
    }
};

