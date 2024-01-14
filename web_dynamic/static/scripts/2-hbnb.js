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
	const url = 'http://127.0.0.1:5001/api/v1/status/';
	$.get(url, function (data) {
		if (data.status === 'OK') {
			$('DIV#api_status').addClass('available');
			$('DIV.available').css('background-color', '#ff545f');
		} else {
			$('DIV#api_status').removeClass('available');
		}
	});
});
