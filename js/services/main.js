
(function(angular){
	'use strict';

	// 注册一个新的模块
	angular.module('app.services.main',[])
	.service('MainService',['$window',function($window){

		var storage=$window.localStorage;
		// 获取
		var todos=storage['my_todo_list']? JSON.parse(storage['my_todo_list']) : [];

		// 业务逻辑都必须出现在服务中（针对数据的增删改）
		// 编写获取Id 的方法
		function getId(){
			var id=Math.random();
			for(var i=0;i<todos.length;i++)
			{
				if(todos[i].id===id)
				{
					id=getId();
					break;
				}
			}
			return id;
		};

		// 将数据存储到localStorage中
		function save(){
			storage['my_todo_list']=JSON.stringify(todos);
		};
		

		// 控制私有字段的访问权限
		this.get=function(){
			return todos;
		};
		
		// 添加todo, text是指要添加的内容
		// 但是判断输入是否为空等操作是要放在控制器中的

		this.add=function(text){			
				todos.push({ 
				// 让id自动增长
				id:getId(), 
				// 由于$scope.text是双向数据绑定的，add同时肯定可以同时拿到界面上的值
				text:text,
				completed: false});
				save();
			
			
		};

		// 删除todo
		this.remove=function(id){
			// 通过id来判断删除谁
			for(var i=0;i<todos.length;i++)
			{
				if(todos[i].id===id)
				{
					todos.splice(i,1);
					break;
				}
			}
			save();
		};
		
		// 清空已经完成的元素
		this.clear=function(){
			var newArr=[];
			for(var i=0;i<todos.length;i++)
			{
				// 如果该任务已经完成的话
				if(!todos[i].completed)
				{
					newArr.push(todos[i]);					
				}
			}

			todos=newArr;
			save();
			return todos;
		};

		// 是否有已经完成的任务 该函数一定要有返回值

		this.existCompleted=function(){
			for(var i=0;i<todos.length;i++)
			{
				// 如果该任务已经完成的话
				if(todos[i].completed)
				{
					return true;					
				}
			}
			return false;
		};

		// 完成编辑以后需要将当前编辑状态id重新回到-1
		// 更新
		this.update=function(){
			save();
		};

		// 点击全选按钮切换状态
		var now=true;
		this.toggleAll=function(){
			for(var i=0;i<todos.length;i++)
			{				
				todos[i].completed=now;

			}
			now=!now;
			save();
		};		
	}]);
})(angular);