socket.on('games_connect', data => { if(data.creator_key == my_key || data.connected_key == my_key){
	if(data.creator_key == my_key){
		socket.emit('games_create', {
			MAP: MAP,
			game: data
		});
		enemy_key = data.connected_key;
		enemy = data.connected_info;
		game = data;
	} else if(data.connected_key == my_key){ enemy_key = data.creator_key; enemy = data.creator_info; game = data; }
}});

socket.on('create_game', data => { if(data.game.creator_key == my_key || data.game.connected_key == my_key){
	MAP = data.MAP;
	drawMap();

	$('#you-name').html(you.name);
	$('#you-img').attr('src', you.avatar);
	$('#enemy-name').html(enemy.name);
	$('#enemy-img').attr('src', enemy.avatar);

	to_menu('game');

	setTimeout(function(){
		$('#judge-text-game').typed('reset'); $('#judge-text-game').text('...');

		$("#judge-text-game").typed({
			strings: [`Добро пожаловать на арену Arbour!^1500 Сейчас тебе предстоит бой с игроком ${enemy.name}!^1500 По правилам арены,^1000 в начале игроки должны разместить трёх героев на игровое поле.^1500 Размести своего первого героя.`],
			stringsElement: null,
			typeSpeed: 40,
			startDelay: 1200,
			backSpeed: 20,
			backDelay: 500,
			loop: false,
			loopCount: 0,
			showCursor: false,
			cursorChar: "|",
			attr: null,
			contentType: 'html',
			onStringTyped: function() {
				setTimeout(function(){
					$('#judge-game').css('opacity','0');
					setTimeout(function(){
						$('#judge-game').css('display','none');
						$('#judge-text-game').typed('reset'); $('#judge-text-game').text('...');
					}, 500);
				}, 5000);
			}
		});
	}, 1000);
}});

function sync(){
	socket.emit('sync', {
		MAP: MAP,
		game: game,

		you_heroes: you_heroes,
		enemy_heroes: enemy_heroes,

		deletedHeroTile: deletedHeroTile,
		by_player: my_key
	});
}

socket.on('sync', data => { if(data.game.creator_key == my_key || data.game.connected_key == my_key){
	if(data.deletedHeroTile){
		deletedHeroTile = data.deletedHeroTile;
	} else {
		deletedHeroTile = null;
	}

	if(my_key != data.by_player){
		if(_hero_chosed_tile){
			_hero_type = MAP[_hero_chosed_tile].heroType;
		}
		MAP = data.MAP;
		drawMap();

		enemy_heroes = data.you_heroes;
		you_heroes = data.enemy_heroes;
	} else {
		you_heroes = data.you_heroes;
		enemy_heroes = data.enemy_heroes;		
	}

	updatePlayersParams();
}});