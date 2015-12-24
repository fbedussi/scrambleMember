/**
 * TeamController
 *
 * @description :: Server-side logic for managing teams
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	deleteTeam: function(req, res) {
        var criteria =  (req.param('id')) ? {id: req.param('id')} : {};
        
        TeamService.removeTeam(criteria, function(success) {
            res.json(success);
        });
    }
};

