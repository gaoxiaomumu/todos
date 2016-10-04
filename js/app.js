(function (angular) {
	'use strict';

	// MyTodoMVC Module


	// 应用程序的主模块
	var myApp=angular.module('app',['ngRoute','app.controllers.main']);

	// 路由配置
	myApp.config(['$routeProvider',function($routeProvider){

		$routeProvider
		.when('/:status?',{
			controller:'MainController',
			templateUrl:'main_tmpl'
		})
		.otherwise({
			redirectTo:'/'
		});



	}]);

})(angular);
