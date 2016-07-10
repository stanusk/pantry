;(function () {
	"use strict";

	var expect = require('chai').expect;
	var request = require('supertest');
	var api = request.agent('http://localhost:5555/api/v1');
	
	describe('item.controller', function () {

		var itemName = 'item-' + Math.random().toString(36).substr(2, 5);
		var userId = '57823dac52d282a144a31e44';
		var item;

		it('should create new item', function (done) {

			api.post('/items')
				.send({
					name: itemName
				})
				.expect(201)
				.end(function (err, res) {
					expect(err).to.be.null;
					expect(res.body.data.name).to.equal(itemName);
					expect(res.body.data).to.have.ownProperty('_id');

					item = res.body.data;

					done();
				})
			;
		});

		it('should return array of items without users history', function (done) {
			api.get('/items/list')
				.expect(200)
				.end(function (err, res) {
					expect(err).to.be.null;
					expect(res.body.data).to.be.an('array');
					expect(res.body.data).to.have.length.above(0);
					expect(res.body.data[0]).to.have.keys(['_id', 'name']);
					expect(res.body.data[0]).not.to.have.keys(['history']);


					done();
				})
			;
		});

		it('should update history with userId and count', function (done) {
			api.put(`/items/${item._id}/users/${userId}`)
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.expect(200)
				.end(function (err, res) {
					expect(err).to.be.null;

					var updatedItem = res.body.data;

					expect(updatedItem).to.include.keys(['_id', 'name', 'history']);
					expect(updatedItem._id).to.equal(item._id);
					expect(updatedItem.history).to.be.an('array');

					var userRecord = updatedItem.history.filter(function (userHist) {
						return userHist.userId == userId;
					})[0];

					expect(userRecord).to.have.ownProperty('count');
					expect(userRecord.count).to.be.at.least(1);

					done();
				})
			;
		});
		
		it('should return array of items with all relevant properties', function (done) {
			api.get('/items')
				.expect(200)
				.end(function (err, res) {
					expect(err).to.be.null;
					expect(res.body.data).to.be.an('array');
					expect(res.body.data).to.have.length.above(0);
					expect(res.body.data[0]).to.have.keys(['_id', 'name', 'history']);

					done();
				})
			;
		});

		it('should delete an item', function (done) {
			api.delete('/items')
				.send({itemId: item._id})
				.expect(200)
				.end(function (err, res) {
					expect(err).to.be.null;
					expect(res.body.data._id).to.equal(item._id);

					done();
				})
			;
		});
	});
	
})();
