;(function () {
	"use strict";

	var expect = require('chai').expect;
	var request = require('supertest');
	var api = request.agent('http://localhost:5555/api/v1');
	
	describe('user.controller', function () {

		var name = 'user-' + Math.random().toString(36).substr(2, 5);
		var user;

		it('should create new user', function (done) {

			api.post('/users')
				.send({
					name: name
				})
				.expect(201)
				.end(function (err, res) {
					expect(err).to.be.null;
					expect(res.body.data.name).to.equal(name);
					expect(res.body.data).to.have.ownProperty('_id');

					user = res.body.data;

					done();
				})
			;
		});

		it('should return array of users', function (done) {
			api.get('/users')
				.expect(200)
				.end(function (err, res) {
					expect(err).to.be.null;
					expect(res.body.data).to.be.an('array');
					expect(res.body.data).to.have.length.above(0);
					expect(res.body.data).to.include(user);

					done();
				})
			;
		});

		it('should delete a user', function (done) {
			api.delete('/users/' + user._id)
				.set('Content-Type', 'application/json')
				.expect(200)
				.end(function (err, res) {
					expect(err).to.be.null;
					expect(res.body.data).to.eql(user);

					done();
				})
			;
		});
	});
	
})();
