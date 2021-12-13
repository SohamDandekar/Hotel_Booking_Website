var city = window.location.href.split('?')[1].split('=')[1];

var url = `https://travel-advisor.p.rapidapi.com/locations/search?query=${city}&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US`;

const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		var fullData = JSON.parse(this.responseText).data;
        var hotelData = fullData.filter(eachObj => eachObj.result_type === 'lodging');
        initMap(hotelData);
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
        document.getElementById('loader').style.display = 'none';
        document.getElementsByTagName('header')[0].style.display = 'flex';
        document.getElementById('main_content').style.display = 'block';
        document.getElementsByTagName('footer')[0].style.display = 'flex';
	}
});

xhr.open("GET", url);
xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "3981dbf89cmshbb4facddea731f2p1185c1jsn91ee9129640e");

xhr.send(data);

//Map View Functionality
function initMap(hotelData) {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };
                
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_view"), mapOptions);
    map.setTilt(45);
    
    // Multiple Markers
    var markers = hotelData.map(
        (eachObj) => {
            return [eachObj.result_object.latitude, eachObj.result_object.longitude];
        }
    );
// Info Window Content
    var infoWindowContent = hotelData.map(
        (eachObj) => {
            return [`<div class="info_content">
                    <p>${eachObj.result_object.name}</p>
                    <a href="detail.html?id=${eachObj.result_object.location_id}">Book Hotel</a>
                    </div>`]
        }
    );

    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    // Loop through our array of markers & place each one on the map  
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][0], markers[i][1]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map
        });
    
        // Each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));
        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }
    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(10);
        google.maps.event.removeListener(boundsListener);
    });
}