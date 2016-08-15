angular
  .module('app')
  .controller('RatesCtrl', ['$scope', 'Sites', 'Ktxrate', 'Plans', 'Packs', '$q', function ($scope, Sites, Ktxrate, Plans, Packs, $q) {
    var deferred = $q.defer();
    $scope.site_name = "CÁC TRƯỜNG ĐẠI HỌC";
    //console.log($scope.site_id);
    $("#rateMenu").css("min-height",$(window).height() - 100);
    if(!$scope.site_id){
      $("#content").hide();
    }

    $scope.chooseSite = function () {
      $("#content").show();
      refeshKtxRate();
    };

    Sites.find({
      filter: {where: {site2_id: 10}}
    }, function (data) {
      $scope.sites = data;
    });

    function refeshPlan(){
      Ktxrate.find({
        filter: {fields: {plan_id: true}}
      }, function (data) {
        var exist_Plan = [];
        data.forEach(function (item) {
          exist_Plan.push(item.plan_id);
        });
        Plans.find({
        }, function (data) {
          $scope.plans = data;
        });
      });
    }

    function refeshKtxRate(){
      Ktxrate.find({
        filter: {where: {site_id: $scope.site_id}}
      }, function (data) {
        $scope.plans_rate = data;
        $scope.plans_rate.forEach(function(item) {
          var value = JSON.parse(item.value);
          item.plan_another = value.Exchange.value;
        });
      });
    }

    $scope.filterPlanAnother = function(id) {
      return function(item) {
        if(item.plan_id == id) {
          return false;
        }else {
          return true;
        }
      }
    };

    //$scope.chooseType = function(planType, planId){
    //  var tb = $('#general-table tbody tr');
    //  for(var i = 0; i < tb.length; i++) {
    //    if(tb[i].cells[0].innerHTML == planId) {
    //      if(planType == 'Exchange') {
    //        console.log("ex");
    //        console.log(tb[i].cells[3]);
    //        $(tb[i].cells[3]).find('#noexchange_id').css('display', 'none');
    //        $(tb[i].cells[3]).find('#exchange_id').css('display', '');
    //        var sl = $(tb[i].cells[3]).find('#exchange_id option');
    //        for(var j = 0;j < sl.length;j++) {
    //          if($(sl[j]).val() == planId) {
    //            $(sl[j]).css('display','none');
    //          }
    //        }
    //      }else {
    //        $(tb[i].cells[3]).find('#noexchange_id').css('display', '');
    //        $(tb[i].cells[3]).find('#exchange_id').css('display', 'none');
    //      }
    //    }else {
    //      $(tb[i].cells[3]).find('#noexchange_id').css('display', '');
    //      $(tb[i].cells[3]).find('#exchange_id').css('display', 'none');
    //    }
    //  }
    //};

    $scope.getPlan = function(plan){
      var value = JSON.parse(plan.value);
      if(plan.type == "Percent") {
        plan.model= value.Percent;
        return value.Percent;
      }else if (plan.type == "Number") {
        plan.model= value.Number;
        return value.Number;
      } else if (plan.type == "Exchange") {
        return "Not yet";
      } else {
        return "None";
      }
    };

    $scope.valueChange = function (plan) {
      var value = JSON.parse(plan.value);
      if(plan.type == "Percent") {
        if(plan.model > 100 || plan.model < 0) {
          $scope.Notify("Percent not allow < 0 or > 100","error");
          $('.btn-success').prop({"disabled":true});
        }else {
          $('.btn-success').prop({"disabled":false});
        }
        value.Percent = plan.model;
      }else if (plan.type == "Number") {
        if(plan.model < 0) {
          $scope.Notify("Number not allow < 0","error");
          $('.btn-success').prop({"disabled":true});
        }else {
          $('.btn-success').prop({"disabled":false});
        }
        value.Number = plan.model;
      } else if (plan.type == "Exchange") {
        console.log("exchange");
      }
      plan.value = angular.toJson(value);
    };

    $scope.selectChange = function(plan) {
      var value = JSON.parse(plan.value);
      if(plan.type == "Exchange") {
        value.Exchange.to = plan.plan_id;
        value.Exchange.value = plan.plan_another;
      }
      plan.value = angular.toJson(value);
    };

    $scope.saveConfig = function (plans_rate){
      plans_rate.forEach(function(item) {
        Ktxrate
          .prototype$updateAttributes({
            id: item.id,
            type: item.type,
            value: item.value
          }).$promise
          .then(function(data) {
            refeshKtxRate();
          }, function(err) {
            console.log(err);
          });
      });
    };

    $scope.refreshConfig = function (){
      refeshKtxRate();
      refeshPlan();
    };

    $scope.getClass = function(plan){
      if(plan.type == "Percent") {
        return "fa fa-pencil";
      }else if (plan.type == "Number") {
        return "fa fa-sort-numeric-asc";
      } else if (plan.type == "Exchange") {
        return "fa fa-exchange";
      } else {
        return "fa fa-question";
      }
    };

    refeshKtxRate();
    refeshPlan();

    $scope.addPlanToSite = function (plan) {
      $q.all(
        [
          Sites.findOne({
            filter: {where: {id: $scope.site_id}}
          }).$promise,
          Ktxrate.find({
            filter: {
              fields: { site_id: true, plan_id: true }
            }
          }).$promise
        ]
      ).then(function(data) {
        var value1 = data[0], value2 = data[1];
        if(value2.length == 0) {
          Ktxrate.create({
            site_id   : $scope.site_id,
            site_name : value1.name,
            plan_id   : plan.id,
            plan_name : plan.name
          }).$promise
            .then(function(data) {
              refeshKtxRate();
              refeshPlan();
            },function(err) {
              console.log(err);
            });
        }else {
          var S_id = "", P_id = "";
          value2.forEach(function(item2) {
            if(item2.site_id == $scope.site_id && item2.plan_id == plan.id) {
              return S_id = item2.site_id, P_id = item2.plan_id;
            }else {
              console.log("none");
            }
          });
          if(S_id == $scope.site_id && P_id == plan.id) {
            $scope.Notify("The plan has been already","error");
          }else {
            Ktxrate.create({
              site_id   : $scope.site_id,
              site_name : value1.name,
              plan_id   : plan.id,
              plan_name : plan.name
            }).$promise
              .then(function(data) {
                refeshKtxRate();
                refeshPlan();
              },function(err) {
                console.log(err);
              });
          }
        }
      })
        .catch(function(err) {
          console.log(err);
        });
    };

    $scope.removePlanToSite = function(plan){
      Ktxrate.destroyById({id: plan.id}, function (data, err) {
        if(data){
          refeshKtxRate();
          refeshPlan();
        } else {
          console.log(err);
        }
      })
    };
  }]);
