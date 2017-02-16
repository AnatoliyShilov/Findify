db = new DB();
window.onload = function() {
	showMenu();
}

function showMenu() {
	document.getElementById('display').innerHTML = '<p>МЕНЮ</p><br>' +
	'<input type="button" value="Просмотр" onclick="showButton();"><br>' +
	'<input type="button" value="Добавить" onclick="addButton();"><br>';
}
function addButton(){
	db.addItem();
}
function showButton(){
	db.show();
}
function redyButton(){
	db.insertData();
	showMenu();
}

function Items(){
	this.data = null;
	this.next = null;
	this.prev = null;
	this.setData = function(){
		if(this.data == null)
			return 0;
		this.data.nStore = document.getElementById('inNStore').value;
		this.data.nSection = document.getElementById('inNSection').value;
		this.data.nCheck = document.getElementById('inNCheck').value;
		this.data.name = document.getElementById('inName').value;
		this.data.articul = document.getElementById('inArticul').value;
		this.data.price = document.getElementById('inPrice').value;
		this.data.count = document.getElementById('inCount').value;
		this.data.sale.setAll(document.getElementById('inDay').value,
			document.getElementById('inMounth').value,
			document.getElementById('inNStore').value);
	};
	this.getData = function(){};
}

function sDate(){
	this.day = 0;
	this.mounth = 0;
	this.year = 0;
	this.setAll = function(day, mounth, year){
		this.day = day;
		this.mounth = mounth;
		this.year = year;
	};
}

function Sales(){
	this.nStore;
	this.nSection;
	this.nCheck;
	this.name;
	this.articul;
	this.price;
	this.count;
	this.sale = new sDate();
}

function DB(){
	var first = new Items();
	var last = first;
	this.show = function(){
		if (first.data == null)
			return 0;
		var outstr = '';
		for (var temp = first; temp != null; temp = temp.next) {
		 	outstr += temp.data.nStore + ' ' + 
		 			temp.data.nSection + ' ' +
		 			temp.data.nCheck + ' ' +
		 			temp.data.name + ' ' + 
		 			temp.data.articul + ' ' +
		 			temp.data.price + ' ' +
		 			temp.data.count + ' ' +
		 			temp.data.sale.day + '.' + temp.data.sale.mounth + '.' + temp.data.sale.year + '<br>';
		 }
		 document.getElementById('display').innerHTML = outstr +
		 '<br><input type="button" value="Назад" onclick="showMenu();">';
	};
	this.addItem = function(){
		document.getElementById('display').innerHTML = '<b>Добавить запись</b><br>'+
		'Номер магазина: <input id="inNStore"><br>'+
		'Номер секции: <input id="inNSection"><br>'+
		'Номер чека: <input id="inNCheck"><br>'+
		'Наименование: <input id="inName"><br>'+
		'Артикул: <input id="inArticul"><br>'+
		'Цена: <input id="inPrice"><br>'+
		'Количество: <input id="inCount"><br>'+
		'Дата продажи<br>'+
		'День: <input id="inDay"><br>'+
		'Месяц: <input id="inMounth"><br>'+
		'Год: <input id="inYear"><br>'+
		'<input type="button" value="Готово" onclick="redyButton();">';
	};
	this.insertData = function(){
		if (first.data == null){
			first.data = new Sales();
			first.setData();
		} else {
			last.next = new Items();
			var temp = last.next;
			temp.prev = last;
			last = temp;
			last.data = new Sales();
			last.setData();
		}
	};
}

