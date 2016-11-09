function ZQuery(arg){
	this.elements = []; 		//存东西
	this.domString = ''; 		//保存字符串标签
	if(typeof arg=='function'){
		//DOMReady
		DOMReady(arg);
	}else if(typeof arg=='string'||arg instanceof String){
		if(arg.indexOf('<')!=-1){
			this.domString = arg;
		}else{
			//获取元素
			this.elements = getEle(arg);
			this.length = this.elements.length;
		}
	}else{
		//原生对象-》ZQuery对象
		this.elements.push(arg);
		this.length = this.elements.length;
	}
}

ZQuery.prototype.css = function(name,value){
		if(arguments.length==2){
			//设置一个样式
			for(var i=0;i<this.elements.length;i++){
				this.elements[i].style[name] = value;
			}
		}else{
			if(typeof name=='string'){
				//获取样式
				return getStyle(this.elements[0],name);
			}else{
				//批量设置样式
				var json = name;
				for(var name in json){
					for(var i=0;i<this.elements.length;i++){
						this.elements[i].style[name] = json[name];
					}
				}
			}
		}
};

ZQuery.prototype.attr = function(name,value){
		if(arguments.length==2){
			//设置一个属性
			for(var i=0;i<this.elements.length;i++){
				this.elements[i].setAttribute(name,value);
			}
		}else{
			if(typeof name=='string'){
				//获取属性
				return this.elements[0].getAttribute(name);
			}else{
				//批量设置属性
				var json = name;
				for(var name in json){
					for(var i=0;i<this.elements.length;i++){
						this.elements[i].setAttribute(name,json[name]);
					}
				}
			}
		}
};
ZQuery.prototype.addClass = function(sClass){
	var re = new RegExp('\\b'+sClass+'\\b','g');
	for(var i=0;i<this.elements.length;i++){
		if(this.elements[i].className){
			if(this.elements[i].className.search(re)==-1){
				this.elements[i].className += ' '+sClass;
			}
		}else{
			this.elements[i].className = sClass;
		}
		this.elements[i].className = this.elements[i].className.replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
	}
	return this;
};

ZQuery.prototype.removeClass = function(sClass){
	var re = new RegExp('\\b'+sClass+'\\b','g');
	for(var i=0;i<this.elements.length;i++){
		if(this.elements[i].className){
			this.elements[i].className = this.elements[i].className.replace(re,'');
			
			this.elements[i].className = this.elements[i].className.replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
			if(this.elements[i].className==''){
				this.elements[i].removeAttribute('class');
			}
		}
	}
	return this;
};

ZQuery.prototype.html = function(value){
	if(value||value==''){
		//设置
		for(var i=0;i<this.elements.length;i++){
			this.elements[i].innerHTML = value;
		}	
	}else{
		return this.elements[0].innerHTML;
	}
};
ZQuery.prototype.val = function(value){
	if(value||value==''){
		//设置
		for(var i=0;i<this.elements.length;i++){
			this.elements[i].value = value;
		}	
	}else{
		return this.elements[0].value;
	}
};
ZQuery.prototype.show = function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display = 'block';
	}
	return this;
};
ZQuery.prototype.hide = function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display = 'none';
	}
	return this;
};

;'click mouseover mouseout mousedown mouseup mousemove mouseenter mouseleave change keydown keyup contextmenu'.replace(/\w+/g,function(str){
	ZQuery.prototype[str] = function(fn){
		for(var i=0;i<this.elements.length;i++){
			addEvent(this.elements[i],str,fn);
		}
	};
});

ZQuery.prototype.get = function(n){
	for(var i=0;i<this.elements.length;i++){
		if(i==n){
			return this.elements[i];
		}
	}
};
ZQuery.prototype.eq = function(n){
	for(var i=0;i<this.elements.length;i++){
		if(i==n){
			return $(this.elements[i]);
		}
	}
};

ZQuery.prototype.index = function(){
	var aSiblings = this.elements[0].parentNode.children;
	for(var i=0;i<aSiblings.length;i++){
		if(aSiblings[i]==this.elements[0]){
			return i;
		}
	}
};
ZQuery.prototype.hover = function(fn1,fn2){
	for(var i=0;i<this.elements.length;i++){
		$(this.elements[i]).mouseenter(fn1);
		$(this.elements[i]).mouseleave(fn2);
	}
};

ZQuery.prototype.toggle = function(){
	var args = arguments;
	var _this = this;
	for(var i=0;i<this.elements.length;i++){
		;(function(count){
			$(_this.elements[i]).click(function(ev){
				args[count%args.length].call(this,ev);
				count++;
			});
		})(0);
	}
};

