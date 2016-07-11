;(function () {
	"use strict";

	var expect = require('chai').expect;
	var request = require('supertest');
	var api = request.agent('http://localhost:5555/api/v1');
	
	describe('stats.controller', function () {

		it('should return array of top items', function (done) {
			api.get('/stats/items/top/10')
				.expect(200)
				.end(function (err, res) {
					expect(err).to.be.null;
					expect(res.body.data).to.be.an('array');

					done();
				})
			;
		});

		it('should return array of top users', function (done) {
			api.get('/stats/users/top/10')
				.expect(200)
				.end(function (err, res) {
					expect(err).to.be.null;
					expect(res.body.data).to.be.an('array');

					done();
				})
			;
		});
	});
	
})();
