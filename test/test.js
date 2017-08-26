var assert   = require("assert");
var filter    = require('../server/routes/filter.js');

var chai 	 = require('chai');
var chaiHttp = require('chai-http');
var should 	 = chai.should();
chai.use(chaiHttp);

var server   = require('../server/server.js');

// filter testing
describe("filters", () => {
	describe("filter functions", () => {
		it("Should have functions: request", () => {
			assert.equal(typeof filter.request, 'function');
		});
	});
	describe("filters implementation", () => {
		it("Should have response = {status: 400, message: 'No payloads'}", (done) => {
			var filter = '';
	        chai.request(server)
            	.post('/')
            	.send({filter: filter})
            	.end((err, res) => {
            		res.body.should.be.a('object');
            		res.body.should.have.property('message').eql('No payloads');
            		done();
	            });
		});
		it("Should have correct = {status: 200}", (done) => {
			var payload = [
			        {
			            "address": {
			                "buildingNumber": "28",
			                "lat": -33.912542000000002,
			                "lon": 151.00293199999999,
			                "postcode": "2198",
			                "state": "NSW",
			                "street": "Donington Ave",
			                "suburb": "Georges Hall"
			            },
			            "propertyTypeId": 3,
			            "readyState": "init",
			            "reference": "aqsdasd",
			            "shortId": "6Laj49N3PiwZ",
			            "status": 0,
			            "type": "htv",
			            "workflow": "pending"
			        },
			        {
			            "address": {
			                "buildingNumber": "Level 6",
			                "postcode": "2060",
			                "state": "NSW",
			                "street": "146 Arthur Street",
			                "suburb": "North Sydney"
			            },
			            "propertyTypeId": 3,
			            "readyState": "init",
			            "reference": "asdasd",
			            "shortId": "E9eQVYEMkub2",
			            "status": 4,
			            "type": "htv",
			            "valfirm": null,
			            "workflow": "completed"
			        },
			        {
			            "address": {
			                "buildingNumber": "25",
			                "postcode": "4000",
			                "state": "QLD",
			                "street": "Mary St",
			                "suburb": "Brisbane"
			            },
			            "propertyTypeId": 3,
			            "readyState": "init",
			            "reference": "asdas",
			            "shortId": "nQMyWWLBvu4A",
			            "status": 1,
			            "type": "avm",
			            "workflow": "pending"
			        },
			        {
			            "address": {
			                "buildingNumber": "92",
			                "postcode": "2000",
			                "state": "NSW",
			                "street": "Pitt Street",
			                "suburb": "Sydney",
			                "unitNumber": "Suite 1 Level 8"
			            },
			            "propertyTypeId": 3,
			            "readyState": "complete",
			            "reference": "asdasd",
			            "shortId": "ZM73nE4nKH56",
			            "status": 4,
			            "type": "avm",
			            "workflow": "cancelled"
			        },
			        {
			            "address": {
			                "buildingNumber": "28",
			                "lat": -33.912542000000002,
			                "lon": 151.00293199999999,
			                "postcode": "2198",
			                "state": "NSW",
			                "street": "Donington Ave",
			                "suburb": "Georges Hall"
			            },
			            "propertyTypeId": 3,
			            "readyState": "complete",
			            "reference": "asdasdas",
			            "shortId": "AQzAB5xMXFNx",
			            "status": 3,
			            "type": "avm",
			            "workflow": "completed"
			        },
			        {
			            "address": {
			                "buildingNumber": "360",
			                "postcode": "3000",
			                "state": "VIC",
			                "street": "Elizabeth St",
			                "suburb": "Melbourne",
			                "unitNumber": "Level 28"
			            },
			            "propertyTypeId": 3,
			            "readyState": "complete",
			            "reference": "asdas",
			            "shortId": "yebZvgdA7FRk",
			            "status": 1,
			            "type": "htv",
			            "workflow": "completed"
			        },
			        {
			            "address": {
			                "buildingNumber": "153",
			                "postcode": "2229",
			                "state": "NSW",
			                "street": "Denman Avenue",
			                "suburb": "CARINGBAH",
			                "unitNumber": "Suite 7"
			            },
			            "propertyTypeId": 3,
			            "readyState": "complete",
			            "reference": "asdas",
			            "shortId": "YP7NJVNpVCdr",
			            "status": 4,
			            "type": "htv",
			            "workflow": "cancelled"
			        }
			    ];
	        chai.request(server)
            	.post('/')
            	.send({payload: payload})
            	.end((err, res) => {
            		console.log(res.body);
            		res.should.have.status(200);
            		res.body.should.be.a('object');
            		res.body.should.have.property('response');
            		done();
	            });
		});
	});
});