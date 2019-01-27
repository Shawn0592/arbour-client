function hide_buttons(){
  document.getElementsByClassName('block')[0].style.bottom = '-60px';

  document.getElementsByClassName('block')[1].style.bottom = '-60px';
  document.getElementsByClassName('block')[2].style.bottom = '-60px';
  document.getElementsByClassName('block')[3].style.bottom = '-60px';
  document.getElementsByClassName('block')[4].style.bottom = '-60px';
  document.getElementsByClassName('block')[5].style.bottom = '-60px';
  document.getElementsByClassName('block')[6].style.bottom = '-60px';

  document.getElementsByClassName('block')[7].style.bottom = '-60px';
  document.getElementsByClassName('block')[8].style.bottom = '-60px';
  document.getElementsByClassName('block')[9].style.bottom = '-60px';

  document.getElementsByClassName('block')[10].style.bottom = '-60px';

  $('.heroes').css('left','-100px');
  $('.heroes .info').css('left','0px');

  $('.heroes').css('opacity','0');
  $('.heroes').css('pointer-events','none');
  $('.heroes .info').css('opacity','0');
  GAME_MENUS.key_C = false;
}

function show_buttons(){
  if(heroes < 3 && _hero_chosed == false)
    document.getElementsByClassName('block')[0].style.bottom = '10px';

  if(_hero_chosed){
    document.getElementsByClassName('block')[1].style.bottom = '10px';
    document.getElementsByClassName('block')[2].style.bottom = '10px';
    document.getElementsByClassName('block')[3].style.bottom = '10px';
    document.getElementsByClassName('block')[4].style.bottom = '10px';
    document.getElementsByClassName('block')[5].style.bottom = '10px';
    document.getElementsByClassName('block')[6].style.bottom = '10px';
  }

  if(used_q == false)
    document.getElementsByClassName('block')[7].style.bottom = '10px';
  if(_hero_chosed){
    document.getElementsByClassName('block')[8].style.bottom = '10px';
    document.getElementsByClassName('block')[9].style.bottom = '10px';

    document.getElementsByClassName('block')[10].style.bottom = '10px';
  }
}

var GAME_MENUS = {
  "key_C": false,

  "key_Q": false,
  "key_W": false,
  "key_E": false,
  "key_M": false
};

var TUTORIAL_MENUS = {
  "key_C": false,

  "key_Q": false,
  "key_W": false,
  "key_E": false,
  "key_M": false
};

