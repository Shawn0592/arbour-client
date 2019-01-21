var Delay = 10, ToolTipTimer
$('.tooltip').hover(function(e){
	var title = $(this).attr('title');
	$(this).data('ToolTipText', title).removeAttr('title');
	$('<div class="wy-tooltip wy-hide"></div>').html(title).appendTo('body');
	ToolTipTimer  = setTimeout(function(e) {
		$('.wy-tooltip').removeClass('wy-hide').fadeIn('fast');
	},Delay);
}, function() {
	clearTimeout(ToolTipTimer);
	$(this).attr('title', $(this).data('ToolTipText'));
	$('.wy-tooltip').remove();
}).mousemove(function(e) {
	var pLeft;
	var pTop;
	var offset = 10;
	var CursorX = e.clientX-20;
	var CursorY = e.clientY-20;
	var WindowWidth = $(window).width();
	var WindowHeight = $(window).height();
	var toolTip = $('.wy-tooltip');
	var TTWidth = toolTip.width();
	var TTHeight = toolTip.height();			
	if (CursorX-offset >= (WindowWidth/5.8)*3) {
		pLeft = CursorX - TTWidth - offset;
	} else {
		pLeft = CursorX + offset;
	}
	if (CursorY-offset >= (WindowHeight/4)*3) {
		pTop = CursorY - TTHeight - offset;
	} else {
		pTop = CursorY + offset;
	}
	$('.wy-tooltip').css({ top: pTop, left: pLeft })			
});