/* 折线图组件对象 */
var H5ComponentPolyline=function(cfg){
	var cfg=cfg || {};
	/*
		需要使用canvas来绘制
		1、绘制表格（10*【项目数个数+2】）
		2、在表格上描点，找到每个数据的位置
		3、连接每一个点
		4、形成一个遮罩层
		5、完成遮罩层的动画
	*/
	var component=new H5ComponentBase(cfg);
	var canvas=document.createElement('canvas');
	var ctx=canvas.getContext('2d');
	window.ctx=ctx;
	canvas.width=ctx.width=cfg.width;
	canvas.height=ctx.height=cfg.height;
	var w=canvas.width;
	var h=canvas.height;
	var count=cfg.data.length;//项目的个数
	ctx.beginPath();
	//绘制网格线--水平线
	for(var i=0;i<=10;i++){
		ctx.moveTo(0,(h/10)*i);
		ctx.lineTo(w,(h/10)*i);
	}
	//绘制网格线--垂直线
	for(i=0;i<=count+1;i++){
		ctx.moveTo((w/(count+1))*i,0);
		ctx.lineTo((w/(count+1))*i,h);
	}
	ctx.strokeStyle='#AAA';
	ctx.lineWidth=1;
	ctx.stroke();

	//添加项目的名称

	for(var i=0;i<count;i++){
		var textW=w/(count+1)/2;
		var text=$('<div class="text">');
		text.text(cfg.data[i][0]);
		text.css({
			'position':'absolute',
			'width':textW+'px',
			'left':(i+0.5)*textW+'px',

			'bottom':'-40px',
			'fontSize':'15px'
		});
		component.append(text);
	}

	component.append(canvas);


	//利用第二个图层来完成点的绘制以及遮罩层的动画实现
	canvas=document.createElement('canvas');
	ctx=canvas.getContext('2d');
	canvas.width=ctx.width=cfg.width;
	canvas.height=ctx.height=cfg.height;
	//创建完成的新画布


	
	var draw=function(per){
		ctx.clearRect(0,0,w,h);
		ctx.beginPath();
		$.each(cfg.data,function(index,item){
		//遍历cfg.data，找出相应点的位置 item[0]-->名称  item[1]-->比例
		var x=(index+1)*(w/(count+1));
		var y=h-h*item[1]*per;
		ctx.moveTo(x,y);
		ctx.arc(x,y,5,0,2*Math.PI);
		ctx.stroke();
		});
		//连接各个项目的点,并绘制阴影
		ctx.moveTo(w/(count+1),h-h*cfg.data[0][1]*per);
		for(i in cfg.data){
		
			var xLen=w/(count+1);
			//console.log(typeof (i-0+1),(i-0+1));

			//此处是类型转化的问题，这里的i是string类型，而我们需要将其转换为
			//number类型，所以我们将i-1让他转换为number型
			var x= (i-0+1) * xLen;
			var y=h-h*cfg.data[i][1]*per;
			ctx.lineTo(x,y);
			ctx.font="20px Arial";
			if(cfg.data[i][2]){
				ctx.fillStyle=cfg.data[i][2];
			}else{
				ctx.fillStyle='red';
			}
			ctx.fillText((cfg.data[i][1]*100 >> 0)+'%',x-10,y-15);
			if(i>=(count-1)){
				ctx.lineWidth=2;
				ctx.strokeStyle='#ff725f';
				ctx.stroke();
				ctx.lineWidth=0;
				ctx.lineTo(x,h);
				ctx.lineTo(w/(count+1),h);
				ctx.fillStyle='rgba(244, 67, 54, 0.19)';
				ctx.fill();
			}
		}

	}




	component.on('onLeave',function(){
		var s=1;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s-=0.01;
				draw(s);
			},i*10);
		}
		
	});
	component.on('afterLoad',function(){
		var s=0;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s+=0.01;
				draw(s);

			},i*10+600);
		}
		
	});
	component.append(canvas);


	return component;
}