function button(key){
  $('.wy-tooltip').remove();
  if(tutorial_mode == false){
    if(key == 'C' && heroes < 3){
      if(GAME_MENUS.key_C == false){
        $('.heroes').css('left','-3px');
        $('.heroes .info').css('left','77px');

        $('.heroes').css('opacity','1');
        $('.heroes').css('pointer-events','auto');
        $('.heroes .info').css('opacity','1');

        GAME_MENUS.key_C = true;
      } else if(GAME_MENUS.key_C == true){
        $('.heroes').css('left','-100px');
        $('.heroes .info').css('left','0px');

        $('.heroes').css('opacity','0');
        $('.heroes').css('pointer-events','none');
        $('.heroes .info').css('opacity','0');

        GAME_MENUS.key_C = false;
      }
    } else if(key == 'Q'){
      if(GAME_MENUS.key_Q == false){
        hide_buttons();

        _hero_chosed = false;
        _hero_chosed_tile = '';

        $('#button-Q').css('bottom','10px');
        for(var i in MAP){
          if(MAP[i].movable == true || MAP[i].hero == true){
            $('#'+i).css('opacity','.2');
          } else {
            $('#'+i).css('opacity','1');
          }
        }

        GAME_MENUS.key_Q = true;
      } else {
        show_buttons();

        for(var i in MAP){
          if(_hero_chosed == false){
            $('#'+i).css('opacity','1');
          } else {
            $('#'+i).css('opacity','.2');
            $('#'+_hero_chosed_tile).css('opacity', '1');
          }
        }

        GAME_MENUS.key_Q = false;
      }
    } else if(key == 'M'){
      if(GAME_MENUS.key_M == false){
        hide_buttons();
        document.getElementsByClassName('block')[10].style.bottom = '10px';

        _hero_move = true;

        for(var i in MAP){
         if(getMapCollision(document.getElementById(i), document.getElementById(_hero_chosed_tile)) == true && MAP[i].movable == true){
           $('#'+i).css('opacity', '1');
         }
        }

        GAME_MENUS.key_M = true;
      } else {
        _hero_move = false;

        document.getElementsByClassName('block')[0].style.bottom = '-60px';
        show_buttons();

        for(var i in MAP){
          if(i != _hero_chosed_tile)
            $('#'+i).css('opacity', '0.2');
        }

        GAME_MENUS.key_M = false; 
      }
    } else if(key == '1'){
      if(!_hero_chosed_tile || MAP[_hero_chosed_tile].hero_by_player != my_key) return;

      if($('#button-1').attr('class') == "block tooltip"){
        for(var i in MAP){
         if(getMapCollision(document.getElementById(i), document.getElementById(_hero_chosed_tile)) == true && MAP[i].movable == false){
           if(MAP[i].hero && MAP[i].hero_by_player == enemy_key){
            var damageValue = Math.round(MAGIC[HEROES[MAP[_hero_chosed_tile].heroType-1].type][0].damage-HEROES[MAP[_hero_chosed_tile].heroType-1].params[0]+HEROES[MAP[_hero_chosed_tile].heroType-1].params[5]);

            if(enemy_heroes[MAP[i].hero_number].health - damageValue <= 0){
              delete enemy_heroes[MAP[i].hero_number];
              MAP[i].movable = true;
              MAP[i].hero = false;
              MAP[i].hero_by_player = null;
              MAP[i].hero_number = null;

              deletedHeroTile = i;
            } else {
              enemy_heroes[MAP[i].hero_number].health = enemy_heroes[MAP[i].hero_number].health - damageValue;
            }
           }
         }
        }

        setTimer('button-1', 15);

        updatePlayersParams();
        sync();
        deletedHeroTile = null;

        drawMap();
      }
    } else if(key == '2'){
      if(!_hero_chosed_tile || MAP[_hero_chosed_tile].hero_by_player != my_key) return;

      if($('#button-2').attr('class') == "block tooltip"){
        if(you_heroes[MAP[_hero_chosed_tile].hero_number].mana+MAGIC[HEROES[MAP[_hero_chosed_tile].heroType-1].type][1].add_magic >= you_mana_all && you_heroes[MAP[_hero_chosed_tile].hero_number].health+MAGIC[HEROES[MAP[_hero_chosed_tile].heroType-1].type][1].add_heal >= you_health_all) return;

        if(you_heroes[MAP[_hero_chosed_tile].hero_number].mana+MAGIC[HEROES[MAP[_hero_chosed_tile].heroType-1].type][1].add_magic < you_mana_all){
          you_heroes[MAP[_hero_chosed_tile].hero_number].mana = you_heroes[MAP[_hero_chosed_tile].hero_number].mana + MAGIC[HEROES[MAP[_hero_chosed_tile].heroType-1].type][1].add_magic;
        }
        if(you_heroes[MAP[_hero_chosed_tile].hero_number].health+MAGIC[HEROES[MAP[_hero_chosed_tile].heroType-1].type][1].add_heal < you_health_all){
          you_heroes[MAP[_hero_chosed_tile].hero_number].health = you_heroes[MAP[_hero_chosed_tile].hero_number].health + MAGIC[HEROES[MAP[_hero_chosed_tile].heroType-1].type][1].add_heal;
        }

        setTimer('button-2', 30);
        updatePlayersParams();
        sync();
      }
    } else if(key == '3'){
      if(!_hero_chosed_tile || MAP[_hero_chosed_tile].hero_by_player != my_key) return;

      if($('#button-3').attr('class') == "block tooltip"){
        for(var i in MAP){
         if(getMapCollision(document.getElementById(i), document.getElementById(_hero_chosed_tile)) == true && MAP[i].movable == false){
           if(MAP[i].hero && MAP[i].hero_by_player == enemy_key){
            if(you_heroes[MAP[_hero_chosed_tile].hero_number].mana - MAGIC[HEROES[MAP[_hero_chosed_tile].heroType-1].type][2].magic_damage < 0) return;
            you_heroes[MAP[_hero_chosed_tile].hero_number].mana = you_heroes[MAP[_hero_chosed_tile].hero_number].mana - MAGIC[HEROES[MAP[_hero_chosed_tile].heroType-1].type][2].magic_damage;

            var damageValue = Math.round(MAGIC[HEROES[MAP[_hero_chosed_tile].heroType-1].type][2].magic_damage-HEROES[MAP[_hero_chosed_tile].heroType-1].params[1]+HEROES[MAP[_hero_chosed_tile].heroType-1].params[7]);

            if(enemy_heroes[MAP[i].hero_number].health - damageValue <= 0){
              delete enemy_heroes[MAP[i].hero_number];
              MAP[i].movable = true;
              MAP[i].hero = false;
              MAP[i].hero_by_player = null;
              MAP[i].hero_number = null;

              deletedHeroTile = i;
            } else {
              enemy_heroes[MAP[i].hero_number].health = enemy_heroes[MAP[i].hero_number].health - damageValue;
            }
           }
         }
        }

        setTimer('button-3', 20);

        updatePlayersParams();
        sync();
        deletedHeroTile = null;

        drawMap();
      }
    } else if(key == '4'){
      if(!_hero_chosed_tile || MAP[_hero_chosed_tile].hero_by_player != my_key) return;

      if($('#button-4').attr('class') == "block tooltip"){
        for(var i in MAP){
         if(getMapCollision(document.getElementById(i), document.getElementById(_hero_chosed_tile)) == true && MAP[i].movable == false){
           if(MAP[i].hero && MAP[i].hero_by_player == enemy_key){
            var damageValue = Math.round(MAGIC[HEROES[MAP[_hero_chosed_tile].heroType-1].type][3].damage-HEROES[MAP[_hero_chosed_tile].heroType-1].params[0]+HEROES[MAP[_hero_chosed_tile].heroType-1].params[5]);

            if(enemy_heroes[MAP[i].hero_number].health - damageValue <= 0){
              delete enemy_heroes[MAP[i].hero_number];
              MAP[i].movable = true;
              MAP[i].hero = false;
              MAP[i].hero_by_player = null;
              MAP[i].hero_number = null;

              deletedHeroTile = i;
            } else {
              enemy_heroes[MAP[i].hero_number].health = enemy_heroes[MAP[i].hero_number].health - damageValue;
            }
           }
         }
        }

        setTimer('button-4', 35);

        updatePlayersParams();
        sync();
        deletedHeroTile = null;

        drawMap();
      }
    } else if(key == '5'){
      if(!_hero_chosed_tile || MAP[_hero_chosed_tile].hero_by_player != my_key) return;

      if($('#button-5').attr('class') == "block tooltip"){
        for(var i in MAP){
         if(getMapCollision(document.getElementById(i), document.getElementById(_hero_chosed_tile)) == true && MAP[i].movable == false){
           if(MAP[i].hero && MAP[i].hero_by_player == enemy_key){
            if(you_heroes[MAP[_hero_chosed_tile].hero_number].mana - MAGIC[HEROES[MAP[_hero_chosed_tile].heroType-1].type][4].magic_damage < 0) return;
            you_heroes[MAP[_hero_chosed_tile].hero_number].mana = you_heroes[MAP[_hero_chosed_tile].hero_number].mana - MAGIC[HEROES[MAP[_hero_chosed_tile].heroType-1].type][4].magic_damage;

            var damageValue = Math.round(MAGIC[HEROES[MAP[_hero_chosed_tile].heroType-1].type][4].magic_damage-HEROES[MAP[_hero_chosed_tile].heroType-1].params[1]+HEROES[MAP[_hero_chosed_tile].heroType-1].params[7]);

            if(enemy_heroes[MAP[i].hero_number].health - damageValue <= 0){
              delete enemy_heroes[MAP[i].hero_number];
              MAP[i].movable = true;
              MAP[i].hero = false;
              MAP[i].hero_by_player = null;
              MAP[i].hero_number = null;

              deletedHeroTile = i;
            } else {
              enemy_heroes[MAP[i].hero_number].health = enemy_heroes[MAP[i].hero_number].health - damageValue;
            }
           }
         }
        }

        setTimer('button-5', 45);

        updatePlayersParams();
        sync();
        deletedHeroTile = null;

        drawMap();
      }
    } else if(key == '6'){
      if(!_hero_chosed_tile || MAP[_hero_chosed_tile].hero_by_player != my_key) return;

      if($('#button-6').attr('class') == "block tooltip"){
        for(var i in MAP){
         if(getMapCollision(document.getElementById(i), document.getElementById(_hero_chosed_tile)) == true && MAP[i].movable == false){
           if(MAP[i].hero && MAP[i].hero_by_player == enemy_key){
            var damageValue = Math.round(MAGIC[HEROES[MAP[_hero_chosed_tile].heroType-1].type][5].damage-HEROES[MAP[_hero_chosed_tile].heroType-1].params[0]+HEROES[MAP[_hero_chosed_tile].heroType-1].params[5]);

            if(enemy_heroes[MAP[i].hero_number].health - damageValue <= 0){
              delete enemy_heroes[MAP[i].hero_number];
              MAP[i].movable = true;
              MAP[i].hero = false;
              MAP[i].hero_by_player = null;
              MAP[i].hero_number = null;

              deletedHeroTile = i;
            } else {
              enemy_heroes[MAP[i].hero_number].health = enemy_heroes[MAP[i].hero_number].health - damageValue;
            }
           }
         }
        }

        if(you_heroes[MAP[_hero_chosed_tile].hero_number].mana+MAGIC[HEROES[MAP[_hero_chosed_tile].heroType-1].type][5].add_magic >= you_mana_all && you_heroes[MAP[_hero_chosed_tile].hero_number].health+MAGIC[HEROES[MAP[_hero_chosed_tile].heroType-1].type][1].add_heal >= you_health_all) return;

        if(you_heroes[MAP[_hero_chosed_tile].hero_number].mana+MAGIC[HEROES[MAP[_hero_chosed_tile].heroType-1].type][5].add_magic < you_mana_all){
          you_heroes[MAP[_hero_chosed_tile].hero_number].mana = you_heroes[MAP[_hero_chosed_tile].hero_number].mana + MAGIC[HEROES[MAP[_hero_chosed_tile].heroType-1].type][5].add_magic;
        }
        if(you_heroes[MAP[_hero_chosed_tile].hero_number].health+MAGIC[HEROES[MAP[_hero_chosed_tile].heroType-1].type][5].add_heal < you_health_all){
          you_heroes[MAP[_hero_chosed_tile].hero_number].health = you_heroes[MAP[_hero_chosed_tile].hero_number].health + MAGIC[HEROES[MAP[_hero_chosed_tile].heroType-1].type][5].add_heal;
        }

        setTimer('button-6', 23);

        updatePlayersParams();
        sync();
        deletedHeroTile = null;

        drawMap();
      }
    }
  } else {
    if(key == 'Q'){
      if(TUTORIAL_MENUS.key_Q == false){
        $('#button-Q').css('bottom','10px');
        for(var i in TUTORIAL_MAP){
          if(TUTORIAL_MAP[i].movable == true || TUTORIAL_MAP[i].hero == true){
            $('#tutorial-'+i).css('opacity','.2');
          } else {
            $('#tutorial-'+i).css('opacity','1');
          }
        }

        TUTORIAL_MENUS.key_Q = true;
      } else {
        show_buttons();

        for(var i in TUTORIAL_MAP){
          if(_hero_chosed == false){
            $('#tutorial-'+i).css('opacity','1');
          } else {
            $('#tutorial-'+i).css('opacity','.2');
            $('#tutorial-'+_hero_chosed_tile).css('opacity', '1');
          }
        }

        TUTORIAL_MENUS.key_Q = false;
      }
    } else if(key == 'C' && heroes < 3){
      if(TUTORIAL_MENUS.key_C == false){
        $('.heroes-tutorial').css('left','-3px');
        $('.heroes-tutorial .info').css('left','77px');

        $('.heroes-tutorial').css('opacity','1');
        $('.heroes-tutorial').css('pointer-events','auto');
        $('.heroes-tutorial .info').css('opacity','1');

        TUTORIAL_MENUS.key_C = true;
      } else if(TUTORIAL_MENUS.key_C == true){
        $('.heroes-tutorial').css('left','-100px');
        $('.heroes-tutorial .info').css('left','0px');

        $('.heroes-tutorial').css('opacity','0');
        $('.heroes-tutorial').css('pointer-events','none');
        $('.heroes-tutorial .info').css('opacity','0');

        TUTORIAL_MENUS.key_C = false;
      }
    } else if(key == '1' || key == '3' || key == '4' || key == '5' || key == '6'){
      $('#hero-'+tutorial_enemy_tile+'-3').remove();
      TUTORIAL_MAP[tutorial_enemy_tile].hero = false;
      TUTORIAL_MAP[tutorial_enemy_tile].movable = true;
      TUTORIAL_MAP[tutorial_enemy_tile].hero_by_player = null;
      TUTORIAL_MAP[tutorial_enemy_tile].heroType = null;
      TUTORIAL_MAP[tutorial_enemy_tile].hero_number = null;
      tutorial_enemy_tile = null;
      document.getElementsByClassName('block-tutorial')[1].style.bottom = '-60px'; // 1
      document.getElementsByClassName('block-tutorial')[2].style.bottom = '-60px'; // 2
      document.getElementsByClassName('block-tutorial')[3].style.bottom = '-60px'; // 3
      document.getElementsByClassName('block-tutorial')[4].style.bottom = '-60px'; // 4
      document.getElementsByClassName('block-tutorial')[5].style.bottom = '-60px'; // 5
      document.getElementsByClassName('block-tutorial')[6].style.bottom = '-60px'; // 6

      setTimeout(function(){
        $('#judge').css('opacity','0');
        $('#judge').css('display','block');
        $('#judge').css('opacity','1');
        setTimeout(function(){
          tutorial(tutorial_step)
        }, 500);
      }, 2000);
    } else if(key == 'M'){
      if(TUTORIAL_MENUS.key_M == false){
        hide_buttons();
        document.getElementsByClassName('block-tutorial')[10].style.bottom = '10px';

        _hero_move = true;

        for(var i in TUTORIAL_MAP){
         if(getMapCollision(document.getElementById('tutorial-'+i), document.getElementById('tutorial-'+_hero_chosed_tile)) == true && TUTORIAL_MAP[i].movable == true){
           $('#tutorial-'+i).css('opacity', '1');
         }
        }

        TUTORIAL_MENUS.key_M = true;
      } else {
        _hero_move = false;

        document.getElementsByClassName('block-tutorial')[0].style.bottom = '-60px';

        for(var i in TUTORIAL_MAP){
          if(i != _hero_chosed_tile)
            $('#tutorial-'+i).css('opacity', '0.2');
        }

        TUTORIAL_MENUS.key_M = false; 
      }
    }
  }
}

