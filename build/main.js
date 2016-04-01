'use strict';

// preloader block
var preloader = document.querySelector('.preloader_block');
preloader.style.display = 'block';

// add more button
var add_more_button = document.querySelector('.add_more');

// array of all pockemons
var objects_array;
// count of items, use to get more items next time(increase it every time we get new list of items)
var count_add_more = 12;

var detail_list = function detail_list(obj) {
	var div = document.createElement('div');
	var types_names = '';
	var types = obj.types.forEach(function (item) {
		var name = item.name += " ";
		types_names += name;
	});
	div.innerHTML = '<img src=" ' + 'http://pokeapi.co/media/img/' + obj.pkdx_id + '.png' + '" alt="' + obj.name + '"> ' + '<span class="detail_name">' + obj.name + '</span>' + '<table>' + '<thead>' + '<tr>' + '<td>' + 'Type' + '</td>' + '<td>' + types_names + '</td>' + '</tr>' + '</thead>' + '<tbody>' + '<tr>' + '<td>' + 'Attack' + '</td>' + '<td>' + obj.attack + '</td>' + '</tr>' + '<tr>' + '<td>' + 'Defence' + '</td>' + '<td>' + obj.defense + '</td>' + '</tr>' + '<tr>' + '<td>' + 'HP' + '</td>' + '<td>' + obj.hp + '</td>' + '</tr>' + '<tr>' + '<td>' + 'SP Attack' + '</td>' + '<td>' + obj.sp_atk + '</td>' + '</tr>' + '<tr>' + '<td>' + 'SP Deffence' + '</td>' + '<td>' + obj.sp_def + '</td>' + '</tr>' + '<tr>' + '<td>' + 'Speed' + '</td>' + '<td>' + obj.speed + '</td>' + '</tr>' + '<tr>' + '<td>' + 'Weight' + '</td>' + '<td>' + obj.weight + '</td>' + '</tr>' + '<tr>' + '<td>' + 'Total moves' + '</td>' + '<td>' + obj.moves.length + '</td>' + '</tr>' + '</tbody>' + '</table>';
	var detail_wrap = document.querySelector('.detail');
	detail_wrap.appendChild(div);
};

// function to create list
var makeList = function makeList(obj) {
	var list = document.createElement('div');
	list.className = ".list_wrap";
	var arr = obj;
	for (var i = 0; i < arr.length; i++) {
		var types_names = '';
		arr[i].types.forEach(function (item) {
			var name = void 0;
			if (item.name === 'fire') {
				name = '<li class="fire">' + item.name + '</li>';
			}
			if (item.name === 'poison') {
				name = '<li class="poison">' + item.name + '</li>';
			}
			if (item.name === 'water') {
				name = '<li class="water">' + item.name + '</li>';
			}
			if (item.name === 'poison') {
				name = '<li class="poison">' + item.name + '</li>';
			}
			if (item.name === 'bug') {
				name = '<li class="bug">' + item.name + '</li>';
			}
			if (item.name === 'flying') {
				name = '<li class="flying">' + item.name + '</li>';
			}
			if (item.name === 'normal') {
				name = '<li class="normal">' + item.name + '</li>';
			}

			types_names += name;
		});

		list.innerHTML += '<div class="item" id="' + arr[i].pkdx_id + '">' + '<img src="' + 'http://pokeapi.co/media/img/' + arr[i].pkdx_id + '.png' + '" alt="image">' + '<span class="name">' + arr[i].name + '</span>' + '<ul>' + types_names + '</ul>' + '</div>';
	}
	return list;
};

