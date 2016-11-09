# ZQuery
模仿jQuery写的ZQuery

自己写选择器
	这一次获取到的子级，是下一次获取的父级
	#id
	.class
	tag

	#box ul li

	筛选
	ele.class

	/^\w+\.\w+$/


	属性
	ele[name=value]
		/^\w+\[\w+\=\w+\]$/



	伪类选择器
		/^\w+\:\w+(\(\d+\))?$/

	li:first
	li:last
	li:even
	li:odd
	li:lt(2)
	li:gt(2)
	li:eq(2)
================================================
事件流
	DOM事件流 		高级浏览器下的事件流
				冒泡阶段
				捕获阶段
	IE事件流 		低版本IE下的事件流
				冒泡阶段

ZQuery
	jquery里面样式、属性..获取的时候默认获取第一个元素的
方法
	.css()
		.css(name); 		获取样式
		.css(name,value); 	设置样式
		.css({}); 			批量设置样式
	.attr()
		.attr(name); 		获取属性
		.attr(name,value); 	设置属性
		.attr({}); 			批量设置属性

	.addClass()

	.removeClass()

	.html()
		.html() 			获取
		.html('') 			设置
	.val()
		.val(); 			获取
		.val(''); 			设置

	.show() 				显示
	.hide() 				隐藏

事件
	click mouseover mouseout mousedown mouseup mousemove mouseenter mouseleave change keydown keyup contextmenu

	$('').click();

	事件
		组止默认事件
		取消冒泡
		return false;
================================================
	
	$('li').get(2)
	$('li').eq(2) 	
	$('li').index()
===============================================
	hover(fn1,fn2)
	toggle(fn1,fn2,fn3...)
===============================================
运动
	.animate
===============================================
	DOM操作
		$('<p>p标签</p>')

		obj.insertAdjacentHTML('插入的方式',字符串标签);


	.insertBefore() 		外部前面 	beforeBegin
	.insertAfter() 			外部后面 	afterEnd
	.appendTo() 			内部后面 	beforeEnd
	.prependTo() 			内部前面 	afterBegin

		删除元素
			$(元素).remove();
===============================================
	交互
		ajax
		jsonp
=========================================
	jquery 		扩展
	$.fn.xxx = function(){};
	$.fn.extend({
		xxx:function(){}
	});
=========================================
	链式操作

	$('div').hide().show().animate({left:500});