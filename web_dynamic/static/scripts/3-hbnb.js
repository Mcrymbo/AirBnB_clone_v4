const $ = window.$;
$(document).ready(function () {
	const amenities = {};
	$('INPUT[type="checkbox"]').on("click", function () {
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
		console.log($('#api_status').prop('class'))
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
<div class="price_by_night"> ${places[i].price_by_night} </div>
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
