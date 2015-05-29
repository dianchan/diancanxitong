"use strict";

define([ 'app', 'services/api/meal/mealApi', 'services/api/order/orderApi', 'css!style/order/list', 'services/api/account/accountApi', 'directive/dialog/dialog' ], function(app) {

	app.register.controller('controller.order.list', [ '$scope', '$rootScope', '$location', 'mealApi', 'orderApi', 'accountApi', 'dialogService', function($scope, $rootScope, $location, mealApi, orderApi, accountApi, dialogService) {
		load();
		function load(){
			orderApi.getMealOrder({
				success : function(data) {
//					data.total = 0;
					data.total = _.reduce(data.items,function(total,item){
						if(isNaN(total)){
							total = total.meal.price;
						}
						return item.meal.price*item.quantity + total;
					});
					$scope.order = data;
					if(!data.status){
						setTimeout(load, 5000);
					}
				}
			});
		}
		
		$scope.remark = function(account) {
			dialogService.input({
				hasNull : true,
				validate : 'text',
				input : account.remarkName,
				confirm : function() {
					account.remarkName = $scope.opts.input;
					accountApi.setRemarkName({
						data : {
							accountId : account.id,
							remarkName : account.remarkName
						}
					});
				}
			});
		};
	} ]);
});
