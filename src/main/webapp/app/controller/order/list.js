"use strict";

define([ 'app', 'services/api/meal/mealApi', 'services/api/order/orderApi', 'css!style/order/list', 'services/api/account/accountApi', 'directive/dialog/dialog' ], function(app) {

	app.register.controller('controller.order.list', [ '$scope', '$rootScope', '$location', 'mealApi', 'orderApi', 'accountApi', 'dialogService', function($scope, $rootScope, $location, mealApi, orderApi, accountApi, dialogService) {
		$scope.query = '';
		$scope.ord = 'account.id';
		load();
		function load() {
			orderApi.getMealOrder({
				success : function(data) {
					data.total = _.reduce(data.items, function(total, item) {
						return item.meal.price * item.quantity + total;
					}, 0);
					$scope.order = data;
					if (!data.status) {
						setTimeout(load, 5000);
					} else {
						var itemMap = _.groupBy(data.items, function(item) {
							return item.meal.name;
						});
						var text = _.template("<% for(var name in itemMap){ %>" + "<%=name%>:<%=_.reduce(itemMap[name],function(total,item){return item.quantity+total;},0)%>份\n" + "<%}%>")({
							itemMap : itemMap
						});
						text = text + '\n总计：' + data.items.length + '份';
						alert(text);
					}
				}
			});
		}
		$scope.openOrder = function() {
			if ($scope.order.status) {
				orderApi.openOrder({
					success : function(data) {
						load();
					}
				});
			}
		};
		$scope.closeOrder = function() {
			if (!$scope.order.status) {
				orderApi.closeOrder({
					success : function(data) {
						load();
					}
				});
			}
		};
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
		$scope.del = function() {
			orderApi.deleteOrderMeal({
				success : function(data) {
					load();
				}
			});
		};
	} ]);
});
