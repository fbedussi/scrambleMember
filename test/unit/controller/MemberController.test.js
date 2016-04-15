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
        
    describe('MembersController', function() {
        
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
    
        describe('Create a member', function() {
            it('should create a new member', function (done) {
                request(sails.hooks.http.app)
                    .post('/api/v1/members/')
                    .send({ name: 'testMember', team: teamId, pos: 1 })
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
                        //console.log('-------------------');
                        //console.log(res.body);
                        //console.log('-------------------');
                        done();
                });
            });
        });
        
        describe('Get all members', function() {
            it('should get all members', function (done) {
                request(sails.hooks.http.app)
                  .get('/api/v1/members/')
                    .expect(200)
                    .end(function(err, res) {
                        //console.log(res.body);
                        if (err) return done(err);
                        done();
                });
            });
        });
        
        describe('Get a member by id', function() {
            it('should get a member by id', function (done) {
                request(sails.hooks.http.app)
                    .get('/api/v1/members/' + memberId)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);          
                        //console.log(res.body);
                        done();
                });
            });
        });
        
        describe('delete a member', function() {
            it('should delete a member', function (done) {
                request(sails.hooks.http.app)
                  .del('/api/v1/members/'+memberId)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        done();
                });
            });
        });
        
        describe('delete all members', function() {
            it('should delete all members', function (done) {
                request(sails.hooks.http.app)
                  .del('/api/v1/members/')
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        done();
                });
            });
        });
    });

})(request);