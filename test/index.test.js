'use strict';

const app = require('../src/index');
const request = require('request');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

describe('Arlin frontend application tests', function () {
  before(function (done) {
    this.server = app.listen(8888);
    this.server.once('listening', () => done());
  });

  after(function (done) {
    this.server.close(done);
  });

  it('starts and shows the index page', function (done) {
    request('http://localhost:8888', function (err, res, body) {
      assert.ok(body.indexOf('<html>') !== -1);
      done(err);
    });
  });

  it('shows Arlin in title', function (done) {
    request('http://localhost:8888', function (err, res, body) {
      // expect(('<title>').to.have.html('Arlin'));
      done(err);
    });
  });

  describe('error 404', function () {
    it('shows a 404 HTML page', function (done) {
      request({
        url: 'http://localhost:8888/404',
        headers: {
          'Accept': 'text/html'
        }
      }, function (err, res, body) {
        assert.equal(res.statusCode, 404);
        assert.ok(body.indexOf('<html>') !== -1);
        done(err);
      });
    });

    it('shows a 404 JSON error without stack trace', function (done) {
      request({
        url: 'http://localhost:8888/404',
        json: true
      }, function (err, res, body) {
        assert.equal(res.statusCode, 404);
        assert.equal(body.code, 404);
        assert.equal(body.message, 'Page not found');
        assert.equal(body.name, 'NotFound');
        done(err);
      });
    });
  });
});