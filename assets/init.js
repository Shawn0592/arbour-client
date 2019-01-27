let socket = io.connect('https://exorum-server.herokuapp.com/',{'forceNew':false});
//let socket = io.connect();

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function generateSecretKey(length) {
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

function formattedDate(d = new Date) {
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = String(d.getFullYear());

  if (month.length < 2) month = '0' + month;

  return `${day}.${month}.${year}`;
}

function random(num1, num2){
  var number = randomInteger(num1,num2);
  if(number == 1){ return true; } else { return false; }
}

var my_key = generateSecretKey(20);
var enemy_key = null;
var you = {
  "first_name": null,
  "last_name": null,
  "name": null,
  "id": null,
  "avatar": null
};
socket.on('connect', function(data){
  VK.init(function(){
    VK.api('users.get', {fields: "photo_100"}, function(data){
      you.first_name = data.response[0].first_name;
      you.last_name = data.response[0].last_name;
      you.name = data.response[0].first_name+' '+data.response[0].last_name;
      you.id = data.response[0].id;
      you.avatar = data.response[0].photo_100;

      socket.emit('add_user', {key: my_key, info: you});
      $('#vk-name').text(`${you.last_name} ${you.first_name}`);
      
      VK.api('storage.get', {key: "tutorial_complited"}, function(res){
        if(res.response == "1"){
          to_menu('menu');
        } else if(!res.response){
          drawTutorialMap();
          to_menu('tutorial');
          tutorial(0);
        } else {
          alert('Ошибка при загрузке аккаунта!');
        }
      });
    });
  },'5.80');
  // drawTutorialMap();

  // socket.emit('add_user', {key: my_key, info: you});
  // $('#vk-name').text(`${you.last_name} ${you.first_name}`);
});
var game = null;

function to_menu(menu){
  $('#game').css('opacity','0');
  $('#menu').css('opacity','0');
  $('#game-search').css('opacity','0');
  $('#tutorial').css('opacity','0');
  $('.wy-tooltip').remove();

  setTimeout(function(){
    $('#game').css('display','none');
    $('#menu').css('display','none');
    $('#game-search').css('display','none');
    $('#tutorial').css('display','none');

    $('#'+menu).css('display','flex');
  }, 500);

  setTimeout(function(){
    $('#'+menu).css('opacity','1');
    if(menu == 'game-search'){
      restartFindGameIntervals();
      setTimeout(function(){
        socket.emit('games_find', {key: my_key, info: you});
      }, 1000);
    } else { stopFindGameIntervals(); }
  }, 1000);
}

function menu_hover(id){
  var el = document.getElementById('menu-item-'+id);
  el.src = 'assets/img/menu/menu'+id+'_1.png';
}

function menu_unhover(id){
  var el = document.getElementById('menu-item-'+id);
  el.src = 'assets/img/menu/menu'+id+'.png';
}
