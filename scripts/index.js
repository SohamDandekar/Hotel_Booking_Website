//TODO: add loader when someone goes to index.html
var city_links = ['https://media-cdn.tripadvisor.com/media/photo-s/15/33/fe/a2/new-delhi.jpg',
                  'https://media-cdn.tripadvisor.com/media/photo-s/15/33/fc/f0/goa.jpg',
                  'https://media-cdn.tripadvisor.com/media/photo-s/0f/98/f7/df/charminar.jpg',
                  'https://media-cdn.tripadvisor.com/media/photo-s/15/33/fe/ac/kolkata-calcutta.jpg',
                  'https://media-cdn.tripadvisor.com/media/photo-s/15/4d/46/b8/chennai-madras.jpg',
                  'https://media-cdn.tripadvisor.com/media/photo-s/15/33/fc/fc/agra.jpg',
                  'https://media-cdn.tripadvisor.com/media/photo-s/10/a3/3b/8a/screenshot-2017-09-12.jpg',
                  'https://media-cdn.tripadvisor.com/media/photo-s/0c/d2/2f/7a/palace-from-the-outside.jpg'];
var city_names = ['Delhi','Goa','Hyderabad','Kolkata','Chennai','Agra','Jaipur','Bengaluru'];

//  First city card section
var cityCard_1 = document.createElement('article');
cityCard_1.setAttribute('class','city_card');

//  Second city card section
var cityCard_2 = document.createElement('article');
cityCard_2.setAttribute('class','city_card');

var mainSection = document.getElementById('content_section');
for(var i = 0; i < city_names.length; i++){
    var cityImg = document.createElement('div');
    cityImg.setAttribute('class','city_image');
    var img = document.createElement('img');
    img.setAttribute('src',city_links[i]);
    var cityName = document.createElement('div');
    cityName.setAttribute('class','city_name');
    var textName = document.createElement('span');
    textName.setAttribute('class','name');
    textName.innerText = city_names[i];
    cityName.appendChild(textName);
    cityImg.appendChild(img);
    cityImg.appendChild(cityName);
    var linkCard = document.createElement('a');
    linkCard.setAttribute('href','list.html?city=' + city_names[i]);
    linkCard.appendChild(cityImg);
    if(i < 4)
        cityCard_1.appendChild(linkCard);
    else
        cityCard_2.appendChild(linkCard);
}
cityCard_2.style.display = 'none';
var viewSection = document.getElementById('view_more');
mainSection.insertBefore(cityCard_1,viewSection);
mainSection.insertBefore(cityCard_2,viewSection);
setTimeout(() => {
    document.getElementById('loader').style.display = 'none';
    document.getElementsByTagName('header')[0].style.display = 'flex';
    document.getElementById('content_section').style.display = 'flex';
    document.getElementsByTagName('footer')[0].style.display = 'flex';
},750);

//View button feature
var viewButton = document.getElementById('view_more_button');

var viewFeature = () => {
    if(viewButton.innerText === "View Less"){
        cityCard_2.style.display = 'none';
        viewButton.innerText = "View More"; 
    }else{
    cityCard_2.style.display = 'flex';
    viewButton.innerText = "View Less";
    }
}

viewButton.addEventListener('click',viewFeature);

//Search Functionality
var searchBar = document.getElementsByClassName('searchbar')[0];

var onChange = () => {
    var searchValue = searchBar.value;
    if(searchValue.length >= 3){
        searchValue = searchValue.toLowerCase();
        var searchUrl = `https://travel-advisor.p.rapidapi.com/locations/auto-complete?query=${searchValue}&lang=en_US&units=km`;
        const data = null;

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
	        if (this.readyState === this.DONE) {
		        var resultArray = JSON.parse(this.responseText).data;
                var locations = resultArray.filter(
                    (eachObj) => {
                        if(eachObj.result_type === "geos"){
                            return eachObj;
                        }
                    }
                ).map((eachObj) => {return eachObj.result_object.name});
                for(var i = 0; i < locations.length; i++){
                    var searchInput = document.createElement('input');
                    searchInput.setAttribute('type','text');
                    searchInput.setAttribute('name','searchbar');
                    searchInput.setAttribute('class','searchbar');
                    searchInput.disabled = true;
                    searchInput.setAttribute('value',locations[i]);
                    var searchOption = document.createElement('a');
                    searchOption.setAttribute('href',`list.html?city=${locations[i]}`);
                    searchOption.appendChild(searchInput);
                    document.getElementById('search_bar').appendChild(searchOption);
                }
	        }
        });

        xhr.open("GET", searchUrl);
        xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "3981dbf89cmshbb4facddea731f2p1185c1jsn91ee9129640e");

        xhr.send(data);
    }
}

searchBar.addEventListener('keyup',onChange);