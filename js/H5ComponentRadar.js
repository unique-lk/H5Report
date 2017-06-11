/* 雷达图组件对象 */
/*
	a:圆心横坐标
	b:圆心纵坐标
	rad:角度
	step:项目的个数
	x坐标：a+Math.sin(rad)*r;
	y坐标：b+Math.cos(rad)*r;
	rad=(2*Math.PI/360)*(360/step)*i
*/
var H5ComponentRadar=function(cfg){
	var component=new H5ComponentBase(cfg);
	var canvas=document.createElement('canvas');
	var step=cfg.data.length;
	var isBlue=false;
	//var startRad=0.5*Math.PI;//设置的起始角度
	var ctx=canvas.getContext('2d');
	canvas.width=ctx.width=cfg.width;
	canvas.height=ctx.height=cfg.height;
	var r=canvas.width/2;
	var w=canvas.width;
	var h=canvas.height;
	//创建底层的多边形
	
	function draw(pre){
		ctx.beginPath();//每次在绘制前我们都需要重新开始选择路线
		$.each(cfg.data,function(index,item){
		var rad=(2*Math.PI/360)*(360/step)*index;
		var x=r+r*Math.sin(rad)*pre;
		var y=r+r*Math.cos(rad)*pre;
		ctx.lineTo(x,y);
		});
		ctx.closePath();
		ctx.fillStyle=(isBlue=!isBlue) ? '#99c0ff' : '#f1f9ff';
		//console.log(isBlue,ctx.fillStyle);
		ctx.fill();	
	}
	for(var i=5;i>0;i--){
		draw(2*i/10);
	}
	//绘制伞骨
	ctx.beginPath();
	$.each(cfg.data,function(index,item){
		var rad=(2*Math.PI/360)*(360/step)*index;
		var x=r+r*Math.sin(rad);
		var y=r+r*Math.cos(rad);
		//设置项目的名称
		var text=$('<div class="text">');
		text.text(item[0]);
		component.append(text);
		if(x>r){
			text.css({
				'left':x/2+'px'
			});
		}else{
			text.css('right',(w-x)/2+'px')
		}
		if(y>r){
			text.css('top',y/2+'px');
		}else{
			text.css('bottom',(h-y)/2+'px');
		}
		ctx.moveTo(r,r);
		ctx.lineTo(x,y);
		ctx.lineWidth=1;
		ctx.strokeStyle="#e0e0e0";
		ctx.stroke();
	});

	component.append(canvas);


	//绘制另一个图层，做动画效果
	canvas=document.createElement('canvas');
	ctx=canvas.getContext('2d');
	canvas.width=ctx.width=cfg.width;
	canvas.height=ctx.height=cfg.height;

	var animate=function(inPre){
		ctx.clearRect(0,0,w,h);
		ctx.beginPath();
		$.each(cfg.data,function(index,item){
			var rad=(2*Math.PI/360)*(360/step)*index;
			var x=r+r*Math.sin(rad)*item[1]*inPre;
			var y=r+r*Math.cos(rad)*item[1]*inPre;
			ctx.font="20px Arial";
			if(x<r){
				ctx.fillText((item[1]*100>>0)+'%',x-30,y);
			}else{
				ctx.fillText((item[1]*100>>0)+'%',x+6,y);
			}
			ctx.lineTo(x,y);
		});
		ctx.closePath();
		ctx.strokeStyle='rgb(255,0,0)';
		ctx.stroke();
	}
	
	component.on('onLeave',function(){
		var s=1;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s-=0.01;
				animate(s);
			},i*10);
		}
	});
	component.on('afterLoad',function(){
		var s=0;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s+=0.01;
				animate(s);
			},i*10);
		}
	});

	component.append(canvas);
	return component;
};