ZQuery.prototype.animate = function(json,options){
	for(var i=0;i<this.elements.length;i++){
		move(this.elements[i],json,options);
	}
};

ZQuery.prototype.appendTo = function(arg){
	var aParent = $(arg);
	for(var i=0;i<aParent.length;i++){
		aParent.get(i).insertAdjacentHTML('beforeEnd',this.domString);
	}
	return this;
};

ZQuery.prototype.prependTo = function(arg){
	var aParent = $(arg);
	for(var i=0;i<aParent.length;i++){
		aParent.get(i).insertAdjacentHTML('afterBegin',this.domString);
	}
	return this;
};

ZQuery.prototype.insertAfter = function(arg){
	var aParent = $(arg);
	for(var i=0;i<aParent.length;i++){
		aParent.get(i).insertAdjacentHTML('afterEnd',this.domString);
	}
	return this;
};

ZQuery.prototype.insertBefore = function(arg){
	var aParent = $(arg);
	for(var i=0;i<aParent.length;i++){
		aParent.get(i).insertAdjacentHTML('beforeBegin',this.domString);
	}
	return this;
};

ZQuery.prototype.remove = function(){
	var oParent = this.elements[0].parentNode;
	for(var i=0;i<this.elements.length;i++){
		oParent.removeChild(this.elements[i]);
	}
	return this;
};




function $(arg){
	return new ZQuery(arg);
};

$.ajax = function(json){
	ajax(json);
};
$.jsonp = function(json){
	jsonp(json);
};


$.fn = ZQuery.prototype;

$.fn.extend = function(json){
	for(var name in json){
		ZQuery.prototype[name] = json[name];
	}
};


