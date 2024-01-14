const $ = window.$;
$(document).ready(function () {
	const amenities = {};
	let places = [];
	let newPlaces = [];
	$('.amenities .popover INPUT[type="checkbox"]').on("click", function () {
		const amenityId = $(this).attr('data-id');
		const amenityName = $(this).attr('data-name');
		if ($(this).prop('checked') === true) {
			amenities[amenityId] = amenityName;
		} else if ($(this).prop('checked') == false) {
			delete amenities[amenityId];
		}

		const amenityList = Object.values(amenities).join(', ');
		if (amenityList.length > 30) {
			$('.amenities h4').text(amenityList.substring(0, 29) + '...');
		} else {
			$('.amenities h4').text(amenityList);
		}
		if ($.isEmptyObject(amenities)) {
			$('.amenities h4').html('&nbsp');
		}
	});
	$.ajax({
		url: 'http://127.0.0.1:5001/api/v1/status/',
		type: 'GET',
		dataType: 'json',
		success: function (data) {
			if (data.status === "OK") {
				$('#api_status').addClass('available');
			} else {
				$('#api_status').removeClass('available');
			}
		},
		error: function (xhr, status) {
			console.log('error ' + xhr);
		}
	});
	$.ajax({
		type: 'POST',
		url: 'http://127.0.0.1:5001/api/v1/places_search',
		dataType: 'json',
		data: '{}',
		contentType: 'application/json; charset=utf-8',
		success: function (places) {
			for (let i = 0; i < places.length; i++) {
			$('.places').append(`<article>
			<div class="title_box">
			<h2> ${places[i].name}</h2>
			<div class="price_by_night"> $${places[i].price_by_night} </div>
			</div>
			<div class="information">
			<div class="max_guest">${places[i].max_guest}
			${places[i].max_guest > 1 ? 'Guests' : 'Guest'} </div>
			<div class="number_rooms">${places[i].number_rooms}
			${places[i].number_rooms > 1 ? 'Bedrooms' : 'Bedroom'}  </div>
			<div class="number_bathrooms">${places[i].number_bathrooms}
			${places[i].number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}  </div>
			</div>
			<div class="user">
			</div>
			<div class="description">
			${places[i].description}
			</div>
			</article>
				`);
			}
		},
		error: function (xhr, status) {
			console.log('error ' + status);
		}
	});
	$('.container .filters button').on('click', function () {
		$('article').remove();
		newPlaces.length = 0;
		let newPlace = [];
		$.ajax({
			type: 'POST',
			url: 'http://127.0.0.1:5001/api/v1/places_search',
			dataType: 'json',
			data: '{}',
			contentType: 'application/json; charset=utf-8',
			success: function (place) {
				for (let i = 0; i < place.length; i++) {
					$.get("http://127.0.0.1:5001/api/v1/places/" + place[i].id + "/amenities", function (place_amenity) {
						amenity_count = 0;

						for (let j = 0; j < Object.keys(amenities).length; j++) {
							for (let k = 0; k < place_amenity.length; k++) {
								if (place_amenity[k].id === Object.keys(amenities)[j]) {
									amenity_count += 1;
								}
							}
						}
						if (amenity_count === Object.keys(amenities).length) {
							newPlace.push(place[i]);
						}
					});
				}
				$.get('http://127.0.0.1:5001/api/v1/users/', function (users) {
					for (let i = 0; i < newPlace.length; i++) {
						for (let j = 0; j < users.length; j++) {
							if (users[j].id === newPlace[i].user_id) {
								newPlaces.push(`<article>

<div class="title_box">
<h2> ${newPlace[i].name}</h2>
<div class="price_by_night"> $${newPlace[i].price_by_night} </div>
</div>
<div class="information">
<div class="max_guest">${newPlace[i].max_guest}
${newPlace[i].max_guest > 1 ? 'Guests' : 'Guest'} </div>
<div class="number_rooms">${newPlace[i].number_rooms}
${place[i].number_rooms > 1 ? 'Bedrooms' : 'Bedroom'}  </div>
<div class="number_bathrooms">${newPlace[i].number_bathrooms}
${newPlace[i].number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}  </div>
</div>
<div class="user">
<strong>Owner: ${users[j].first_name} ${users[j].last_name}</strong>
</div>
<div class="description">
${newPlace[i].description}
</div>
</article>
`);
							}
						}
					}
						$('section.places').append(newPlaces.join(''));
				});
			}
		});
	});
	const states = {};
	const cities = {};
	$('.locations .popover li INPUT[type="checkbox"]').on("click", function () {
                const stateId = $(this).attr('data-id');
                const stateName = $(this).attr('data-name');
                if ($(this).prop('checked') === true) {
                        states[stateId] = stateName;
                } else if ($(this).prop('checked') == false) {
                        delete states[stateId];
                }

                const stateList = Object.values(states).join(', ');
                if (stateList.length > 30) {
                        $('.locations h4').text(stateList.substring(0, 29) + '...');
                } else {
                        $('.locations h4').text(stateList);
                }
                if ($.isEmptyObject(states)) {
                        $('.locations h4').html('&nbsp');
                }
        });
	$('.locations .popover li li INPUT[type="checkbox"]').on("click", function () {
                const cityId = $(this).attr('data-id');
                const cityName = $(this).attr('data-name');
                if ($(this).prop('checked') === true) {
                        cities[cityId] = cityName;
                } else if ($(this).prop('checked') == false) {
                        delete cities[cityId];
                }

                const cityList = Object.values(cities).join(', ');
                if (cityList.length > 30) {
                        $('.locations h4').text(cityList.substring(0, 29) + '...');
                } else {
                        $('.locations h4').text(cityList);
                }
                if ($.isEmptyObject(cities)) {
                        $('.locations h4').html('&nbsp');
                }
        });
});
