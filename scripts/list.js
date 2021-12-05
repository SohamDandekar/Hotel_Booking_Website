var city = window.location.href.split('?')[1].split('=')[1];

var url = `https://travel-advisor.p.rapidapi.com/locations/search?query=${city}&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US`;

const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		var fullData = JSON.parse(this.responseText).data;
        var hotelData = fullData.filter(eachObj => eachObj.result_type === 'lodging');
        var hotelTemplate = hotelData.map(
            (eachObj) => {
                return `<a id="list_cards" href="detail.html?id=${eachObj.result_object.location_id}">
                <section class="hotel">
                    <img class="hotel_image" src=${eachObj.result_object.photo.images.original.url} alt="radisson blu hotel" />
                    <div class="details">
                    <h3>${eachObj.result_object.name}</h3>
                    <div>
                    ${eachObj.result_object.rating}  
                    <span class="fa fa-star checked"></span>
                    </div>
                    <p id="hotel_address">${eachObj.result_object.address}</p>
                    </div>
                </section>
            </a>`;
            }
        ).join("");
        document.getElementById('list_view').innerHTML = hotelTemplate;
	}
});

xhr.open("GET", url);
xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "640a67c248mshfe30e9edeecd18cp1d28bbjsnd8976f927fb0");

xhr.send(data);