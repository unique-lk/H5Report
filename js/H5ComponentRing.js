/* 环图组件对象 */

//三个图层，第一个图层用来绘制一个圆，第二个图层是数据的大小，第三个图层是数据的遮罩动画层

var H5ComponentRing=function(cfg){
	var component=new H5ComponentBase(cfg);
	//绘制第一个图层
	var canvas=document.createElement('canvas');
	var ctx=canvas.getContext('2d');
	var w=canvas.width=ctx.width=cfg.width;
	var h=canvas.height=ctx.height=cfg.height;
	var r=w/2;
	$(canvas).css('zIndex',1);
	ctx.arc(r,r,r,0,2*Math.PI);
	ctx.fillStyle='#e0e0e0';
	ctx.fill();
	ctx.beginPath();
	ctx.arc(r,r,r*0.8,0,2*Math.PI);
	ctx.fillStyle='white';
	ctx.fill();
	component.append(canvas);


	//绘制第二个图层

	var canvas=document.createElement('canvas');
	var ctx=canvas.getContext('2d');
	canvas.width=ctx.width=cfg.width;
	canvas.height=ctx.height=cfg.height;
	$(canvas).css('zIndex',2);
	var startRad=1.5*Math.PI;
	$.each(cfg.data,function(index,item){
		var endRad=startRad+2*Math.PI*item[1];
		ctx.beginPath();
		ctx.moveTo(r,r);
		ctx.arc(r,r,r,startRad,endRad);
		ctx.fillStyle=item[2];
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(r,r);
		ctx.arc(r,r,r*0.8,0,2*Math.PI);
		ctx.fillStyle='white';
		ctx.fill();

		//填充数据

		var text=$('<div class="text">');
		if(item[3]!=undefined){
			text.text(item[3]+(item[1]*100>>0) +'%');
		}else{
			text.text((item[1]*100>>0) +'%');
		}
		text.css({
			
			'top':r/2-7.5+'px',
			'left':r/2-7.5+'px',
			
		});
		if(item[3]!=undefined){
			text.css({
				width:'50%',
				marginLeft:-w/16+'px',
				marginTop:-h/8+'px',
				fontSize:'4px'
			});
			
		}
		component.append(text);
	});
	component.append(canvas);


	//绘制第三个图层

	var canvas=document.createElement('canvas');
	var ctx=canvas.getContext('2d');
	canvas.width=ctx.width=cfg.width;
	canvas.height=ctx.height=cfg.height;
	var beginRad=1.5*Math.PI;
	$(canvas).css('zIndex',3);
	var animate=function(scale){
		ctx.clearRect(0,0,w,h);
		var closeRad=beginRad+2*Math.PI*scale;
		ctx.beginPath();
		ctx.moveTo(r,r);
		if(scale<=0){
			ctx.arc(r,r,r,beginRad,closeRad+2*Math.PI);
		}else{
			ctx.arc(r,r,r,beginRad,closeRad,true);
		}
		
		ctx.fillStyle='#e0e0e0';
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(r,r);
		ctx.arc(r,r,r*0.8,0,2*Math.PI);
		ctx.fillStyle='white';
		ctx.fill();
	}

	component.on('afterLoad',function(){
		var s=0;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s+=0.01;
				animate(s);
			},10*i);
		}
	});
	component.on('onLeave',function(){
		var s=1;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s-=0.01;
				animate(s);
			},10*i);
		}
	});
	component.append(canvas);



	return component;
}
