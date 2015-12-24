module.exports = {
  removeTeam: function(criteria, next) {   
    Team.destroy(criteria).exec(function(err, team) {
      if(err) throw err;
      next(team);
    });
  }
};
