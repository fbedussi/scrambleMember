/**
 * MembersController
 *
 * @description :: Server-side logic for managing members
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
//        console.log('------------------');
//		console.log(members);
//        console.log('------------------');
//res.json(req.body);
		members.forEach(function(member) {
			MembersService.updateMember({id: member.id}, {team: member.team, name: member.name, pos: member.pos}, function(success) {
				counter++;
				
				if (counter === members.length) {
                    res.status(200);
                    res.send();
                }
				
			});
		});
    }
};