// add more pockemons button function
var add_more_pockemons = function add_more_pockemons() {
	console.log('clicked before ajax done');
	// show preloader
	preloader.style.display = 'block';
	// create url to send request
	var url = 'http://pokeapi.co/api/v1/pokemon/?limit=' + count_add_more.toString();
	// create promise with updated count of items ('count_add_more')
	var promise_addMore = new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, false);
		xhr.send();
		if (xhr.status != 200) {
			alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
		} else {
				var packemon = JSON.parse(xhr.responseText);
				resolve(packemon);
			}
	});
	// when promise done
	promise_addMore.then(function (result) {
		// update our count to get more items next time
		count_add_more += 12;
		// put in global var all list of objects (to find our obj in detail function)
		objects_array = result;
		// create list of items
		var test1 = makeList(result.objects);
		// take our list block
		var block = document.querySelector('.list');
		// put it in dom with innerHTML
		block.innerHTML = test1.innerHTML;
		// hide preloader
		preloader.style.display = 'none';
		// onclick event add/update detail function
		var array = document.querySelectorAll('.list .item');
		// go throu all items
		for (var i = 0; i < array.length; i++) {
			// add on each card (item) event listener
			array[i].addEventListener('click', function () {
				// take this this item id
				var id = this.getAttribute('id');
				// find in array of objects our obj (using id)
				var this_obj = objects_array.objects.filter(function (item) {
					return item.pkdx_id == id;
				});
				// take detail block
				var detail_wrap = document.querySelector('.detail');
				// clear detail block
				detail_wrap.innerHTML = '';
				// put our new obj data
				detail_list(this_obj[0]);
			});
		}
		console.log('clicked when ajax done');
	});
};
// initiate for firts time list
add_more_pockemons();
// add to button our function
add_more_button.addEventListener('click', function () {
	preloader.style.display = 'block';
	var url = 'http://pokeapi.co/api/v1/pokemon/?limit=' + count_add_more.toString();
	$.ajax({
		url: url,
		success: function success(data) {
			// update our count to get more items next time
			count_add_more += 12;
			// put in global var all list of objects (to find our obj in detail function)
			objects_array = data;
			// create list of items
			var test1 = makeList(data.objects);
			// take our list block
			var block = document.querySelector('.list');
			// put it in dom with innerHTML
			block.innerHTML = test1.innerHTML;
			// hide preloader
			preloader.style.display = 'none';
			// onclick event add/update detail function
			var array = document.querySelectorAll('.list .item');
			// go throu all items
			for (var i = 0; i < array.length; i++) {
				// add on each card (item) event listener
				array[i].addEventListener('click', function () {
					// take this this item id
					var id = this.getAttribute('id');
					// find in array of objects our obj (using id)
					var this_obj = objects_array.objects.filter(function (item) {
						return item.pkdx_id == id;
					});
					// take detail block
					var detail_wrap = document.querySelector('.detail');
					// clear detail block
					detail_wrap.innerHTML = '';
					// put our new obj data
					detail_list(this_obj[0]);
				});
			}
			console.log('clicked when ajax done');
		}
	});
});

// _____________ CREATING SELECT CHOOSE ____________ //

// PUT ALL OPTION'S IN TO SELECT - CREATE PROMISE
var select_promise = new Promise(function (resolve, reject) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://pokeapi.co/api/v1/type/?limit=999', false);
	xhr.send();
	if (xhr.status != 200) {
		alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
	} else {
			var packemon = JSON.parse(xhr.responseText);
			resolve(packemon);
		}
});

// WHEN PROMISE DONE
select_promise.then(function (result) {

	// where to put select div
	var select_wrap = document.querySelector('.choose_type');
	// create select
	var select_box = document.createElement('select');
	// create options and put them in to select
	result.objects.forEach(function (item) {
		var option = document.createElement('option');
		option.setAttribute("value", item.name);
		option.innerHTML = item.name;
		select_box.appendChild(option);
	});

	select_wrap.appendChild(select_box);
});

$(document).ready(function () {

	// function to return array of passed objects
	var passed_objects = function passed_objects(condition, array) {
		// create new array
		var passed_array = [];
		// for each object
		array.forEach(function (item) {
			// for each obj types array
			item.types.forEach(function (item_t) {
				// if name of type === condition name we push this obj in new array
				if (item_t.name === condition) {
					passed_array.push(item);
				}
			});
		});
		// return new array of passed objects
		return passed_array;
	};

	// on click
	$('.filter_type_btn').on('click', function () {
		// option depens of we will look
		var selected_type = $('select').val().toLowerCase();
		// get list of passed objects
		var passed_array_2 = passed_objects(selected_type, objects_array.objects);
		// update list of pockemons
		var test1 = makeList(passed_array_2);
		// take our list block
		var block = document.querySelector('.list');
		// put it in dom with innerHTML
		block.innerHTML = test1.innerHTML;

		// onclick event add/update detail function
		var array = document.querySelectorAll('.list .item');
		// go throu all items
		for (var i = 0; i < array.length; i++) {
			// add on each card (item) event listener
			array[i].addEventListener('click', function () {
				// take this this item id
				var id = this.getAttribute('id');
				// find in array of objects our obj (using id)
				var this_obj = objects_array.objects.filter(function (item) {
					return item.pkdx_id == id;
				});
				// take detail block
				var detail_wrap = document.querySelector('.detail');
				// clear detail block
				detail_wrap.innerHTML = '';
				// put our new obj data
				detail_list(this_obj[0]);
			});
		}
	});
});