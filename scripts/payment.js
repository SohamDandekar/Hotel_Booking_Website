// Code for enabling and disabling pay now button w.r.t login/logout is in common.js (line 49 & 66)

//Travel API functionality
var locationID = window.location.href.split('?')[1].split('&')[5].split('=')[1];
var hotelInfoUrl = `https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${locationID}`;

const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		var hotelData = JSON.parse(this.responseText).data[0];
        var hotelDetails = `<img class="hotel_image" src=${hotelData.photo.images.original.url} alt="hotel image" />
        <div id="hotel_details">
            <h2>${hotelData.name}</h2>
            <p><strong>${hotelData.ranking}</strong></p>
            <p>${hotelData.address}</p>
        </div>`;
        document.getElementById("hotel").innerHTML = hotelDetails;
        var customerInfo = window.location.href.split('?')[1].split('&');
        var adults = customerInfo[0].split('=')[1];
        var customerName = customerInfo[1].split('=')[1];
        var checkInDate = customerInfo[2].split('=')[1];
        var checkOutDate = customerInfo[3].split('=')[1];
        var price = customerInfo[4].split('=')[1].replace('+', ' ');
        var nights = parseInt(checkOutDate.split('-')[2]) - parseInt(checkInDate.split('-')[2])

        var customerDetails = `<article id="customer_info">
        <p><span class= "heading">Name:</span> ${customerName}</p>
        <p><span class= "heading">Number of Adults:</span> ${adults}</p>
        <p><span class= "heading">Check-in Date:</span> ${checkInDate}</p>
        <p><span class= "heading">Check-out Date:</span> ${checkOutDate}</p>
        </article>
        <article id="amount_info">
        <p><span class= "heading">Tariff Breakdown:</span> Rs. 1000 x ${adults} Adults x ${nights} Nights</p>
        <p><span class= "heading">Total Amount:</span> ${price}</p>
        </article>
        <article id="pay_button">
        <button id="pay_now_button" type="button" class="btn btn-success" disabled>Pay Now</button>
        </article>`;

        document.getElementById('details').innerHTML = customerDetails;
        
        // Pay Now button functionality
        var payButton = document.getElementById('pay_now_button');

        var payFeature = () => {
            alert("Hi your booking is successfull !!");
        }

        payButton.addEventListener('click',payFeature);
	}
});

xhr.open("GET", hotelInfoUrl);
xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "640a67c248mshfe30e9edeecd18cp1d28bbjsnd8976f927fb0");

xhr.send(data);
