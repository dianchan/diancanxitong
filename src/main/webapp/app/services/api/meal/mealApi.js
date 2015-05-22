define([ 'app', 'services/api/common/ajaxApi' ], function(app) {

	app.register.service('mealService', [ 'ajaxApi', function(ajaxApi) {

		/**
		 * 获取所有
		 */
		this.getAll = function(opts){
			ajaxApi.postJson('meal/get_all',opts);
		}
	} ]);
});