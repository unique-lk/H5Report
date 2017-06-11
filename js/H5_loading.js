/*loading动画加载*/

var h5_load=function(images,firstPage){

	/*

		第一次进入的时候：将image的图片赋给this.image,获取到图片的数量加一，
		然后继续load()，除非数量和我们的image的长度是一致的，则就加载页面


	*/
	

	if(this.images===undefined){//第一次进入的时候
		this.images=(images || []).length;
		this.loaded=0;

		window.id=this;

		//创建图片对象
		for(i in images){
			var item=images[i];
			var img=new Image();
			img.onload=function(){
				window.id.loader(images,firstPage);
			}
			img.src=item;
		}
		$('.rate').text('0%');

		return this;
	}else{
		this.loaded++;
		$('.rate').text((this.loaded/this.images*100>>0)+'%');
		if(this.loaded<this.images){
			return this;
		}
	}
	window.id=null;



	this.el.fullpage({
		onLeave:function(index,nextIndex,direction){
				$(this).find('.component').trigger('onLeave');
		},
		afterLoad:function(anchorLink,index){
			$(this).find('.component').trigger('afterLoad');
		}
	});

	//给第一个页面触发他的afterLoad事件
	this.page[0].find('.component').trigger('afterLoad');
		//跳转到指定的页面	
	if(firstPage){
		$.fn.fullpage.moveTo(firstPage);
	}
	this.el.show();
	return this;
};