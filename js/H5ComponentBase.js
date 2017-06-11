/* 基本图文组件对象 */

var H5ComponentBase=function(cfg){
	var cfg=cfg || {};
	if(cfg.type==undefined){
		cfg.type='base';
	}
	var id=('h5_component_'+Math.random()).replace('.','_');
	var component=$('<div class="component component_'+cfg.type+'" id="'+id+'">');
	cfg.width  &&  component.css('width',cfg.width/2);
	cfg.height  &&  component.css('height',cfg.height/2);
	cfg.bg && component.css('backgroundColor',cfg.bg);
	cfg.image && component.css('backgroundImage','url('+cfg.image+')');
	cfg.css && component.css(cfg.css);
	component.css({
		position:'absolute',
		backgroundSize:'100%',
		backgroundRepeat:'no-repeat' 
	});

	if(typeof cfg.onclick==='function'){
		component.on('click',cfg.onclick);
	}
	cfg.text && component.text(cfg.text);
	if(cfg.center===true){
		component.css({
			left:'50%',
			marginLeft:(cfg.width/4 * -1)+'px'
		});
	}

	//component元素的事件触发
	component.on('onLeave',function(){
		setTimeout(function(){
			cfg.animateOut && component.animate(cfg.animateOut);
			component.addClass('component_'+cfg.type+'_onLeave').removeClass('component_'+cfg.type+'_afterLoad');
		},cfg.delay);
	});
	component.on('afterLoad',function(){
		setTimeout(function(){
			cfg.animateIn && component.animate(cfg.animateIn);
			component.addClass('component_'+cfg.type+'_afterLoad').removeClass('component_'+cfg.type+'_onLeave');
		},cfg.delay);
	});

/*	var leave=false;
	$('body').click(function(){
		leave===true ? component.trigger('onLeave') : component.trigger('afterLoad');
		leave=!leave;
	});*/
	return component;


};