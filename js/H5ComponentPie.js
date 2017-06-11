/* 饼图组件对象 */
/*
	a:圆心横坐标
	b:圆心纵坐标
	rad:角度
	step:项目的个数
	x坐标：a+Math.sin(rad)*r;
	y坐标：b+Math.cos(rad)*r;
	rad=(2*Math.PI/360)*(360/step)*i step是项目的个数
*/
var H5ComponentPie=function(cfg){
	var component=new H5ComponentBase(cfg);
	var color=['red','blue','green','yellow','orange'];

	//1、需要最底层的圆
	//2、需要找到每个点，然后分饼
	//3、创建一个遮罩层，实现遮罩层的动画效果

	var canvas=document.createElement('canvas');
	var ctx=canvas.getContext('2d');
	canvas.width=ctx.width=cfg.width;
	canvas.height=ctx.height=cfg.height;
	var w=canvas.width;
	var h=canvas.height;
	var r=w/2;
	var step=cfg.data.length;
	var startRad=1.5*Math.PI;
	var endRad;

	//绘制了最底层的圆
	ctx.beginPath();
	ctx.arc(r,r,r,0,2*Math.PI);
	ctx.fillStyle='rgba(121,90,72,0.49)';
	ctx.fill();
	//画饼，并填充数据
	$.each(cfg.data,function(index,item){
		ctx.beginPath();
		var endRad=startRad+item[1]*2*Math.PI;

		var x=r+r*Math.sin(0.25*Math.PI-startRad);
		var y=r+r*Math.cos(0.25*Math.PI-startRad);
		var text=$('<div class="text">');
		var per=$('<div class="per">');
		text.text(item[0]);
		per.text(item[1]*100+'%');
		component.append(text);
		text.append(per);
		text.css('opacity','0');
		text.css('transition',"all 1s "+index*0.4+"s");
		//console.log(x,y,'==>',item[0]);
		if(x>r){
			text.css('left',x/2);
		}else{
			text.css('right',(w-x)/2);
		}
		if(y>r){
			text.css('top',y/2);
		}else{
			text.css('bottom',(h-y)/2);
		}

		//console.log(text);
		//console.log(text.position().left);
		ctx.moveTo(r,r);
		ctx.arc(r,r,r,startRad,endRad);
		if(item[2]!=undefined){
			ctx.fillStyle=item[2];
		}else{
			ctx.fillStyle=color.pop();
		}
		ctx.fill();
		startRad=endRad;
	});
	component.append(canvas);


	//绘制遮罩层
	canvas=document.createElement('canvas');
	ctx=canvas.getContext('2d');
	canvas.width=ctx.width=cfg.width;
	canvas.height=ctx.height=cfg.height;
	var draw=function(inPer){
		//inPer是所占的比例
		ctx.clearRect(0,0,w,h);
		ctx.beginPath();
		ctx.moveTo(r,r);
		if(inPer>=1){
			ctx.arc(r,r,r,startRad,startRad);
			component.find('.text').css('opacity','1');
		}else{
			ctx.arc(r,r,r,startRad,startRad+2*Math.PI*inPer,true);
			component.find('.text').css('opacity','0');
		}
		ctx.fillStyle="#e0e0e0";
		ctx.fill();
	}
	component.on('onLeave',function(){
		var s=1;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s-=0.01;
				draw(s);
			},10*i);
		}
	});
	component.on('afterLoad',function(){
		var s=0;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s+=0.01;
				draw(s);
			},10*i);
		}
	});
	component.append(canvas);

	return component;
}