function _hero_chose(hero){
  if(tutorial_mode == false){
    hide_buttons();

    for(var i in MAP){
      if(MAP[i].movable == false){
        $('#'+i).css('opacity','.2');
      }
    }

    heroes = heroes + 1;
    you_heroes.push({index: hero-1, health: HEROES[hero-1].params[4]*10, mana: HEROES[hero-1].params[3]*10});
    hero_chose = hero;
    hero_chosed = true;

    you_health_all = you_health_all + HEROES[hero_chose*1-1].params[4]*10;
    you_health = you_health + HEROES[hero_chose*1-1].params[4]*10;

    you_mana_all = you_mana_all + HEROES[hero_chose*1-1].params[3]*10;
    you_mana = you_mana + HEROES[hero_chose*1-1].params[3]*10;

    updatePlayersParams();
  } else {
    for(var i in TUTORIAL_MAP){
      if(TUTORIAL_MAP[i].movable == false){
        $('#tutorial-'+i).css('opacity','.2');
      }
    }

    $('.heroes-tutorial').css('left','-100px');
    $('.heroes-tutorial .info').css('left','0px');

    $('.heroes-tutorial').css('opacity','0');
    $('.heroes-tutorial').css('pointer-events','none');
    $('.heroes-tutorial .info').css('opacity','0');


    document.getElementsByClassName('block-tutorial')[0].style.bottom = '-60px';
    TUTORIAL_MENUS.key_C = false;    

    heroes = heroes + 1;
    you_heroes.push({index: hero-1, health: HEROES[hero-1].params[4]*10, mana: HEROES[hero-1].params[3]*10});
    hero_chose = hero;
    hero_chosed = true;  
  }
}

