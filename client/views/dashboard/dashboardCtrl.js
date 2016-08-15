angular
  .module('app')
  .controller('DashboardCtrl', ['$scope', '$rootScope', '$filter', 'Ktxpacks', 'Ktxreport', 'Sites', '$q', function($scope, $rootScope, $filter, Ktxpacks, Ktxreport, Sites, $q) {
    $scope.dates = {
      startDate: moment().subtract(7, 'days').startOf('day').format("YYYY-MM-DD HH:mm:ss"),
      endDate: moment().endOf('day').format("YYYY-MM-DD HH:mm:ss")
    };
    $scope.ranges = {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'One Week': [moment().subtract(7, 'days'), moment()],
      'Two Weeks': [moment().subtract(14, 'days'), moment()],
      'This month': [moment().startOf('month'), moment()],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    };

    $scope.changedates = function() {
      getPage($scope.dates, $scope.dash.site);
      getDateChart($scope.dates, $scope.dash.site, $scope.render, $scope.nameChart);
    };

    $scope.changeSite = function() {
      getPage($scope.dates, $scope.dash.site);
      getDateChart($scope.dates, $scope.dash.site, $scope.render, $scope.nameChart);
    };

    function callSites() {
      Sites
        .find({
          filter: {
            fields: {
              name: true,
              id: true
            },
            where: {
              site2_id : '10'
            }
          }
        })
        .$promise
        .then(function(sites) {
          $rootScope.Sites = sites;
        }, function(err) {
          console.log(err);
        });
    };

    function callSitesEdit(idGet) {
      Sites
        .find({
          filter: {
            fields: {
              name: true,
              id: true
            },
            where: {
              site2_id : '10',
              id: { inq: idGet }
            }
          }
        })
        .$promise
        .then(function(sites) {
          $rootScope.Sites = sites;
        }, function(err) {
          console.log(err);
        });
    };

    var checkSite = function() {
      if($rootScope.securityInfo.current_user.permissions == 2) {
        $scope.dash = {
          site: $rootScope.securityInfo.current_user.sitesId[0].id
        };
        var inq = $rootScope.securityInfo.current_user.sitesId;
        var Ainq = [];
        inq.forEach(function(item) {
          Ainq.push(item.id);
        });
        callSitesEdit(Ainq);
      }else {
        callSites();
        $scope.dash = {
          site: 465
        };
      }
    };

    new checkSite();

    //////////////////////Grid///////////////////////
    ////////////////////////////////////////////////
    var paginationOptions = {
      pageNumber: 1,
      pageSize: 20,
      sort: null
    };

    $scope.gridOptions = {
      rowHeight: 40,
      enableGridMenu: true,
      fastWatch: true,
      onRegisterApi: function (gridApi) {
        $scope.gridApi = gridApi;
        gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
          paginationOptions.pageNumber = newPage;
          paginationOptions.pageSize = pageSize;
          getPage($scope.dates, $scope.dash.site);
        });
      },
      paginationPageSizes: [10, 20, 50, 9999],
      paginationPageSize: 20,
      useExternalPagination: true
    };

    $scope.gridOptions.columnDefs =  [
      { name:'code', width:'20%', pinnedLeft:true, headerCellClass: 'colorHeader' },
      { name:'price', headerCellClass: 'colorHeader' },
      { name:'site', field: 'site_name', width:150, headerCellClass: 'colorHeader'  },
      { name:'plan', field: 'plan_name', width:150, headerCellClass: 'colorHeader' },
      { name:'sold at', field:'sold_at', headerCellClass: 'colorHeader', width: 150 }
    ];

    var getPage = function(date, site) {
      $scope.data = [];
      // Đây là những thông số dùng để limit row
      if(paginationOptions.pageNumber == 1) {
        $scope.offest = 0;
      } else {
        $scope.offest = (paginationOptions.pageNumber * paginationOptions.pageSize) - paginationOptions.pageSize;
      }

      var startdate = moment($scope.dates.startDate).format("YYYY-MM-DD HH:mm:ss");
      var enddate = moment($scope.dates.endDate).format("YYYY-MM-DD HH:mm:ss");
      ////////////////////SQL QUERY GRID///////////////////////////
      //SELECT * FROM `ktxpacks` WHERE `sold_at` BETWEEN '2016-06-28 00:00:00.000000' AND '2016-06-28 23:59:59.999999' AND `site_id` = 465 LIMIT 10 OFFSET 0
      Ktxpacks
        .find({
          filter: {
            where: {
              sold_at: { between: [startdate,enddate] },
              site_id: site
            },
            limit: paginationOptions.pageSize,
            skip: $scope.offest
          }
        }).$promise
        .then(function(packs) {
          packs.forEach(function(item) {
            //var pRice = ;
            $scope.data.push({
              code: item.code,
              price: item.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
              site_name: item.site_name,
              plan_name: item.plan_name,
              sold_at: moment(item.sold_at).format("DD/MM, HH:mm")
            });
          });

          $scope.gridOptions.data = $scope.data;
        }, function(err) {
          console.log("error packs: " + err);
        });
      ////////////////////////////SQL COUNT QUERY/////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////
      //SELECT COUNT(*) FROM `ktxpacks` WHERE `sold_at` BETWEEN '2016-06-28 00:00:00.000000' AND '2016-06-28 23:59:59.999999' AND `site_id` = 465
      Ktxpacks
        .count({
            where: {
              sold_at: { between: [startdate,enddate] },
              site_id: site
            }
        }).$promise
        .then(function(packs) {
          $scope.gridOptions.totalItems = packs.count;// số này là số phía server phải trả về ( có dạng là total )
        }, function(err) {
          console.log("error count: " + err);
        });
    };

    getPage($scope.dates, $scope.dash.site);

    $scope.gridtab = false;
    $('.Chart-view').addClass('active');
    $('.Grid-view').removeClass('active');

    $scope.clickgrid = function() {
      $scope.gridtab = true;
      $('.Chart-view').removeClass('active');
      $('.Grid-view').addClass('active');
      $scope.gridApi.core.handleWindowResize();
      getPage($scope.dates, $scope.dash.site);
    };

    $scope.clickchart = function() {
      $scope.gridtab = false;
      $('.Grid-view').removeClass('active');
      $('.Chart-view').addClass('active');
      initDetailChart($scope.chartSeries);
      getDateChart($scope.dates, $scope.dash.site, $scope.render, $scope.nameChart);
    };

    /////////////////////Detail Chart///////////////////////
    ///////////////////////////////////////////////////////
    var chartInstance = null;
    var initDetailChart = function(chartSeries) {
      var initDetailChartOptions = {
        chart: {
          margin: [10, 0, 10, 0],
          spacingTop: 10,
          spacingBottom: 0,
          spacingLeft: 0,
          spacingRight: 0,
          reflow: true,
          backgroundColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 1,
              y2: 1
            },
            stops: [
              [0, 'rgb(255, 255, 255)'],
              [1, 'rgb(220, 230, 236)']
            ]
          },
          renderTo: 'detailChart'
        },
        exporting: { enabled: false },
        credits: { enabled: false },
        rangeSelector: { enabled: false, inputEnabled: false},
        legend: {
          enabled: true,
          layout: 'horizontal',
          align: 'right',
          verticalAlign: 'top',
          x: -10,
          y: 20,
          floating: true
        },
        title: {
          text: ''
        },
        colors: [
          '#70A532', '#FBC02D', '#E98F2E', '#715146', '#3583CA', '#37A9B7', '#178D81', '#279566', '#D6494B', '#E53B75', '#6D45BC', '#465BD4',
          '#BAD896', '#F8E59B', '#F6BE80', '#B98E7E', '#A2CAEE', '#9AE1E9', '#79D1C9', '#7DD3AE', '#FA9898', '#FB8DB4', '#BBA7E4', '#9DAAF3'
        ],
        plotOptions: {
          column: {
            stacking: 'normal',
            dataLabels: {
              style: {
                color: '#000',
                fontSize: '9px',
                fontWeight: 'bold',
                letterSpacing: '1px'
              },
              enabled: true,
              formatter: function () {
                if (this.y > 0 && this.point.shapeArgs.height >= 15) {
                  return this.y;
                } else {
                  return null;
                }
              }
            },
            borderWidth: 0
          }
        },
        tooltip: {
          formatter: function () {
            var xValue;
            if (this.x === parseInt(this.x, 10)) {
              xValue = moment(this.x).format("dddd, MMMM DD YYYY");
            } else {
              xValue = this.x;
            }

            var header = '<span style="font-size: 14px;">' + xValue + '</span><br><br>';
            var content = "<table><tr><td style='padding:0; color: gray'>Total: </td><td style='padding:0; color: gray'><b>&nbsp;" + this.points[0].total + "</b></td></tr>";
            this.points.forEach(function (item) {
              content += '<tr><td style="color:' + item.series.color + ';padding:0">' + item.series.name + ': </td><td style="padding:0"><b>&nbsp;' + item.y + ' ~ ' + item.percentage.toFixed(0) + '%</b></td></tr>';
            });

            return header + content + '</table>';
          },
          shared: true,
          useHTML: true
        },
        xAxis: {
          tickWidth: 0,
          lineColor: "#f0f0f0",
          labels: {
            style: { color: "#22313F", fontWeight: "bold" }
          },
          type: 'datetime',
          dateTimeLabelFormats: {
            day: '%b %d',
            month: '%b-%Y',
            year: '%Y'
          }
        },
        yAxis: [{
          gridLineColor: '#f0f0f0',
          labels: { enabled: false},
          min: 0,
          opposite: false
        }],
        series: chartSeries
      };
      chartInstance = new Highcharts.StockChart(initDetailChartOptions);
    };

    var dateList = [];

    var getDateChart = function(dates, sitesId, renderSummaryChart, nameSummaryChart) {
      $scope.chartSeries = [];
      dateList = [];
      var fromDate = moment(dates.startDate), toDate = moment(dates.endDate);

      ////////////////////SQL QUERY CHART///////////////////////////
      //SELECT * FROM `ktxreport` WHERE `days` BETWEEN '2016-07-15 00:00:00.000000' AND '2016-07-20 23:59:59.999999' AND `site_id` = 465
      Ktxreport
        .find({
          filter: {
            where: {
              days: { between: [fromDate.format("YYYY-MM-DD HH:mm:ss"),toDate.format("YYYY-MM-DD HH:mm:ss")] },
              site_id: sitesId
            }
          }
        }).$promise
        .then(function(data) {
          var reportData = {};
          var reportDataIncome = {};
          $scope.reportsummaryData = [];
          data.forEach(function(item) {
            item.report.forEach(function(plan) {
              if (!reportData[plan.plan_name]) {
                reportData[plan.plan_name] = {};
                reportDataIncome[plan.plan_name] = {};
              }
              reportData[plan.plan_name][moment(item.days).format("YYYY-MM-DD")] = plan.total_rate;
              reportDataIncome[plan.plan_name][moment(item.days).format("YYYY-MM-DD")] = plan.total_income;
            });
          });

          if(renderSummaryChart == 'render_chart_rate') {
            for(var key in reportData) {
              var total = 0;
              for(var key2 in reportData[key]) {
                total = reportData[key][key2] + total;
              }
              $scope.reportsummaryData.push({name: key, y: total})
            }
          }else {
            for(var key in reportDataIncome) {
              var total = 0;
              for(var key2 in reportDataIncome[key]) {
                total = reportDataIncome[key][key2] + total;
              }
              $scope.reportsummaryData.push({name: key, y: total})
            }
          }

          while(fromDate.isBefore(toDate)) {
            dateList.push(fromDate.format('YYYY-MM-DD'));
            fromDate = fromDate.add(1, 'd');
          }

          for(var key in reportData) {
            if(!reportData.hasOwnProperty(key)) { continue; }
            if(key === 'NONE') { continue; }

            var preparedChartData = [];
            for(var i = 0; i < dateList.length; i++) {
              var date = dateList[i];
              if(!(date in reportData[key])) {
                preparedChartData.push([Date.parse(date), 0]);
              }else {
                preparedChartData.push([Date.parse(date), reportData[key][date]]);
              }
            }

            $scope.optionsSeries = {
              type: 'column',
              name: key,
              data: preparedChartData,
              yAxis: 0,
              dataGrouping: {
                groupPixelWidth: 30,
                approximation: "sum",
                enabled: true,
                units: [['week', [1]], ['month', [1]]],
                dateTimeLabelFormats: {
                  week: ['Week from %A, %b %e, %Y', '%A, %b %e', '-%A, %b %e, %Y'],
                  month: ['%B %Y', '%B', '-%B %Y']
                }
              }
            }
            $scope.chartSeries.push($scope.optionsSeries);
          }
          initDetailChart($scope.chartSeries);
          initSummaryChart(renderSummaryChart,nameSummaryChart,$scope.reportsummaryData);
        }, function(err) {
          console.log("error rates: " + err);
        });
    };

    ///////////////////Summary Chart////////////////////
    ///////////////////////////////////////////////////
    var initSummaryChart = function(renderTo, nameChart, preparedSummaryChartData) {
      var initSummaryChartOptions = {
        chart: {
          renderTo: renderTo,
          margin: [10, 0, 10, 0],
          spacingTop: 10,
          spacingBottom: 0,
          spacingLeft: 0,
          spacingRight: 0
        },
        exporting: { enabled: true },
        credits: { enabled: false },
        title: { text: nameChart, verticalAlign: 'middle', align: 'center', style: { fontWeight: "bold" } },
        colors: [
          '#70A532', '#FBC02D', '#E98F2E', '#715146', '#3583CA', '#37A9B7', '#178D81', '#279566', '#D6494B', '#E53B75', '#6D45BC', '#465BD4',
          '#BAD896', '#F8E59B', '#F6BE80', '#B98E7E', '#A2CAEE', '#9AE1E9', '#79D1C9', '#7DD3AE', '#FA9898', '#FB8DB4', '#BBA7E4', '#9DAAF3'
        ],
        plotOptions: {
          pie: {
            size: '70%',
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              color: '#223344',
              connectorColor: '#223344',
              formatter: function () {
                if (this.y > 0) {
                  if(renderTo == "render_chart_income") {
                    return '<span style="color: ' + this.point.color + ';font-weight:normal">' + this.point.name + ': ' +  this.percentage.toFixed(2) + '% [' + this.y.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ' VND]</span>';
                  }else {
                    return '<span style="color: ' + this.point.color + ';font-weight:normal">' + this.point.name + ': ' +  this.percentage.toFixed(2) + '% [' + this.y + ']</span>';
                  }
                } else {
                  return null;
                }
              },
              style: { fontSize: 17 }
            },
            showInLegend: true
          }
        },
        tooltip: {
          formatter: function () {
            var header = '<span style="font-size: 14px;">' + this.key + '</span><br><br>';
            if(renderTo == "render_chart_income") {
              var content = "<table>" +
                "<tr><td style='padding:0; color: gray'>Total: </td><td style='padding:0; color: gray'><b>&nbsp;" + this.point.total.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " VND" + "</b></td></tr>";

              content += '<tr><td style="color:' + this.point.color + ';padding:0">' + this.point.name + ': </td><td style="padding:0"><b>&nbsp;' + this.point.y.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ' VND' + ' ~ ' + this.point.percentage.toFixed(0) + '%</b></td></tr>';
            }else {
              var content = "<table>" +
                "<tr><td style='padding:0; color: gray'>Total: </td><td style='padding:0; color: gray'><b>&nbsp;" + this.point.total + "</b></td></tr>";

              content += '<tr><td style="color:' + this.point.color + ';padding:0">' + this.point.name + ': </td><td style="padding:0"><b>&nbsp;' + this.point.y + ' ~ ' + this.point.percentage.toFixed(0) + '%</b></td></tr>';
            }
            return header + content + '</table>';
          },
          shared: true,
          useHTML: true
        },
        legend: {
          enabled: true,
          floating: true,
          align: 'right',
          verticalAlign: 'middle',
          layout: 'vertical',
          x: -50,
          y: 0,
          labelFormatter: function () {
            return this.name;
          }
        },
        series: [{
          type: "pie",
          name: "Pie Chart",
          data: preparedSummaryChartData,
          startAngle: 0,
          innerSize: '50%'
        }]
      };
      chartInstance = new Highcharts.Chart(initSummaryChartOptions);
    };

    ///////////////////interactive////////////////////
    /////////////////////////////////////////////////
    $('#summary_chart').css('background-color','rgba(128,128,128,0.2)');
    $('#summaryChart').css('display','');
    $('#detailChart').css('display','none');

    $('#summary_chart').click(function() {
      $('#summaryChart').css('display','');
      $('#summary_chart').css('background-color','rgba(128,128,128,0.2)');
      $('#detail_chart').css('background-color','rgb(255,255,255)');
      $('#detailChart').css('display','none');
      getDateChart($scope.dates, $scope.dash.site, $scope.render, $scope.nameChart);
    });

    $('#detail_chart').click(function() {
      $('#summaryChart').css('display','none');
      $('#summary_chart').css('background-color','rgb(255,255,255)');
      $('#detail_chart').css('background-color','rgba(128,128,128,0.2)');
      $('#detailChart').css('display','');
      initDetailChart($scope.chartSeries);
    });

    $scope.render = "render_chart_income";
    $scope.nameChart = "Total Income";
    $('#tab-income a').css({'color':'#00508B','font-weight':'bold'});
    $('#render_chart_income').css('display','');
    $('#render_chart_rate').css('display','none');
    getDateChart($scope.dates, $scope.dash.site, $scope.render, $scope.nameChart);

    $('#tab-pack').click(function() {
      $scope.render = "render_chart_rate";
      $scope.nameChart = "Total Pack";
      $('#tab-pack a').css({'color':'#00508B','font-weight':'bold'});
      $('#tab-income a').css({'color':'','font-weight':'normal'});
      $('#render_chart_rate').css('display','');
      $('#render_chart_income').css('display','none');
      getDateChart($scope.dates, $scope.dash.site, $scope.render, $scope.nameChart);
    });

    $('#tab-income').click(function() {
      $scope.render = "render_chart_income";
      $scope.nameChart = "Total Income";
      $('#tab-pack a').css({'color':'','font-weight':'normal'});
      $('#tab-income a').css({'color':'#00508B','font-weight':'bold'});
      $('#render_chart_rate').css('display','none');
      $('#render_chart_income').css('display','');
      getDateChart($scope.dates, $scope.dash.site, $scope.render, $scope.nameChart);
    });

    /////////////////Search//////////////////
    ////////////////////////////////////////
    $scope.refreshData = function() {
      $scope.gridOptions.data = $filter('filter')($scope.data, $scope.searchText, undefined);
    };
  }]);
