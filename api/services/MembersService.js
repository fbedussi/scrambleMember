var fs = require('fs');
var path = require('path');

module.exports = {
  removeMember: function(criteria, next) {
    Members.destroy(criteria).exec(function(err, member) {
        if(err) throw err;
    
        fs.unlink(path.join('assets', member[0].avatarUrl), function(err) {
            if (err) {
                return console.error(err);
            } 
            console.log('delete successfully'); 
        });
        next(member);
    });
  },
  getMember: function(criteria, next) {   
    Members.find(criteria).exec(function(err, member) {
      if(err) throw err;
      next(member);
    });
  },
  updateMember: function(criteria, records, next) {   
    return Members.update(criteria, records);
  }
};
