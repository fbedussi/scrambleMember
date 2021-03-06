var fs = require('fs');
var path = require('path');

module.exports = {
  removeMember: function(criteria, next) {
    Members.destroy(criteria).exec(function(err, member) {
        if(err) throw err;
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
