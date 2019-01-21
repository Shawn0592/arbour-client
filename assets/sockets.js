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