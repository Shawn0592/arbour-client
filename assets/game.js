var used_q = false;
var hero_chosed = false;
var hero_chose = null;

var _hero_chosed = false;
var _hero_chosed_tile = '';
var _hero_move = false;
var _hero_type = null;
var heroes = 0;
var you_heroes = [];
var enemy_heroes = [];

var magic_1 = 0;
var magic_2 = 0;
var magic_3 = 0;
var magic_4 = 0;
var magic_5 = 0;
var magic_6 = 0;
var enemy = {};

var you_health = 0;
var you_health_all = 0;
var you_mana = 0;
var you_mana_all = 0;
var enemy_health = 0;
var enemy_health_all = 0;
var enemy_mana = 0;
var enemy_mana_all = 0;

var you_key = 123;
var enemy_key = 321;
var deletedHeroTile = null;
var tutorial_mode = false;

$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();   
});

document.getElementsByClassName('block')[0].style.bottom = '10px'; // C
document.getElementsByClassName('block')[1].style.bottom = '-60px'; // 1
document.getElementsByClassName('block')[2].style.bottom = '-60px'; // 2
document.getElementsByClassName('block')[3].style.bottom = '-60px'; // 3
document.getElementsByClassName('block')[4].style.bottom = '-60px'; // 4
document.getElementsByClassName('block')[5].style.bottom = '-60px'; // 5
document.getElementsByClassName('block')[6].style.bottom = '-60px'; // 6
document.getElementsByClassName('block')[7].style.bottom = '10px'; // Q
document.getElementsByClassName('block')[8].style.bottom = '-60px'; // W
document.getElementsByClassName('block')[9].style.bottom = '-60px'; // E
document.getElementsByClassName('block')[10].style.bottom = '-60px'; // M

document.getElementsByClassName('block-tutorial')[0].style.bottom = '-60px'; // C
document.getElementsByClassName('block-tutorial')[1].style.bottom = '-60px'; // 1
document.getElementsByClassName('block-tutorial')[2].style.bottom = '-60px'; // 2
document.getElementsByClassName('block-tutorial')[3].style.bottom = '-60px'; // 3
document.getElementsByClassName('block-tutorial')[4].style.bottom = '-60px'; // 4
document.getElementsByClassName('block-tutorial')[5].style.bottom = '-60px'; // 5
document.getElementsByClassName('block-tutorial')[6].style.bottom = '-60px'; // 6
document.getElementsByClassName('block-tutorial')[7].style.bottom = '-60px'; // Q
document.getElementsByClassName('block-tutorial')[8].style.bottom = '-60px'; // W
document.getElementsByClassName('block-tutorial')[9].style.bottom = '-60px'; // E
document.getElementsByClassName('block-tutorial')[10].style.bottom = '-60px'; // M

function setTimer(el, t){
	var time = t*1000;
	var element = $('#'+el);
	$('#'+el+'-timer').html(t);
	element.attr('class','block tooltip blocked');

	var ticks = 0;
	var _timer = setInterval(function(){
		ticks++;
		if(ticks == t){
			element.attr('class','block tooltip');
			clearInterval(_timer);
		}
		$('#'+el+'-timer').html(t-ticks);
	}, 1000);
}

function updatePlayersParams(){
	you_health = 0;
	for(var i in you_heroes){
		if(you_heroes[i] != null)
			you_health += you_heroes[i].health;
	}
	enemy_health = 0;
	for(var i in enemy_heroes){
		if(enemy_heroes[i] != null)
			enemy_health += enemy_heroes[i].health;
	}
	you_mana = 0;
	for(var i in you_heroes){
		if(you_heroes[i] != null)
			you_mana += you_heroes[i].mana;
	}
	enemy_mana = 0;
	for(var i in enemy_heroes){
		if(enemy_heroes[i] != null)
			enemy_mana += enemy_heroes[i].mana;
	}

	you_health_all = 0;
	for(var i in you_heroes){
		if(you_heroes[i] != null)
			you_health_all = you_health_all + HEROES[you_heroes[i].index].params[4]*10;
	}
	you_mana_all = 0;
	for(var i in you_heroes){
		if(you_heroes[i] != null)
			you_mana_all = you_mana_all + HEROES[you_heroes[i].index].params[3]*10;
	}
	enemy_health_all = 0;
	for(var i in enemy_heroes){
		if(enemy_heroes[i] != null)
			enemy_health_all = enemy_health_all + HEROES[enemy_heroes[i].index].params[4]*10;
	}
	enemy_mana_all = 0;
	for(var i in enemy_heroes){
		if(enemy_heroes[i] != null)
			enemy_mana_all = enemy_mana_all + HEROES[enemy_heroes[i].index].params[3]*10;
	}

	if(you_health_all != 0){
		$('#you_health').html(`
			${you_health}/${you_health_all}
			<div class="progress-health" id="you_health_progress" style="width:${you_health*100/you_health_all}%;"></div>
		`);
	} else {
		$('#you_health').html(`
			${you_health}/${you_health_all}
			<div class="progress-health" id="you_health_progress" style="width:0%;"></div>
		`);
	}
	if(you_mana_all != 0){
		$('#you_mana').html(`
			${you_mana}/${you_mana_all}
			<div class="progress-mana" id="you_mana_progress" style="width:${you_mana*100/you_mana_all}%;"></div>
		`);
	} else {
		$('#you_mana').html(`
			${you_mana}/${you_mana_all}
			<div class="progress-mana" id="you_mana_progress" style="width:0%;"></div>
		`);
	}

	if(enemy_health_all != 0){
		$('#enemy_health').html(`
			${enemy_health}/${enemy_health_all}
			<div class="progress-health" id="enemy_health_progress" style="width:${enemy_health*100/enemy_health_all}%;"></div>
		`);
	} else {
		$('#enemy_health').html(`
			${enemy_health}/${enemy_health_all}
			<div class="progress-health" id="enemy_health_progress" style="width:0%;"></div>
		`);
	}
	if(enemy_mana_all != 0){
		$('#enemy_mana').html(`
			${enemy_mana}/${enemy_mana_all}
			<div class="progress-mana" id="enemy_mana_progress" style="width:${enemy_mana*100/enemy_mana_all}%;"></div>
		`);
	} else {
		$('#enemy_mana').html(`
			${enemy_mana}/${enemy_mana_all}
			<div class="progress-mana" id="enemy_mana_progress" style="width:0%;"></div>
		`);
	}
}