$(document).keypress(function(event){
  if($('game').css('display') != 'none'){
    var key = String.fromCharCode(event.which);
    if(key == 'C' || key == 'c' || key == 'с' || key == 'С'){
      if(tutorial_mode == false && $('#button-C').css('bottom') != '10px') return;
      if(tutorial_mode == true && $('#button-tutorial-C').css('bottom') != '10px') return;
      button('C');
    } else if(key == '1'){
      if(tutorial_mode == false && $('#button-1').css('bottom') != '10px') return;
      if(tutorial_mode == true && $('#button-tutorial-1').css('bottom') != '10px') return;
      button('1');
    } else if(key == '2'){
      if(tutorial_mode == false && $('#button-2').css('bottom') != '10px') return;
      if(tutorial_mode == true && $('#button-tutorial-2').css('bottom') != '10px') return;
      button('2');
    } else if(key == '3'){
      if(tutorial_mode == false && $('#button-3').css('bottom') != '10px') return;
      if(tutorial_mode == true && $('#button-tutorial-3').css('bottom') != '10px') return;
      button('3');
    } else if(key == '4'){
      if(tutorial_mode == false && $('#button-4').css('bottom') != '10px') return;
      if(tutorial_mode == true && $('#button-tutorial-4').css('bottom') != '10px') return;
      button('4');
    } else if(key == '5'){
      if(tutorial_mode == false && $('#button-5').css('bottom') != '10px') return;
      if(tutorial_mode == true && $('#button-tutorial-5').css('bottom') != '10px') return;
      button('5');
    } else if(key == '6'){
      if(tutorial_mode == false && $('#button-6').css('bottom') != '10px') return;
      if(tutorial_mode == true && $('#button-tutorial-6').css('bottom') != '10px') return;
      button('6');
    } else if(key == 'Q' || key == 'q' || key == 'й' || key == 'Й'){
      if(tutorial_mode == false && $('#button-Q').css('bottom') != '10px') return;
      if(tutorial_mode == true && $('#button-tutorial-Q').css('bottom') != '10px') return;
      button('Q');
    } else if(key == 'W' || key == 'w' || key == 'ц' || key == 'Ц'){
      if(tutorial_mode == false && $('#button-W').css('bottom') != '10px') return;
      if(tutorial_mode == true && $('#button-tutorial-W').css('bottom') != '10px') return;
      button('W');
    } else if(key == 'E' || key == 'e' || key == 'у' || key == 'У'){
      if(tutorial_mode == false && $('#button-E').css('bottom') != '10px') return;
      if(tutorial_mode == true && $('#button-tutorial-E').css('bottom') != '10px') return;
      button('E');
    } else if(key == 'M' || key == 'm' || key == 'ь' || key == 'Ь'){
      if(tutorial_mode == false && $('#button-M').css('bottom') != '10px') return;
      if(tutorial_mode == true && $('#button-tutorial-M').css('bottom') != '10px') return;
      button('M');
    }
  }
});

