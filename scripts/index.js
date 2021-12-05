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