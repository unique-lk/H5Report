/* 柱图组件对象 */
var H5ComponentBar=function(cfg){
	var component=new H5ComponentBase(cfg);
	/*
		1、有几个需要绘制的柱图
		2、绘制柱图需要柱图的名称、数据大小
		3、柱图的动画实现


		柱图里面有三个需要创建的
		一：柱图的名称
		二：柱图的比例
		三：柱图的内容填充块
	*/
	var proLen;
	$.each(cfg.data,function(index,item){
		var line=$('<div class="line">');
		var name=$('<div class="name">');
		name.text(item[0]);
		name.width(80);
		var pro=$('<div class="pro">');
		proLen=component.width()-name.width()-25;
		pro.width(proLen);


		var bg=$('<div class="bg">');
		if(item[2]!=undefined){
			bg.css('backgroundColor',item[2]);	
		}else{
			bg.css('backgroundColor','#e54355');
		}
		bg.css('width',(item[1]*100)+'%');
		var text=$('<div class="text">');
		text.text((item[1]*100>>0)+'%');
		component.append(line);
		line.append(name).append(pro);
		pro.append(bg);
		bg.append(text)
	});
	component.on('onLeave',function(){
		
		$(this).find('.pro').width(0);
		return false;
	});
	component.on('afterLoad',function(){
		
		$(this).find('.pro').css('width',proLen);
		return false;
	});
	return component;
}
