angular
  .module('app')
  .controller('RatesCtrl', ['$scope', 'Sites', 'Ktxrate', 'Plans', function ($scope, Sites, Ktxrate, Plans) {
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
        //console.log(exist_Plan);
        Plans.find({
          filter: {where: {id: {nin: exist_Plan}}}
        }, function (data) {
          $scope.plans = data;
        });
      });
    }

    function refeshKtxRate(){
      Ktxrate.find({
        filter: {where: {site_id: $scope.site_id}}
      }, function (data) {
        //console.log(data);
        $scope.plans_rate = data;
      });
    }

    //$scope.chooseType = function(plan){
    //  console.log(plan.type);
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
        plan.model= value.Exchange;
        console.log(value.Exchange);
        return "Not yet";
      } else {
        return "None";
      }
    };

    $scope.valueChange = function (plan) {
      var value = JSON.parse(plan.value);
      if(plan.type == "Percent") {
        value.Percent = plan.model;
      }else if (plan.type == "Number") {
        value.Number = plan.model;
      } else if (plan.type == "Exchange") {
        value.Exchange = plan.model;
      }
      plan.value = angular.toJson(value);
      //console.log(plan.value);
    };

    $scope.saveConfig = function (plans_rate){
      console.log(angular.toJson(plans_rate));
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
      //console.log(plan.name);
      //console.log(plan.id);
      //console.log($scope.site_id);
      Sites.find({
        filter: {where: {id: $scope.site_id}}
      }, function (data) {
        Ktxrate.create({
          site_id   : $scope.site_id,
          site_name : data[0].name,
          plan_id   : plan.id,
          plan_name : plan.name
        }, function(data, err){
          if(data){
            //console.log(data);
            refeshPlan();
            refeshKtxRate();
          } else {
            console.log(err);
          }
        })
      });

    }

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
