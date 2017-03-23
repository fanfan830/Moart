(function($){
	$.fn.qp_banner=function(options){
		var defaults={
			banner_triggers:null,
			banner_pre:null,
			banner_next:null,
			banner_speed:500,
			banner_int:1000,
			banner_async:true
		};
	
		var options=$.extend(defaults,options);
		var _this=$(this);
		var child=_this.children();
		var triggers = null;
		var btn_pre = null;
		var btn_next = null;
		var all_size = child.length;
		
		if(options.banner_int > 0)
		{
			options.banner_int = options.banner_int + options.banner_speed * 2;
		}else
		{
			options.banner_int = 100;
		}
		
		/**
		if(!options.banner_async )
		{
			_this.css({position:"absolute", opacity:1});
			child.css({
				position:"absolute",
				top:0,
				left:0,
				right:10,
				opacity:0}).first().show().siblings().hide();
			child.first().css({opacity:1});
		}
	**/
		
		if(options.banner_triggers)
		{
			triggers = $(options.banner_triggers);
			if(triggers.children().length > 0)
			{
				triggers = triggers.children().first();
			}
			
			child.each(function(index){
				if(index==0){
					triggers.append("<a href='javascript:;' class='cur'></a>");
				}
				else{
					triggers.append("<a href='javascript:;'></a>");
				};
			});
			
			triggers.find("a").click(function(){
				var clickIndex=$(this).index();
				changeTo(clickIndex);
			});
		}
		if(options.banner_pre)
		{
			btn_pre = $(options.banner_pre);
			btn_pre.click(function(){toPreBanner(); return false;});
		}
		if(options.banner_next)
		{
			btn_next = $(options.banner_next);
			btn_next.click(function(){toNextBanner(); return false;});
		}
		
		
		var changeing = false;
		var double_changeing = false;
		var changeIndex = 0;
		var currentIndex = 0;

		
		function changeTo(i)
		{
			if(changeing)
			{
				return false;
			}
			changeing = true;
			double_changeing = true;
			currentIndex = changeIndex;
			changeIndex = i;
			if(options.banner_async)
			{
				_this.animate({opacity:0},options.banner_speed, null, function(){start_change();}); 
			}
			else
			{
				child.eq(currentIndex).animate({opacity:0}, options.banner_speed, null, function(){
					$(this).hide();
					endDoubleChnage();});
				child.eq(changeIndex).show().animate({opacity:1}, options.banner_speed, null, function(){
					endDoubleChnage();});
			}
		}
		
		function endDoubleChnage()
		{
			if(double_changeing)
			{
				double_changeing = false;
			}
			else
			{
				changeing = false;
			}
		}
		
		function start_change()
		{
			if(triggers)
			{
				triggers.children(":eq(" + changeIndex + ")").addClass("cur").siblings(".cur").removeClass("cur");
			}
			child.eq(changeIndex).show().siblings(":visible").hide();
			//child.eq(currentIndex).animate({opacity:0}, options.banner_speed, null, function(){
				//$(this).hide();});
			
			_this.show().animate({opacity:1},options.banner_speed, null, function(){end_change();}); 
		}
		
		function end_change()
		{
			changeing = false;
		}
		
		function toNextBanner()
		{
			var i = (changeIndex + 1) % all_size;
			changeTo(i);
		}
		
		function toPreBanner()
		{
			var i = (changeIndex + all_size - 1) % all_size;
			changeTo(i);
		}
		
		setInterval(function(){
					toNextBanner();
					},options.banner_int);
	};
})(jQuery);

$(document).ready(function() {
		$("#homeRotatingImage").qp_banner({banner_speed:900,banner_int:1000,banner_async:false});
		$(".index").click(
			function(){
			  $(".campaign").fadeIn();
			  $("#homeRotatingImage").css({'display':'none'});
			  
			}
		);
})