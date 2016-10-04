(function(angular){
'use strict';

//定义控制器,并且为应用程序创建一个模块，用来管理页面结构
// 如果需要使用的时候可以重新载入
var controllers=angular.module('app.controllers.main',['app.services.main']);
	controllers.controller('MainController',[
		'$scope',
		'$routeParams',
		'$route',
		'MainService',
		
		function($scope,$routeParams,$route,MainService){

			// 文本框需要一个模型
			$scope.text='';

			// 任务列表也需要一个类型
			// 每一个任务的结构 { id:1, text:'学习'，completed: true}		
			$scope.todos=MainService.get();

			// 添加todo, 注意校验当为空字符串的时候是没有效果的
			$scope.add=function(){
				if($scope.text)
				{
					MainService.add($scope.text);
					// 清空文本框
					$scope.text='';
				}
				
			};

			// 删除todo
			$scope.remove=function(id){
				// 通过id来判断删除谁
				MainService.remove(id);
			};
			
			// 清空已经完成的元素
			$scope.clear=function(){
				var newTodos=MainService.clear();
				$scope.todos=newTodos;
			};
			
			// 是否有已经完成的任务 该函数一定要有返回值

			$scope.existCompleted=MainService.existCompleted;

			// 当前正在编辑哪个元素
			$scope.currentEditingId=-1;
			$scope.editing=function(id){
				$scope.currentEditingId=id;
			};
			// 完成编辑以后需要将当前编辑状态id重新回到-1
			$scope.save=function(id){
				$scope.currentEditingId=-1;
			};
			// 点击全选按钮切换状态
			$scope.toggleAll = MainService.toggleAll;

			// 点击选择切换状态
			$scope.toggle=function(){
				MainService.update();
			}

			// 状态筛选
			$scope.selecter={};  //{completed:true} {completed:false} {}

			var status=$routeParams.status;

				// 2、根据锚点值对selector做变换,但是需要时时监控
				
				switch(status){
					case 'active': 
					$scope.selecter={completed:false};
					break;
					case 'completed':
					$scope.selecter={completed:true};
					break;
					default:
					// 如果输入的状态是 /adgfah的话清空后面的数据
					$route.updateParams({status:''});
					$scope.selecter={};
					break;

			};
			
			
		}]);


	})(angular);