module.exports = function(app) {
  var promise = require('bluebird');
  var moment = require('moment');
  var cron = require('cron');

  var Packs = app.models.Packs,
    Ktxrate = app.models.Ktxrate,
    Ktxpacks = app.models.Ktxpacks,
    Ktxreport = app.models.Ktxreport,
    Agents = app.models.Agents,
    Plans = app.models.Plans,
    ds = app.dataSources.mysqlDs,
    Sites = app.models.Sites,
    CronJob = cron.CronJob;

  var job1 = new CronJob('0 30 01 * * *', function() {
    var startYesterday = moment().subtract(1, 'days').startOf('day').format("YYYY-MM-DD HH:mm:ss"),
      endYesterday = moment().subtract(1, 'days').endOf('day').format("YYYY-MM-DD HH:mm:ss");
    Ktxrate
      .find()
      .then(function(data){
        data.forEach(function(item) {
          var value = JSON.parse(item.value);
          var number = value.Number,
            percent = value.Percent,
            exchangeValue = value.Exchange.value,
            siteId = item.site_id,
            idAgent = [];
          Agents
            .find({
              fields: { id: true },
              where: {
                site3_id: item.site_id
              }
            })
            .then(function(agents) {
              return promise.map(agents, function(agent) {
                return idAgent.push(agent.id);
              });
            })
            .then(function(a) {
              if(item.type == 'Number') {
                Packs
                  .count({
                    status: '011',
                    sold_at: { between: [startYesterday,endYesterday] },
                    distribute_to_id: { inq: idAgent },
                    plan_id: item.plan_id
                  })
                  .then(function(countPack) {
                    var tmp = countPack - number;
                    return Packs
                      .find({
                        fields: { code: true, price: true, sold_at: true, status: true, distribute_to_id: true, plan_id: true},
                        where: {
                          status: '011',
                          sold_at: { between: [startYesterday,endYesterday] },
                          distribute_to_id: { inq: idAgent },
                          plan_id: item.plan_id
                        },
                        limit: tmp > 0 ? tmp : null
                      });
                  })
                  .then(function(packs) {
                    return promise.map(packs, function(pack) {
                      return Ktxpacks
                        .create({
                          code: pack.code,
                          price: pack.price,
                          sold_at: pack.sold_at,
                          site_id: item.site_id,
                          site_name: item.site_name,
                          plan_name: item.plan_name
                        });
                    });
                  })
                  .then(function(createdPacks) {
                    console.log(createdPacks);
                  })
                  .catch(function(err) {
                    console.log(err);
                  });
              }
              else if(item.type == 'Percent') {
                Packs
                  .count({
                    status: '011',
                    sold_at: { between: [startYesterday,endYesterday] },
                    distribute_to_id: { inq: idAgent },
                    plan_id: item.plan_id
                  })
                  .then(function(pack) {
                    console.log(pack);
                    var tmpPercent = Math.round((pack*percent)/100);
                    var nLimit = Math.round(pack - tmpPercent);

                    return (nLimit > 0) ? Packs
                      .find({
                        fields: { code: true, price: true, sold_at: true, status: true, distribute_to_id: true, plan_id: true },
                        where: {
                          status: '011',
                          sold_at: { between: [startYesterday,endYesterday] },
                          distribute_to_id: { inq: idAgent },
                          plan_id: item.plan_id
                        },
                        limit: nLimit
                      }) : [];
                  })
                  .then(function(percents) {
                    return promise.map(percents, function(percent) {
                      return Ktxpacks
                        .create({
                          code: percent.code,
                          price: percent.price,
                          sold_at: percent.sold_at,
                          site_id: item.site_id,
                          site_name: item.site_name,
                          plan_name: item.plan_name
                        });
                    });
                  })
                  .then(function(createdPercents) {
                    console.log(createdPercents);
                  })
                  .catch(function(err) {
                    console.log(err);
                  });
              }
              else {
                promise
                  .all([
                    Packs
                      .find({
                        fields: { code: true, price: true, sold_at: true, status: true, distribute_to_id: true, plan_id: true },
                        where: {
                          status: '011',
                          sold_at: { between: [startYesterday,endYesterday] },
                          distribute_to_id: { inq: idAgent },
                          plan_id: item.plan_id
                        }
                      }),
                    Ktxrate
                      .find({
                        fields: { site_id: true, plan_id: true, plan_name: true },
                        where: {
                          plan_id: exchangeValue,
                          site_id: item.site_id,
                        }
                      }),
                    Packs
                      .findOne({
                        fields: { plan_id: true, price: true },
                        where: {
                          plan_id: exchangeValue
                        }
                      })
                  ]).spread(function(packs, planName, pR) {
                    var fPrice = pR.price;
                    return promise.map(packs, function(itemExchange) {
                      return promise.map(planName, function(pN) {
                        return Ktxpacks.create({
                          code: itemExchange.code,
                          price: fPrice,
                          sold_at: itemExchange.sold_at,
                          site_id: item.site_id,
                          site_name: item.site_name,
                          plan_name: pN.plan_name
                        });
                      });
                    });
                  })
                  .then(function (createdPacks) {
                    console.log(createdPacks);
                  })
                  .catch(function (err) {
                    console.log(err);
                  });
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  }, null, true, 'ASIA/Ho_Chi_Minh');

  var job2 = new CronJob('0 40 01 * * *', function() {
    var startYesterday = moment().subtract(1, 'days').startOf('day').format("YYYY-MM-DD HH:mm:ss"),
      currentYesterday = moment().subtract(1, 'days').format("YYYY-MM-DD HH:mm:ss"),
      endYesterday = moment().subtract(1, 'days').endOf('day').format("YYYY-MM-DD HH:mm:ss"),
      sql = "SELECT site_id,site_name,plan_name, COUNT(*) as total_rate,SUM(price) as total_price FROM ktxpacks WHERE sold_at BETWEEN " + "'"+startYesterday+"'" + " AND "
        + "'"+endYesterday+"'" + " GROUP BY plan_name, site_id";

    ds.connector.query(sql, function(err, totals) {
      if(err) console.log(err);

      var reportTotal = {};
      totals.forEach(function(item) {
        if (!reportTotal[item.site_name]) {
          reportTotal[item.site_name] = {};
          reportTotal[item.site_name]['report'] = [];
        }
        reportTotal[item.site_name]['site_id'] = item.site_id;
        reportTotal[item.site_name]['report'].push({
          "plan_name": item.plan_name,
          "total_rate": item.total_rate,
          "total_income": item.total_price
        });
      });

      for(var key in reportTotal) {
        if(!reportTotal.hasOwnProperty(key)) {
          console.log("error");
        }

        Ktxreport
          .create({
            days: currentYesterday,
            site_id: reportTotal[key]['site_id'],
            site_name: key,
            report: reportTotal[key]['report']
          })
          .then(function(createdReport) {
            console.log(createdReport);
          })
          .catch(function(err) {
            console.log("err");
            console.log(err);
          });
      }
    });
  }, null, true, 'ASIA/Ho_Chi_Minh');

  //function tmp(PlanId, startDate, endDate, idAgent) {
  //  var dateList = [];
  //  while(startDate.isBefore(endDate)) {
  //    dateList.push(startDate.format('YYYY-MM-DD'));
  //    startDate = startDate.add(1, 'd');
  //  }
  //  dateList.push(startDate.format('YYYY-MM-DD'));
  //
  //  promise.mapSeries(dateList, function(date) {
  //    var fromdate = moment(date).startOf('day').format("YYYY-MM-DD HH:mm:ss"),
  //      todate = moment(date).endOf('day').format("YYYY-MM-DD HH:mm:ss");
  //
  //    return promise.map(PlanId, function(item) {
  //      return promise.all([
  //          Packs
  //            .count({
  //              status: '011',
  //              sold_at: { between: [fromdate, todate] },
  //              distribute_to_id: { inq: idAgent },
  //              plan_id: item.planId
  //            }),
  //          Plans
  //            .findOne({
  //              fields: { id: true, name: true },
  //              where: {
  //                id: item.planId
  //              }
  //            })
  //      ])
  //        .spread(function(pack, plan) {
  //          console.log("pack: " + pack);
  //          var tmpPercent = Math.round((pack*30)/100);
  //          var nLimit = Math.round(pack - tmpPercent);
  //          console.log("tmpPercent: " + tmpPercent);
  //          console.log("nLimit: " + nLimit);
  //          return (nLimit > 0) ? [Packs
  //            .find({
  //              fields: { code: true, price: true, sold_at: true, status: true, distribute_to_id: true, plan_id: true },
  //              where: {
  //                status: '011',
  //                sold_at: { between: [fromdate, todate] },
  //                distribute_to_id: { inq: idAgent },
  //                plan_id: item.planId
  //              },
  //              limit: nLimit
  //            }), plan.name] : [[], plan.name];
  //        })
  //        .spread(function(pack, plan) {
  //          return promise.map(pack, function(percent) {
  //            return Ktxpacks
  //              .create({
  //                code: percent.code,
  //                price: percent.price,
  //                sold_at: percent.sold_at,
  //                site_id: '470',
  //                site_name: 'ĐH QG Khu B',
  //                plan_name: plan
  //              });
  //          });
  //        })
  //        .then(function(createdPercents) {
  //          console.log(createdPercents);
  //        })
  //        .catch(function(err) {
  //          console.log(err);
  //        });
  //    });
  //  });
  //}
  //
  //var PlanId = [
  //  {"planId": 63},
  //  {"planId": 64},
  //  {"planId": 89},
  //  {"planId": 90},
  //  {"planId": 91},
  //  {"planId": 92},
  //  {"planId": 93}
  //];
  //
  //var startDate = moment("2016-08-01");
  //var endDate = moment("2016-08-08");
  //var idAgent = [386];
  ////tmp(PlanId, startDate, endDate, idAgent);
  //
  //function report2(startDate2, endDate2) {
  //  var dateList2 = [];
  //  while(startDate2.isBefore(endDate2)) {
  //    dateList2.push(startDate2.format('YYYY-MM-DD'));
  //    startDate2 = startDate2.add(1, 'd');
  //  }
  //  dateList2.push(startDate2.format('YYYY-MM-DD'));
  //
  //  promise.mapSeries(dateList2, function(date) {
  //    var fromdate2 = moment(date).startOf('day').format("YYYY-MM-DD HH:mm:ss"),
  //      todate2 = moment(date).endOf('day').format("YYYY-MM-DD HH:mm:ss"),
  //      sql = "SELECT site_id,site_name,plan_name, COUNT(*) as total_rate,SUM(price) as total_price FROM ktxpacks WHERE sold_at BETWEEN " + "'"+fromdate2+"'" + " AND "
  //      + "'"+todate2+"'" + " GROUP BY plan_name, site_id";
  //
  //    ds.connector.query(sql, function(err, totals) {
  //      if(err) console.log(err);
  //
  //      var reportTotal = {};
  //      totals.forEach(function(item) {
  //        if (!reportTotal[item.site_name]) {
  //          reportTotal[item.site_name] = {};
  //          reportTotal[item.site_name]['report'] = [];
  //        }
  //        reportTotal[item.site_name]['site_id'] = item.site_id;
  //        reportTotal[item.site_name]['report'].push({
  //          "plan_name": item.plan_name,
  //          "total_rate": item.total_rate,
  //          "total_income": item.total_price
  //        });
  //      });
  //
  //      for(var key in reportTotal) {
  //        if(!reportTotal.hasOwnProperty(key)) {
  //          console.log("error");
  //        }
  //
  //        Ktxreport
  //          .create({
  //            days: fromdate2,
  //            site_id: reportTotal[key]['site_id'],
  //            site_name: key,
  //            report: reportTotal[key]['report']
  //          })
  //          .then(function(createdReport) {
  //            console.log(createdReport);
  //          })
  //          .catch(function(err) {
  //            console.log("err");
  //            console.log(err);
  //          });
  //      }
  //    });
  //  });
  //}
  //
  //var startDate2 = moment("2015-11-18");
  //var endDate2 = moment("2016-08-08");
  ////report2(startDate2, endDate2);
};
