describe("Hello world", function() {
    it("should respond with hello world", function(done) {
      $http({
        method: 'GET',
        url: 'http://localhost:1337/api/v1/json/hello'
      }).then(function successCallback(response) {
            expect(response.body).toEqual("hello world");
            done();
        }, function errorCallback(response) {
            
        });
    });
});