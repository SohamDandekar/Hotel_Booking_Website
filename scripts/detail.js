// Form Functionaltiy
const fixedAmount = 1000;

var Inputs = document.getElementsByClassName('form_input');
var adultsInput = Inputs[0];
var fromDateInput = Inputs[2];
var toDateInput = Inputs[3];
var totalAmount = Inputs[4];

//Making totalAmount input tag read-only
totalAmount.disabled = false;
totalAmount.readOnly = true;

var numberOfAdults = 1, nameOfPerson, fromDate, toDate , varAmount = 1;

var getTotalAmount = () => {
    numberOfAdults = adultsInput.value;
    fromDate = fromDateInput.value;
    toDateInput.setAttribute('min',fromDate);
    toDate = toDateInput.value;
    fromDateInput.setAttribute('max',toDate);
    // For finding difference in days
    var date1 = new Date(fromDate);
    var date2 = new Date(toDate);
    var diffTime = Math.abs(date2 - date1);
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if(toDate === "" && fromDate === ""){
        return;
    }else if(toDate === "" || fromDate === ""){
        varAmount =  0;
    }else if(fromDate === toDate){
        varAmount = fixedAmount;
    }else{   
        varAmount =  fixedAmount * numberOfAdults * diffDays;
    }
    totalAmount.value = "Rs. " + varAmount.toString();
}
adultsInput.addEventListener('change',getTotalAmount);
fromDateInput.addEventListener('change',getTotalAmount);
toDateInput.addEventListener('change',getTotalAmount);

// Hotel slider photos functionality

var locationID = window.location.href.split('?')[1].split('=')[1];

//For sending location id to payment.html
var paymentUrl = `payment.html&location=${locationID}`;
var hotelLocation = document.createElement('input');
hotelLocation.setAttribute('type','hidden');
hotelLocation.setAttribute('name','location');
hotelLocation.setAttribute('value',`${locationID}`);
document.getElementById('form_details').appendChild(hotelLocation);

var urlForPhotos = `https://travel-advisor.p.rapidapi.com/photos/list?location_id=${locationID}&currency=USD&limit=50&lang=en_US`;

const data1 = null;

const xhr1 = new XMLHttpRequest();
xhr1.withCredentials = false;

xhr1.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		var hotelPhotos = JSON.parse(this.responseText).data;
        var hotelPhotoDiv = `<div class="carousel-item active">
        <img  class="slider" class="d-block w-50" src=${hotelPhotos[0].images.original.url} alt="hotel image">
        </div>`
        for(var j = 1; j < hotelPhotos.length; j++){
          hotelPhotoDiv += `<div class="carousel-item">
          <img class="slider" class="d-block w-50" src=${hotelPhotos[j].images.original.url} alt="hotel image">
          </div>`;
        }
        document.getElementsByClassName('carousel-inner')[0].innerHTML = hotelPhotoDiv;
	}
});

xhr1.open("GET", urlForPhotos);
xhr1.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
xhr1.setRequestHeader("x-rapidapi-key", "640a67c248mshfe30e9edeecd18cp1d28bbjsnd8976f927fb0");

xhr1.send(data1);

//Travel api functionality(Hotel Details)

var hotelInfoUrl = `https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${locationID}`;

const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		var hotelData = JSON.parse(this.responseText).data[0];
        var rating = hotelData.rating;
        var ratingDiv= document.createElement('div');
        for(var i = rating; i >= 1; i--){
            var spanElement = document.createElement('span');
            spanElement.setAttribute('class','fa fa-star checked');
            ratingDiv.appendChild(spanElement);
        }
        if(i === 0.5){
            var spanElement = document.createElement('span');
            spanElement.setAttribute('class','fa fa-star-half-full');
            ratingDiv.appendChild(spanElement);
        }
        if(5 - rating >= 1){
            for(var i = 5 - rating; i >= 1; i--){
                var spanElement = document.createElement('span');
                spanElement.setAttribute('class','fa fa-star');
                ratingDiv.appendChild(spanElement);
            }
        }
        var hotelTemplate = `<h2>${hotelData.name}</h2>
        <h5 class="headings">RATING</h5>
        <h5 class="headings">AMENITIES</h5>
        <ul>
            <li>${hotelData.amenities[0].name}</li>
            <li>${hotelData.amenities[1].name}</li>
            <li>${hotelData.amenities[2].name}</li>
            <li>${hotelData.amenities[3].name}</li>
            <li>${hotelData.amenities[4].name}</li>
            <li>${hotelData.amenities[5].name}</li>
            <li>${hotelData.amenities[6].name}</li>
            <li>${hotelData.amenities[7].name}</li>
            <li>${hotelData.amenities[8].name}</li>
            <li>${hotelData.amenities[9].name}</li>
        </ul>
        <h5 class="headings">DESCRIPTION</h5>
        <p>${hotelData.description}</p>`
        document.getElementById('hotel_details').innerHTML = hotelTemplate;
        var heading_2 = document.getElementsByClassName('headings')[1];
        document.getElementById('hotel_details').insertBefore(ratingDiv,heading_2);   
	}
});

xhr.open("GET", hotelInfoUrl);
xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "640a67c248mshfe30e9edeecd18cp1d28bbjsnd8976f927fb0");

xhr.send(data);



