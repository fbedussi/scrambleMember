var request = require('supertest');
(function(request){
    var teamId;
    var memberId;
    var teamMembers;
    
    function toHaveId(res) {
        if (!('id' in res.body)) {
            return false;
        } else {
            return true;
        }
    }
        
    describe('Update members', function() {
        
        describe('Create a team', function() {
            it('should create a new team', function (done) {
                request(sails.hooks.http.app)
                    .post('/api/v1/team/')
                    .send({ name: 'testTeam3' })
                    .expect(201)
                    .expect('Content-Type', /json/)
                    .expect(toHaveId)
                    .end(function(err, res) {
                        if (err) return done(err);
                        teamId = res.body.id;
                        done();
                });
            });
        });
    
        describe('Create a member', function() {
            it('should create a new member', function (done) {
                request(sails.hooks.http.app)
                    .post('/api/v1/members/')
                    .send({ name: 'testMember1', team: teamId, pos: 1 })
                    .expect(201)
                    .expect('Content-Type', /json/)
                    .expect(toHaveId)
                    .end(function(err, res) {
                        if (err) return done(err);
                        memberId = res.body.id;
                        done();
                });
            });
        });
        
        describe('Create another member', function() {
            it('should create a new member', function (done) {
                request(sails.hooks.http.app)
                    .post('/api/v1/members/')
                    .send({ name: 'testMember2', team: teamId, pos: 2 })
                    .expect(201)
                    .expect('Content-Type', /json/)
                    .expect(toHaveId)
                    .end(function(err, res) {
                        if (err) return done(err);
                        memberId = res.body.id;
                        done();
                });
            });
        });
        
        describe('Get team members', function() {
            it('should get all members of a team', function (done) {
                request(sails.hooks.http.app)
                    .get('/api/v1/team/' + teamId + '/members/')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end(function(err, res) {
                        if (err) return done(err);
                        teamMembers = res.body;
                        //console.log('-------------------');
                        //console.log(res.body);
                        //console.log('-------------------');
                        done();
                });
            });
        });
        
        describe('Update team members', function() {    
            it('should update the members of a team', function (done) {
                //var newTeamMembers = teamMembers.slice(0,1);
                //
                //newTeamMembers[0].pos = 3;
                
                teamMembers[0].pos = 4;
                teamMembers[1].pos = 3;
                
                request(sails.hooks.http.app)
                    .put('/api/v1/members/')
                    .send(teamMembers)
                    .expect(200)
                    //.expect('Content-Type', /json/)
                    .end(function(err, res) {
                        if (err) return done(err);
                        done();
                });
            });
        });
        
    });

})(request);