var count = 2;
var array = 0;
var sliderInt = setInterval(function(){
	var array_name
	if(array == 0){ array_name = "fire"; }
	if(array == 1){ array_name = "winter"; }
	if(array == 2){ array_name = "chemical"; }
	if(array == 3){ array_name = "druid"; }

	$('#message').css('right', '-100px');
	$('#message').css('opacity', '0');
	setTimeout(function(){
		$('#message').css('right', '50px');
		$('#message').css('opacity', '1');

		$('#slider-image').attr('src', 'assets/img/magic/'+array_name+'/'+count+'.svg');
	    var description = '';
	    if(count == 1){ description = `Наносит противнику на ближайшей клетке <span class="red">${MAGIC[array_name][count-1].damage}</span> единицу урона` }
	    if(count == 2){ description = `Восстанавливает <span class="danger">${MAGIC[array_name][count-1].add_heal}</span> здоровья и <span class="primary">${MAGIC[array_name][count-1].add_magic}</span> маны` }
	    if(count == 3){ description = `Наносит противнику на ближайшей клетке <span class="red">${MAGIC[array_name][count-1].magic_damage}</span> единиц магического урона` }
	    if(count == 4){ description = `Наносит противнику на ближайшей клетке <span class="red">${MAGIC[array_name][count-1].damage}</span> единиц урона` }
	    if(count == 5){ description = `Наносит противнику на ближайшей клетке <span class="red">${MAGIC[array_name][count-1].magic_damage}</span> единиц магического урона` }
	    if(count == 6){ description = `Наносит противнику на ближайшей клетке <span class="red">${MAGIC[array_name][count-1].damage}</span> единиц урона и восстанавливает <span class="danger">${MAGIC[array_name][count-1].add_heal}</span> здоровья и <span class="primary">${MAGIC[array_name][count-1].add_magic}</span> маны` }

		$('#slider-text').html(`
			<b>${MAGIC[array_name][count-1].name} <img src="assets/img/${array_name}.svg" width="16" height="16"></b>
			<p>${description}</p>
		`);

		if(count == 6){
			count = 1;
			if(array == 3){ array = 0; } else { array++; }
		} else { count++; }
	}, 1000);
}, 6000);

var dots = '.';
var dotsInt = setInterval(function(){
	$('#find-text').html(`Поиск игры${dots}`);
	dots += '.';
	if(dots == '....'){ dots = ''; }
}, 700);

function restartFindGameIntervals(){
	count = 2;
	array = 0;
	sliderInt = setInterval(function(){
		var array_name
		if(array == 0){ array_name = "fire"; }
		if(array == 1){ array_name = "winter"; }
		if(array == 2){ array_name = "chemical"; }
		if(array == 3){ array_name = "druid"; }

		$('#message').css('right', '-100px');
		$('#message').css('opacity', '0');
		setTimeout(function(){
			$('#message').css('right', '50px');
			$('#message').css('opacity', '1');

			$('#slider-image').attr('src', 'assets/img/magic/'+array_name+'/'+count+'.svg');
		    var description = '';
		    if(count == 1){ description = `Наносит противнику на ближайшей клетке <span class="red">${MAGIC[array_name][count-1].damage}</span> единицу урона` }
		    if(count == 2){ description = `Восстанавливает <span class="danger">${MAGIC[array_name][count-1].add_heal}</span> здоровья и <span class="primary">${MAGIC[array_name][count-1].add_magic}</span> маны` }
		    if(count == 3){ description = `Наносит противнику на ближайшей клетке <span class="red">${MAGIC[array_name][count-1].magic_damage}</span> единиц магического урона` }
		    if(count == 4){ description = `Наносит противнику на ближайшей клетке <span class="red">${MAGIC[array_name][count-1].damage}</span> единиц урона` }
		    if(count == 5){ description = `Наносит противнику на ближайшей клетке <span class="red">${MAGIC[array_name][count-1].magic_damage}</span> единиц магического урона` }
		    if(count == 6){ description = `Наносит противнику на ближайшей клетке <span class="red">${MAGIC[array_name][count-1].damage}</span> единиц урона и восстанавливает <span class="danger">${MAGIC[array_name][count-1].add_heal}</span> здоровья и <span class="primary">${MAGIC[array_name][count-1].add_magic}</span> маны` }

			$('#slider-text').html(`
				<b>${MAGIC[array_name][count-1].name} <img src="assets/img/${array_name}.svg" width="16" height="16"></b>
				<p>${description}</p>
			`);

			if(count == 6){
				count = 1;
				if(array == 3){ array = 0; } else { array++; }
			} else { count++; }
		}, 1000);
	}, 6000);

	dotsInt = setInterval(function(){
		$('#find-text').html(`Поиск игры${dots}`);
		dots += '.';
		if(dots == '....'){ dots = ''; }
	}, 500);
}

function stopFindGameIntervals(){
	clearInterval(sliderInt);
	clearInterval(dotsInt);
}

stopFindGameIntervals();