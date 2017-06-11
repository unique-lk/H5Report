/* 散点图表组件对象 */
var H5ComponentPoint=function(cfg){
	var component=new H5ComponentBase(cfg);
	component.addClass('h5_component_point');
	//默认设置第一个data的大小为参考
	var PointCom=cfg.data[0][1];
	$.each(cfg.data,function(index,item){
		var point=$('<div class="point" id="point_'+index+'"></div>');
		var xname=$('<div class="xname">'+item[0]+'</div>');
		var rate=$('<div class="rate">'+(item[1]*100)+'%</div>');
		point.append(xname);
		xname.append(rate);
		var scale=(item[1]/PointCom*100)+'%';
		point.width(scale).height(scale);
		point.css('fontSize',24*item[1]/PointCom+'px');
		point.css('backgroundColor',item[2]);
		if(item[3]!=undefined && item[4] != undefined){
			point.css({
				left:item[3],
				top:item[4],
			});
		}
		component.append(point);
	});
	return component;
}