function drawMenu(type){
  for(var i = 1; i <= 6; i++){
    var el = document.getElementById('magic-'+i);
    el.src = 'assets/img/magic/'+type+'/'+i+'.svg';

    var description = '';
    if(i == 1){ description = `Наносит противнику на ближайшей клетке <span class="red">${MAGIC[type][i-1].damage}</span> единицу урона` }
    if(i == 2){ description = `Восстанавливает <span class="danger">${MAGIC[type][i-1].add_heal}</span> здоровья и <span class="primary">${MAGIC[type][i-1].add_magic}</span> маны` }
    if(i == 3){ description = `Наносит противнику на ближайшей клетке <span class="red">${MAGIC[type][i-1].magic_damage}</span> единиц магического урона` }
    if(i == 4){ description = `Наносит противнику на ближайшей клетке <span class="red">${MAGIC[type][i-1].damage}</span> единиц урона` }
    if(i == 5){ description = `Наносит противнику на ближайшей клетке <span class="red">${MAGIC[type][i-1].magic_damage}</span> единиц магического урона` }
    if(i == 6){ description = `Наносит противнику на ближайшей клетке <span class="red">${MAGIC[type][i-1].damage}</span> единиц урона и восстанавливает <span class="danger">${MAGIC[type][i-1].add_heal}</span> здоровья и <span class="primary">${MAGIC[type][i-1].add_magic}</span> маны` }

    var doc = document.getElementById('button-'+i)
    doc.title = `<b>${MAGIC[type][i-1].name}</b><p>${description}</p>`
  }
}