function json2url(json){
	var arr = [];
	for(var name in json){
		arr.push(name+'='+encodeURIComponent(json[name]));
	}
	return arr.join('&');
}
function ajax(json){
	json = json||{};
	if(!json.url)return;
	json.type = json.type||'get';
	json.timeout = json.timeout||15000;
	json.data = json.data||{};
	json.data.t = Math.random();
	
	if(window.XMLHttpRequest){
		var oAjax = new XMLHttpRequest();
	}else{
		var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
	}
	switch(json.type.toLowerCase()){
		case 'get':
			oAjax.open('GET',json.url+'?'+json2url(json.data),true);
			oAjax.send();
			break;
		case 'post':
			oAjax.open('POST',json.url,true);
			oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			oAjax.send(json2url(json.data));
			break;
		default:
			oAjax.open('GET',json.url+'?'+json2url(json.data),true);
			oAjax.send();
			break;
	}
	
	json.loading&&json.loading();
	
	json.timer = setTimeout(function(){
		oAjax.onreadystatechange = null;
		json.error&&json.error('网络超时。');
	},json.timeout);
	
	oAjax.onreadystatechange = function(){
		if(oAjax.readyState==4){
			clearTimeout(json.timer);
			if(oAjax.status>=200&&oAjax.status<300||oAjax.status==304){
				json.success&&json.success(oAjax.responseText);
			}else{
				json.error&&json.error(oAjax.status);
			}
		}
	};
}
function jsonp(json){
	json = json||{};
	if(!json.url)return;
	json.timeout = json.timeout||15000;
	json.cbName = json.cbName||'cb';
	json.data = json.data||{};
	json.data[json.cbName] = 'show'+Math.random();
	json.data[json.cbName] = json.data[json.cbName].replace('.','');
	
	json.timer = setTimeout(function(){
		window[json.data[json.cbName]] = function(res){
			oHead.removeChild(oS);
			json.error&&json.error('网络超时!');
		}
	},json.timeout);
	
	window[json.data[json.cbName]] = function(res){
		clearTimeout(json.timer);
		oHead.removeChild(oS);
		json.success&&json.success(res);
	}
	var oHead = document.getElementsByTagName('head')[0];
	var oS = document.createElement('script');
	oS.src = json.url+'?'+json2url(json.data);
	oHead.appendChild(oS);
}
function getStyle(obj,sName){
	return (obj.currentStyle||getComputedStyle(obj,false))[sName];
}
function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,function(ev){
			var oEvent = ev||event;
			
			if(fn.call(obj,oEvent)==false){
				oEvent.cancelBubble = true;
				oEvent.preventDefault&&oEvent.preventDefault();
			}
		},false);
	}else{
		obj.attachEvent('on'+sEv,function(){
			var oEvent = ev||event;
			if(fn.call(obj,oEvent)==false){
				oEvent.cancelBubble = true;
				return false;
			}
		});
	}
}
function DOMReady(fn){
	if(document.addEventListener){
		addEvent(document,'DOMContentLoaded',function(){
			fn&&fn();
		});
	}else{
		addEvent(document,'onreadystatechange',function(){
			if(document.readyState=='complate'){
				fn&&fn();
			}
		});
	}
}
function getByClass(oParent,sClass){
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}else{
		var aResult = [];
		var aEle = oParent.getElementsByTagName('*');
		var re = new RegExp('\\b'+sClass+'\\b','g');
		for(var i=0;i<aEle.length;i++){
			if(aEle[i].className.search(re)!=-1){
				aResult.push(aEle[i]);
			}
		}
		return aResult;
	}
}
function getByStr(aParent,str){
	var aChild = [];
	//遍历父级
	for(var i=0;i<aParent.length;i++){
		switch(str.charAt(0)){
			case '#':
				//#id
				aChild.push(document.getElementById(str.substring(1)));
				break;
			case '.':
				//.class
				var aEle = getByClass(aParent[i],str.substring(1));
				for(var j=0;j<aEle.length;j++){
					aChild.push(aEle[j]);
				}
				break;
			default:
				if(/^\w+\.\w+$/.test(str)){
					//筛选
					//li.on
					var arr = str.split('.');
					var re = new RegExp('\\b'+arr[1]+'\\b','g');
					var aEle = aParent[i].getElementsByTagName(arr[0]);
					for(var j=0;j<aEle.length;j++){
						if(aEle[j].className.search(re)!=-1){
							aChild.push(aEle[j]);
						}
					}
				}else if(/^\w+\[\w+\=\w+\]$/.test(str)){
					//属性
					var arr = str.split(/\[|\=|\]/);
					var aEle = aParent[i].getElementsByTagName(arr[0]);
					for(var j=0;j<aEle.length;j++){
						if(aEle[j].getAttribute(arr[1]) == arr[2]){
							aChild.push(aEle[j]);
						}
					}
				}else if(/^\w+\:\w+(\(\d+\))?$/.test(str)){
					var arr = str.split(/\:|\(|\)/);
					var aEle = aParent[i].getElementsByTagName(arr[0]);
					switch(arr[1]){
						case 'first':
							aChild.push(aEle[0]);
							break;
						case 'last':
							aChild.push(aEle[aEle.length-1]);
							break;
						case 'even':
							for(var j=0;j<aEle.length;j+=2){
								aChild.push(aEle[j]);
							}
							break;
						case 'odd':
							for(var j=1;j<aEle.length;j+=2){
								aChild.push(aEle[j]);
							}
							break;
						case 'eq':
							aChild.push(aEle[arr[2]]);
							break;
						case 'lt':
							for(var j=0;j<arr[2];j++){
								aChild.push(aEle[j]);
							}
							break;
						case 'gt':
							for(var j=parseInt(arr[2])+1;j<aEle.length;j++){
								aChild.push(aEle[j]);
							}
							break;
					}
				}else{
					//标签
					var aEle = aParent[i].getElementsByTagName(str);
					for(var j=0;j<aEle.length;j++){
						aChild.push(aEle[j]);
					}
				}
				break;
		}
	}
	return aChild;
}
function getEle(str){
	var arr = str.replace(/^\s+|\s+$/g,'').split(/\s+/);
	var aParent = [document];
	var aChild = [];
	for(var i=0;i<arr.length;i++){
		aChild = getByStr(aParent,arr[i]);
		//这一次获取到的子级，是下一次获取的父级
		aParent = aChild;
	}
	return aChild;
}
function move(obj,json,options){
	clearInterval(obj.timer);	
	options=options || {};
	options.easing=options.easing|| 'ease-out';
	options.duration=options.duration || 800;
	var count=Math.floor(options.duration/30);
	var start={};
	var dis={};
	for(var name in json){
		start[name]=parseFloat(getStyle(obj,name));
		dis[name]=json[name]-start[name];
	}
	var n=0;
	obj.timer=setInterval(function(){
		n++;
		for(var name in json){
			switch(options.easing){
				case 'linear':
					var a=n/count;
					var cur=start[name]+dis[name]*a;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[name]+dis[name]*a*a*a;
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-a*a*a);
					break;
			}
			if(name=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';	
			}else{
				obj.style[name]=cur+'px';
			}
		}
		if(n==count){
			clearInterval(obj.timer);
			options.complete && options.complete();	
		}
	},30);
}