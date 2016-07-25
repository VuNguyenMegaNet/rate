
/**
 * Created by HocSoiCa on 5/10/2016.
 */
var async = require('async');
var crypto = require('crypto');
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

  mysqlDs.automigrate('ktxUsers', function(err) {
    if (err) throw err;
    var pass = '123456';
    var salt = Math.floor(Math.random() * 0x100000000);
    salt = crypto.createHash('md5').update(salt.toString(16)).digest('hex');
    var password = crypto.createHash('md5').update(pass + salt).digest('hex');
    app.models.ktxUsers.create([
      {name: 'superadmin', fullname: 'superadmin', password: password, password_salt: salt, permissions: '1'}
    ], function(err, user) {
      if (err) throw err;

      console.log('Models created: \n', user);
    });
  });

  mysqlDs.automigrate('ktxreport', function(err) {
    if (err) throw err;
    app.models.ktxreport.create([
      {days: '2016-07-21 09:39:07', site_id: '153', site_name: 'ĐH Công Nghiệp', report: [
        {'plan_name': 'CN - 1 Ngay', 'total_rate': 150, 'total_income': 7055000},
        {'plan_name': 'CN - 1 Thang', 'total_rate': 220, 'total_income': 6144000},
        {'plan_name': 'CN - 1G', 'total_rate': 240, 'total_income': 2366000},
        {'plan_name': 'CN - 5G', 'total_rate': 220, 'total_income': 4118000}
      ]},
      {days: '2016-07-21 09:39:07', site_id: '465', site_name: 'ĐH QG Khu A', report: [
        {'plan_name': 'QG - 1 Ngay', 'total_rate': 250, 'total_income': 7028000},
        {'plan_name': 'QG - 1 Thang', 'total_rate': 370, 'total_income': 6134000},
        {'plan_name': 'QG - 1G', 'total_rate': 190, 'total_income': 2356000},
        {'plan_name': 'QG - 5G', 'total_rate': 110, 'total_income': 4189000}
      ]},
      {days: '2016-07-20 09:39:07', site_id: '465', site_name: 'ĐH QG Khu A', report: [
        {'plan_name': 'QG - 1 Ngay', 'total_rate': 450, 'total_income': 7000000},
        {'plan_name': 'QG - 1 Thang', 'total_rate': 320, 'total_income': 6100000},
        {'plan_name': 'QG - 1G', 'total_rate': 140, 'total_income': 2300000},
        {'plan_name': 'QG - 5G', 'total_rate': 120, 'total_income': 4100000}
      ]},
      {days: '2016-07-19 09:39:07', site_id: '465', site_name: 'ĐH QG Khu A', report: [
        {'plan_name': 'QG - 1 Ngay', 'total_rate': 380, 'total_income': 5000000},
        {'plan_name': 'QG - 1 Thang', 'total_rate': 210, 'total_income': 8000000},
        {'plan_name': 'QG - 1G', 'total_rate': 290, 'total_income': 2500000},
        {'plan_name': 'QG - 5G', 'total_rate': 280, 'total_income': 4300000}
      ]},
      {days: '2016-07-18 09:39:07', site_id: '465', site_name: 'ĐH QG Khu A', report: [
        {'plan_name': 'QG - 1 Ngay', 'total_rate': 430, 'total_income': 3200000},
        {'plan_name': 'QG - 1 Thang', 'total_rate': 280, 'total_income': 8000000},
        {'plan_name': 'QG - 1G', 'total_rate': 180, 'total_income': 2500000},
        {'plan_name': 'QG - 5G', 'total_rate': 110, 'total_income': 4300000}
      ]},
      {days: '2016-07-17 09:39:07', site_id: '465', site_name: 'ĐH QG Khu A', report: [
        {'plan_name': 'QG - 1 Ngay', 'total_rate': 340, 'total_income': 7100000},
        {'plan_name': 'QG - 1 Thang', 'total_rate': 450, 'total_income': 6200000},
        {'plan_name': 'QG - 1G', 'total_rate': 320, 'total_income': 2800000},
        {'plan_name': 'QG - 5G', 'total_rate': 185, 'total_income': 4100000}
      ]},
      {days: '2016-07-16 09:39:07', site_id: '465', site_name: 'ĐH QG Khu A', report: [
        {'plan_name': 'QG - 1 Ngay', 'total_rate': 325, 'total_income': 5190000},
        {'plan_name': 'QG - 1 Thang', 'total_rate': 520, 'total_income': 8170000},
        {'plan_name': 'QG - 1G', 'total_rate': 320, 'total_income': 2530000},
        {'plan_name': 'QG - 5G', 'total_rate': 140, 'total_income': 4310000}
      ]},
      {days: '2016-07-15 09:39:07', site_id: '465', site_name: 'ĐH QG Khu A', report: [
        {'plan_name': 'QG - 1 Ngay', 'total_rate': 311, 'total_income': 5110000},
        {'plan_name': 'QG - 1 Thang', 'total_rate': 211, 'total_income': 8720000},
        {'plan_name': 'QG - 1G', 'total_rate': 119, 'total_income': 2530000},
        {'plan_name': 'QG - 5G', 'total_rate': 120, 'total_income': 4350000}
      ]},
      {days: '2016-07-14 09:39:07', site_id: '465', site_name: 'ĐH QG Khu A', report: [
        {'plan_name': 'QG - 1 Ngay', 'total_rate': 300, 'total_income': 5380000},
        {'plan_name': 'QG - 1 Thang', 'total_rate': 290, 'total_income': 4420000},
        {'plan_name': 'QG - 1G', 'total_rate': 198, 'total_income': 2940000},
        {'plan_name': 'QG - 5G', 'total_rate': 168, 'total_income': 4720000}
      ]},
      {days: '2016-07-13 09:39:07', site_id: '465', site_name: 'ĐH QG Khu A', report: [
        {'plan_name': 'QG - 1 Ngay', 'total_rate': 610, 'total_income': 5200000},
        {'plan_name': 'QG - 1 Thang', 'total_rate': 190, 'total_income': 8700000},
        {'plan_name': 'QG - 1G', 'total_rate': 145, 'total_income': 2500000},
        {'plan_name': 'QG - 5G', 'total_rate': 191, 'total_income': 4300000}
      ]},
      {days: '2016-07-12 09:39:07', site_id: '465', site_name: 'ĐH QG Khu A', report: [
        {'plan_name': 'QG - 1 Ngay', 'total_rate': 308, 'total_income': 5700000},
        {'plan_name': 'QG - 1 Thang', 'total_rate': 280, 'total_income': 8600000},
        {'plan_name': 'QG - 1G', 'total_rate': 109, 'total_income': 2100000},
        {'plan_name': 'QG - 5G', 'total_rate': 101, 'total_income': 4310000}
      ]},
      {days: '2016-07-11 09:39:07', site_id: '465', site_name: 'ĐH QG Khu A', report: [
        {'plan_name': 'QG - 1 Ngay', 'total_rate': 412, 'total_income': 5500000},
        {'plan_name': 'QG - 1 Thang', 'total_rate': 325, 'total_income': 8090000},
        {'plan_name': 'QG - 1G', 'total_rate': 231, 'total_income': 2540000},
        {'plan_name': 'QG - 5G', 'total_rate': 191, 'total_income': 4380000}
      ]},
      {days: '2016-07-10 09:39:07', site_id: '465', site_name: 'ĐH QG Khu A', report: [
        {'plan_name': 'QG - 1 Ngay', 'total_rate': 460, 'total_income': 9020000},
        {'plan_name': 'QG - 1 Thang', 'total_rate': 260, 'total_income': 7300000},
        {'plan_name': 'QG - 1G', 'total_rate': 340, 'total_income': 4200000},
        {'plan_name': 'QG - 5G', 'total_rate': 450, 'total_income': 3700000}
      ]},
      {days: '2016-07-09 09:39:07', site_id: '465', site_name: 'ĐH QG Khu A', report: [
        {'plan_name': 'QG - 1 Ngay', 'total_rate': 366, 'total_income': 5070000},
        {'plan_name': 'QG - 1 Thang', 'total_rate': 150, 'total_income': 8030000},
        {'plan_name': 'QG - 1G', 'total_rate': 126, 'total_income': 2590000},
        {'plan_name': 'QG - 5G', 'total_rate': 197, 'total_income': 4390000}
      ]},
      {days: '2016-07-08 09:39:07', site_id: '465', site_name: 'ĐH QG Khu A', report: [
        {'plan_name': 'QG - 1 Ngay', 'total_rate': 434, 'total_income': 5010000},
        {'plan_name': 'QG - 1 Thang', 'total_rate': 222, 'total_income': 8090000},
        {'plan_name': 'QG - 1G', 'total_rate': 232, 'total_income': 2710000},
        {'plan_name': 'QG - 5G', 'total_rate': 321, 'total_income': 3370000}
      ]},
      {days: '2016-07-07 09:39:07', site_id: '465', site_name: 'ĐH QG Khu A', report: [
        {'plan_name': 'QG - 1 Ngay', 'total_rate': 444, 'total_income': 7050000},
        {'plan_name': 'QG - 1 Thang', 'total_rate': 112, 'total_income': 5060000},
        {'plan_name': 'QG - 1G', 'total_rate': 178, 'total_income': 2930000},
        {'plan_name': 'QG - 5G', 'total_rate': 189, 'total_income': 3420000}
      ]},
      {days: '2016-07-06 09:39:07', site_id: '465', site_name: 'ĐH QG Khu A', report: [
        {'plan_name': 'QG - 1 Ngay', 'total_rate': 178, 'total_income': 5040000},
        {'plan_name': 'QG - 1 Thang', 'total_rate': 341, 'total_income': 47800000},
        {'plan_name': 'QG - 1G', 'total_rate': 287, 'total_income': 2710000},
        {'plan_name': 'QG - 5G', 'total_rate': 113, 'total_income': 4400000}
      ]},
      {days: '2016-07-05 09:39:07', site_id: '465', site_name: 'ĐH QG Khu A', report: [
        {'plan_name': 'QG - 1 Ngay', 'total_rate': 476, 'total_income': 4690000},
        {'plan_name': 'QG - 1 Thang', 'total_rate': 154, 'total_income': 7650000},
        {'plan_name': 'QG - 1G', 'total_rate': 152, 'total_income': 3280000},
        {'plan_name': 'QG - 5G', 'total_rate': 199, 'total_income': 3410000}
      ]},
      {days: '2016-07-04 09:39:07', site_id: '465', site_name: 'ĐH QG Khu A', report: [
        {'plan_name': 'QG - 1 Ngay', 'total_rate': 170, 'total_income': 3200000},
        {'plan_name': 'QG - 1 Thang', 'total_rate': 220, 'total_income': 4090000},
        {'plan_name': 'QG - 1G', 'total_rate': 129, 'total_income': 2820000},
        {'plan_name': 'QG - 5G', 'total_rate': 160, 'total_income': 3320000}
      ]},
      {days: '2016-07-03 09:39:07', site_id: '465', site_name: 'ĐH QG Khu A', report: [
        {'plan_name': 'QG - 1 Ngay', 'total_rate': 305, 'total_income': 5070000},
        {'plan_name': 'QG - 1 Thang', 'total_rate': 210, 'total_income': 8070000},
        {'plan_name': 'QG - 1G', 'total_rate': 235, 'total_income': 2570000},
        {'plan_name': 'QG - 5G', 'total_rate': 325, 'total_income': 5410000}
      ]},
      {days: '2016-07-02 09:39:07', site_id: '465', site_name: 'ĐH QG Khu A', report: [
        {'plan_name': 'QG - 1 Ngay', 'total_rate': 540, 'total_income': 9800000},
        {'plan_name': 'QG - 1 Thang', 'total_rate': 470, 'total_income': 8900000},
        {'plan_name': 'QG - 1G', 'total_rate': 380, 'total_income': 5200000},
        {'plan_name': 'QG - 5G', 'total_rate': 310, 'total_income': 5300000}
      ]},
      {days: '2016-07-01 09:39:07', site_id: '465', site_name: 'ĐH QG Khu A', report: [
        {'plan_name': 'QG - 1 Ngay', 'total_rate': 399, 'total_income': 5900000},
        {'plan_name': 'QG - 1 Thang', 'total_rate': 290, 'total_income': 8700000},
        {'plan_name': 'QG - 1G', 'total_rate': 190, 'total_income': 4300000},
        {'plan_name': 'QG - 5G', 'total_rate': 108, 'total_income': 4900000}
      ]},
      {days: '2016-06-30 09:39:07', site_id: '465', site_name: 'ĐH QG Khu A', report: [
        {'plan_name': 'QG - 1 Ngay', 'total_rate': 360, 'total_income': 6730000},
        {'plan_name': 'QG - 1 Thang', 'total_rate': 229, 'total_income': 8680000},
        {'plan_name': 'QG - 1G', 'total_rate': 177, 'total_income': 3410000},
        {'plan_name': 'QG - 5G', 'total_rate': 275, 'total_income': 5390000}
      ]}
    ], function(err, user) {
      if (err) throw err;

      console.log('Models created: \n', user);
    });
  });

  mysqlDs.automigrate('ktxpacks', function(err) {
    if(err) throw err;
    app.models.ktxpacks.create([
      {code: '769387677598',price: '5000', sold_at: '2016-06-28 09:39:07',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '676587765122',price: '80000', sold_at: '2016-06-28 09:35:03',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Thang'},
      {code: '258223449631',price: '5000', sold_at: '2016-06-28 09:31:19',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '550762752728',price: '5000', sold_at: '2016-06-28 09:29:37',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '271494561638',price: '5000', sold_at: '2016-06-28 09:25:49',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '935800045553',price: '5000', sold_at: '2016-06-28 09:24:26',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '094825331838',price: '5000', sold_at: '2016-06-28 09:17:53',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '638135750039',price: '5000', sold_at: '2016-06-28 09:12:21',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '164428401291',price: '5000', sold_at: '2016-06-28 09:10:21',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '050310368546',price: '5000', sold_at: '2016-06-28 09:09:21',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '979440696653',price: '5000', sold_at: '2016-06-28 09:08:01',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '388566218785',price: '5000', sold_at: '2016-06-28 09:07:01',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '567416992737',price: '5000', sold_at: '2016-06-28 09:06:01',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '292052331090',price: '5000', sold_at: '2016-06-28 09:05:01',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '902711331203',price: '5000', sold_at: '2016-06-28 09:04:01',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '251076086850',price: '5000', sold_at: '2016-06-28 09:03:01',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '933465538365',price: '5000', sold_at: '2016-06-28 09:02:01',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '398716722625',price: '5000', sold_at: '2016-06-28 09:00:01',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '673409413321',price: '5000', sold_at: '2016-06-28 08:59:08',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '882043886782',price: '5000', sold_at: '2016-06-28 08:56:11',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '483624394686',price: '5000', sold_at: '2016-06-28 08:55:02',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '663713574133',price: '5000', sold_at: '2016-06-28 08:53:09',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '930005546871',price: '5000', sold_at: '2016-06-28 08:52:08',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '860315266523',price: '5000', sold_at: '2016-06-28 08:51:00',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '652855573227',price: '5000', sold_at: '2016-06-28 08:51:00',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '829073453982',price: '5000', sold_at: '2016-06-28 08:47:46',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '577741355675',price: '5000', sold_at: '2016-06-28 08:46:26',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '156549276141',price: '5000', sold_at: '2016-06-28 08:40:55',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '395275603254',price: '5000', sold_at: '2016-06-28 08:36:04',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '652855573227',price: '5000', sold_at: '2016-06-28 08:33:15',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '829073453982',price: '5000', sold_at: '2016-06-28 08:29:13',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '577741355675',price: '5000', sold_at: '2016-06-28 08:18:07',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '156549276141',price: '5000', sold_at: '2016-06-28 08:15:27',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '395275603254',price: '5000', sold_at: '2016-06-28 07:59:10',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '022179255617',price: '5000', sold_at: '2016-06-28 07:30:16',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '068091620135',price: '5000', sold_at: '2016-06-28 07:21:31',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '710661804885',price: '5000', sold_at: '2016-06-28 07:01:45',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '306287938476',price: '5000', sold_at: '2016-06-28 07:01:45',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '969406774010',price: '5000', sold_at: '2016-06-28 07:01:45',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '348905156092',price: '5000', sold_at: '2016-06-28 06:50:02',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '516434387189',price: '5000', sold_at: '2016-06-28 06:45:35',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '931145065277',price: '5000', sold_at: '2016-06-28 06:43:31',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '587004582507',price: '5000', sold_at: '2016-06-28 06:36:36',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '107101634819',price: '5000', sold_at: '2016-06-28 06:20:39',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '180285489878',price: '5000', sold_at: '2016-06-28 06:20:36',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '581783670530',price: '5000', sold_at: '2016-06-28 06:20:33',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '374467448337',price: '5000', sold_at: '2016-06-28 06:20:29',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '944048752891',price: '5000', sold_at: '2016-06-28 06:20:16',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '742776240014',price: '5000', sold_at: '2016-06-28 06:19:06',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '251999837210',price: '5000', sold_at: '2016-06-28 06:05:47',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '623274847975',price: '5000', sold_at: '2016-06-28 06:05:02',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '062146270887',price: '5000', sold_at: '2016-06-28 05:53:13',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '046215452959',price: '5000', sold_at: '2016-06-28 05:28:03',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '064245975102',price: '5000', sold_at: '2016-06-28 05:20:53',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '378209621189',price: '5000', sold_at: '2016-06-28 05:20:34',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '277335036502',price: '5000', sold_at: '2016-06-28 05:19:24',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '913463359933',price: '5000', sold_at: '2016-06-28 05:16:10',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '859865952193',price: '5000', sold_at: '2016-06-28 04:43:12',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '139664208756',price: '5000', sold_at: '2016-06-28 04:27:53',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '139664208756',price: '5000', sold_at: '2016-06-28 04:21:43',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '175119967829',price: '5000', sold_at: '2016-06-27 04:16:26',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '760064395656',price: '5000', sold_at: '2016-06-27 04:11:10',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '748405159225',price: '5000', sold_at: '2016-06-27 04:10:12',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '591119068230',price: '5000', sold_at: '2016-06-27 04:04:16',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '595239410120',price: '5000', sold_at: '2016-06-27 03:57:31',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '375016598702',price: '5000', sold_at: '2016-06-27 03:57:14',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '497818634525',price: '5000', sold_at: '2016-06-27 03:50:43',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '154483389957',price: '5000', sold_at: '2016-06-27 03:42:35',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '993013573289',price: '5000', sold_at: '2016-06-27 03:42:16',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '142039879765',price: '5000', sold_at: '2016-06-27 03:34:46',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '064569894001',price: '5000', sold_at: '2016-06-27 03:24:11',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '762542362143',price: '5000', sold_at: '2016-06-27 03:24:02',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '121180592395',price: '5000', sold_at: '2016-06-27 03:23:02',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '539992178579',price: '5000', sold_at: '2016-06-27 02:36:33',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '913371203469',price: '5000', sold_at: '2016-06-27 02:35:37',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '395170313034',price: '5000', sold_at: '2016-06-27 02:34:17',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '309191283342',price: '5000', sold_at: '2016-06-27 02:20:36',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '193785562044',price: '5000', sold_at: '2016-06-27 02:20:16',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '949410885803',price: '5000', sold_at: '2016-06-27 02:18:29',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '718936454183',price: '5000', sold_at: '2016-06-27 02:12:56',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '772416477553',price: '5000', sold_at: '2016-06-26 02:12:36',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '847871373867',price: '5000', sold_at: '2016-06-26 02:10:42',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '668845450247',price: '5000', sold_at: '2016-06-26 02:10:10',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '875987489211',price: '5000', sold_at: '2016-06-26 02:09:50',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '686393086064',price: '5000', sold_at: '2016-06-26 02:09:50',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '401798175832',price: '5000', sold_at: '2016-06-26 02:09:48',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '842759538437',price: '5000', sold_at: '2016-06-26 02:00:31',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '859821680360',price: '5000', sold_at: '2016-06-26 02:00:31',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '871224133087',price: '5000', sold_at: '2016-06-25 01:51:56',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '871224133087',price: '5000', sold_at: '2016-06-25 01:48:44',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '599322898720',price: '5000', sold_at: '2016-06-25 01:33:31',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '796786810146',price: '5000', sold_at: '2016-06-25 01:33:31',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '130150253915',price: '5000', sold_at: '2016-06-25 01:33:31',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '392330194943',price: '5000', sold_at: '2016-06-24 01:33:31',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '415360018922',price: '5000', sold_at: '2016-06-24 01:27:49',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '658388940389',price: '5000', sold_at: '2016-06-24 00:20:01',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '717005460773',price: '5000', sold_at: '2016-06-24 16:11:50',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '179808459325',price: '5000', sold_at: '2016-06-24 16:04:47',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '585366839977',price: '5000', sold_at: '2016-06-24 16:04:14',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '285714378057',price: '5000', sold_at: '2016-06-24 15:52:09',site_id: '465', site_name: 'ĐH QG Khu A', plan_name: 'QG - 1 Ngay'},
      {code: '769387677593',price: '5000', sold_at: '2016-06-28 09:39:07',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '676587765123',price: '80000', sold_at: '2016-06-28 09:35:03',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Thang'},
      {code: '258223449633',price: '5000', sold_at: '2016-06-28 09:31:19',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '550762752723',price: '5000', sold_at: '2016-06-28 09:29:37',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '271494561633',price: '5000', sold_at: '2016-06-28 09:25:49',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '935800045553',price: '5000', sold_at: '2016-06-28 09:24:26',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '094825331833',price: '5000', sold_at: '2016-06-28 09:17:53',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '638135750033',price: '5000', sold_at: '2016-06-28 09:12:21',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '164428401293',price: '5000', sold_at: '2016-06-28 09:10:21',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '050310368543',price: '5000', sold_at: '2016-06-28 09:09:21',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '979440696653',price: '5000', sold_at: '2016-06-28 09:08:01',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '388566218783',price: '5000', sold_at: '2016-06-28 09:07:01',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '567416992733',price: '5000', sold_at: '2016-06-28 09:06:01',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '292052331093',price: '5000', sold_at: '2016-06-28 09:05:01',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '902711331203',price: '5000', sold_at: '2016-06-28 09:04:01',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '251076086853',price: '5000', sold_at: '2016-06-28 09:03:01',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '933465538363',price: '5000', sold_at: '2016-06-28 09:02:01',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '398716722623',price: '5000', sold_at: '2016-06-28 09:00:01',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '673409413323',price: '5000', sold_at: '2016-06-28 08:59:08',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '882043886783',price: '5000', sold_at: '2016-06-28 08:56:11',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '483624394683',price: '5000', sold_at: '2016-06-28 08:55:02',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '663713574133',price: '5000', sold_at: '2016-06-28 08:53:09',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '930005546873',price: '5000', sold_at: '2016-06-28 08:52:08',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '860315266523',price: '5000', sold_at: '2016-06-28 08:51:00',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '652855573223',price: '5000', sold_at: '2016-06-28 08:51:00',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '829073453983',price: '5000', sold_at: '2016-06-28 08:47:46',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '577741355673',price: '5000', sold_at: '2016-06-28 08:46:26',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '156549276143',price: '5000', sold_at: '2016-06-28 08:40:55',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '395275603253',price: '5000', sold_at: '2016-06-28 08:36:04',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '652855573223',price: '5000', sold_at: '2016-06-28 08:33:15',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '829073453983',price: '5000', sold_at: '2016-06-28 08:29:13',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '577741355673',price: '5000', sold_at: '2016-06-28 08:18:07',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '156549276143',price: '5000', sold_at: '2016-06-28 08:15:27',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '395275603253',price: '5000', sold_at: '2016-06-28 07:59:10',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '022179255613',price: '5000', sold_at: '2016-06-28 07:30:16',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '068091620133',price: '5000', sold_at: '2016-06-28 07:21:31',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '710661804883',price: '5000', sold_at: '2016-06-28 07:01:45',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '306287938473',price: '5000', sold_at: '2016-06-28 07:01:45',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '969406774013',price: '5000', sold_at: '2016-06-28 07:01:45',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '348905156093',price: '5000', sold_at: '2016-06-28 06:50:02',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '516434387183',price: '5000', sold_at: '2016-06-28 06:45:35',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '931145065273',price: '5000', sold_at: '2016-06-28 06:43:31',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '587004582503',price: '5000', sold_at: '2016-06-28 06:36:36',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '107101634813',price: '5000', sold_at: '2016-06-28 06:20:39',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '180285489873',price: '5000', sold_at: '2016-06-28 06:20:36',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '581783670533',price: '5000', sold_at: '2016-06-28 06:20:33',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '374467448333',price: '5000', sold_at: '2016-06-28 06:20:29',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '944048752893',price: '5000', sold_at: '2016-06-28 06:20:16',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '742776240013',price: '5000', sold_at: '2016-06-28 06:19:06',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '251999837213',price: '5000', sold_at: '2016-06-28 06:05:47',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '623274847973',price: '5000', sold_at: '2016-06-28 06:05:02',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '062146270883',price: '5000', sold_at: '2016-06-28 05:53:13',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '046215452953',price: '5000', sold_at: '2016-06-28 05:28:03',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '064245975103',price: '5000', sold_at: '2016-06-28 05:20:53',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '378209621183',price: '5000', sold_at: '2016-06-28 05:20:34',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '277335036503',price: '5000', sold_at: '2016-06-28 05:19:24',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '913463359932',price: '5000', sold_at: '2016-06-28 05:16:10',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '859865952192',price: '5000', sold_at: '2016-06-28 04:43:12',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '139664208753',price: '5000', sold_at: '2016-06-28 04:27:53',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '139664208753',price: '5000', sold_at: '2016-06-28 04:21:43',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '175119967823',price: '5000', sold_at: '2016-06-27 04:16:26',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '760064395653',price: '5000', sold_at: '2016-06-27 04:11:10',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '748405159223',price: '5000', sold_at: '2016-06-27 04:10:12',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '591119068233',price: '5000', sold_at: '2016-06-27 04:04:16',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '595239410123',price: '5000', sold_at: '2016-06-27 03:57:31',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '375016598703',price: '5000', sold_at: '2016-06-27 03:57:14',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '497818634523',price: '5000', sold_at: '2016-06-27 03:50:43',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '154483389953',price: '5000', sold_at: '2016-06-27 03:42:35',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '993013573283',price: '5000', sold_at: '2016-06-27 03:42:16',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '142039879763',price: '5000', sold_at: '2016-06-27 03:34:46',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '064569894003',price: '5000', sold_at: '2016-06-27 03:24:11',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '762542362142',price: '5000', sold_at: '2016-06-27 03:24:02',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '121180592393',price: '5000', sold_at: '2016-06-27 03:23:02',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '539992178573',price: '5000', sold_at: '2016-06-27 02:36:33',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '913371203463',price: '5000', sold_at: '2016-06-27 02:35:37',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '395170313033',price: '5000', sold_at: '2016-06-27 02:34:17',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '309191283343',price: '5000', sold_at: '2016-06-27 02:20:36',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '193785562043',price: '5000', sold_at: '2016-06-27 02:20:16',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '949410885802',price: '5000', sold_at: '2016-06-27 02:18:29',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '718936454182',price: '5000', sold_at: '2016-06-27 02:12:56',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '772416477552',price: '5000', sold_at: '2016-06-26 02:12:36',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '847871373863',price: '5000', sold_at: '2016-06-26 02:10:42',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '668845450243',price: '5000', sold_at: '2016-06-26 02:10:10',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '875987489213',price: '5000', sold_at: '2016-06-26 02:09:50',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '686393086063',price: '5000', sold_at: '2016-06-26 02:09:50',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '401798175833',price: '5000', sold_at: '2016-06-26 02:09:48',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '842759538433',price: '5000', sold_at: '2016-06-26 02:00:31',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '859821680363',price: '5000', sold_at: '2016-06-26 02:00:31',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '871224133083',price: '5000', sold_at: '2016-06-25 01:51:56',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '871224133083',price: '5000', sold_at: '2016-06-25 01:48:44',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '599322898723',price: '5000', sold_at: '2016-06-25 01:33:31',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '796786810143',price: '5000', sold_at: '2016-06-25 01:33:31',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '130150253913',price: '5000', sold_at: '2016-06-25 01:33:31',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '392330194942',price: '5000', sold_at: '2016-06-24 01:33:31',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '415360018923',price: '5000', sold_at: '2016-06-24 01:27:49',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '658388940383',price: '5000', sold_at: '2016-06-24 00:20:01',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '717005460772',price: '5000', sold_at: '2016-06-24 16:11:50',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '179808459323',price: '5000', sold_at: '2016-06-24 16:04:47',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '585366839973',price: '5000', sold_at: '2016-06-24 16:04:14',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'},
      {code: '285714378053',price: '5000', sold_at: '2016-06-24 15:52:09',site_id: '153', site_name: 'ĐH Công Nghiệp', plan_name: 'CN - 1 Ngay'}
    ], function(err, packs) {
      if(err) throw err;
      console.log('Models packs created: \n', packs);
    });
  });
}


