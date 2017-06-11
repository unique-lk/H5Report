/* 内容管理对象 */

var H5=function(){
	//创建一个容器
	this.id=('h5_'+Math.random()).replace('.','_');
	this.el=$('<div class="H5" id="'+this.id+'">').hide();
	$('body').append(this.el);
	this.page=[];
	this.addPage=function(name){

		var page=$('<div class="section page">');
		if(name!=undefined){
			page.addClass('h5_page_'+name);
		}
		this.el.append(page);
		this.page.push(page);

		if(typeof this.whenAddPage==='function'){
			this.whenAddPage();
		}
		return this;
	}



	this.addComponent=function(name,cfg){
		
		cfg = cfg || {};
		cfg = $.extend({
			type:'base'
		},cfg);
		var page=this.page.slice(-1)[0];
		var component;
		switch(cfg.type){
			case 'base':
				component=new H5ComponentBase(cfg);
				break;
			case 'bar':
				component=new H5ComponentBar(cfg);
				break;
			case 'pie':
				component=new H5ComponentPie(cfg);
				break;
			case 'polyline':
				component=new H5ComponentPolyline(cfg);
				break;
			case 'radar':
				component=new H5ComponentRadar(cfg);
				break;
			case 'ring':
				component=new H5ComponentRing(cfg);
				break;
			case 'point':
				component=new H5ComponentPoint(cfg);
				break;
			default:
		}
		component.addClass('h5_component_'+cfg.type+'_'+name);
		component.addClass('h5_component_'+name);
		page.append(component);
		return this;
	}
	this.loader=function(image,firstPage){


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
	}

	this.loader=typeof h5_load ==='function' ? h5_load : this.loader;
	return this;

}
