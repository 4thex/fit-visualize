let d3 = require("d3");
QUnit.module('distance', function() {
  QUnit.test('is calculated correctly', function(assert) {
    assert.ok(d3);
    let radians = d3.geoDistance([-74.046271, 40.688537],[-73.985175, 40.748923]);
    let distance = radians*6.378E3;
    assert.equal(distance.toPrecision(6), 8.47086);
  });
});
