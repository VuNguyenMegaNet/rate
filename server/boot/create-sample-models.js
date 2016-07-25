/**
 * Created by HocSoiCa on 5/10/2016.
 */
var async = require('async');
module.exports = function (app) {
  //data sources
  var mysqlDs = app.dataSources.mysqlDs;

  //create all models
  async.parallel({
    ktxrate: async.apply(create_ktxRate),
  }, function (err, results) {
    if (err) throw err;
    console.log(results);
  });

  //create Tracking
  function create_ktxRate(cb) {
    mysqlDs.autoupdate('ktxrate', function (err) {
      if (err) return cb(err);
      console.log("Create ktxrate Model Successfully");
    });
  }
}


