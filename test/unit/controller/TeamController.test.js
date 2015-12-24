var request = require('supertest');
(function(request){
    var teamId;
    var memberId;
    
    function toHaveId(res) {
        if (!('id' in res.body)) {
            return false;
        } else {
            return true;
        }
    }
        
    describe('TeamController', function() {

        describe('Create a team', function() {
            it('should create a new team', function (done) {
                request(sails.hooks.http.app)
                    .post('/api/v1/team/')
                    .send({ name: 'testTeam' })
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
      
        describe('Get all teams', function() {
            it('should get all teams', function (done) {
                request(sails.hooks.http.app)
                    .get('/api/v1/team/')
                    .expect(200)
                    .end(function(err, res) {
                        //console.log(res.body);
                        if (err) return done(err);
                        done();
                });
            });
        });
        
        describe('Get a team by id', function() {
            it('should get a team by id', function (done) {
                request(sails.hooks.http.app)
                    .get('/api/v1/team/' + teamId)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);          
                        //team = res.body;
                        done();
                });
            });
        });
        
        describe('Delete a team by id', function() {
            it('should delete a team by id', function(done) {
                 request(sails.hooks.http.app)
                  .del('/api/v1/team/'+teamId)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        done();
                });
            });
        });
        
        describe('delete all teams', function() {
            it('should delete all teams', function (done) {
                request(sails.hooks.http.app)
                  .del('/api/v1/team/')
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        done();
                });
            });
        });
    
    });
    
    describe('Delete team member', function() {

        describe('Create a team', function() {
            it('should create a new team', function (done) {
                request(sails.hooks.http.app)
                    .post('/api/v1/team/')
                    .send({ name: 'testTeam2' })
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
                    .send({ name: 'testMember2', team: teamId, pos: 1 })
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
        
        describe('delete team members', function() {
            it('should delete all members of a team', function (done) {
                request(sails.hooks.http.app)
                  .del('/api/v1/team/'+teamId+'/members')
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        done();
                });
            });
        });
    });

})(request);