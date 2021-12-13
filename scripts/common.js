// Header & Footer templates
if(document.title === "Index"){
    var header = `<a><img id="logo" src="assests/images/logo.png" alt="logo" /></a>
<!-- Login button trigger -->
<button id="login_button" type="button" class="btn btn-light" data-toggle="modal" data-target="#exampleModal">
    LOGIN
</button>`;    
}else{
    var header = `<a href="index.html"><img id="logo" src="assests/images/logo.png" alt="logo" /></a>
<!-- Login button trigger -->
<button id="login_button" type="button" class="btn btn-light" data-toggle="modal" data-target="#exampleModal">
    LOGIN
</button>`;
}

var footer = `<!-- Contact Us button trigger -->
<button id="contact_button" type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModal1">
    Contact Us
</button>

<article id="copyright">&copy; 2020 ROOM SEARCH PVT. LTD.</article>
<article id="social-media">
    <nav>
        <a href="http://www.facebook.com" target="_blank"><img class="social_media" src="assests/images/facebook.png" alt="facebook"></a>
        <a href="http://www.instagram.com" target="_blank"><img class="social_media" src="assests/images/instagram.png" alt="instagram"></a>
        <a href="http://www.twitter.com" target="_blank"><img class="social_media" src="assests/images/twitter.png" alt="twitter"></a>
    </nav>
</article>`;

document.getElementsByTagName('header')[0].innerHTML = header;
document.getElementsByTagName('footer')[0].innerHTML = footer;

// login logout functionality
localStorage.setItem('username','admin');
localStorage.setItem('password','admin');

var user = document.getElementById('username'); //text input
var pwd = document.getElementById('password');  //text input

var user_name, user_pwd;
var getValueOfName = () => {
    user_name = user.value; //values
}
var getValueOfPwd = () => {
    user_pwd =  pwd.value;  //values
}

user.addEventListener('change',getValueOfName);
pwd.addEventListener('change',getValueOfPwd);

var loginButton = document.getElementById('login_modal_button');

var login = () => {
    if(localStorage.getItem('username') === user_name && localStorage.getItem('password') === user_pwd){
        alert("Successfully loggedin");
        $('#exampleModal').modal('hide');
        document.getElementById('loader').style.display = 'block';
        document.getElementsByTagName('header')[0].style.display = 'none';
        if(document.title === "Index")
            document.getElementById('content_section').style.display = 'none';
        else
            document.getElementById('main_content').style.display = 'none';
        document.getElementsByTagName('footer')[0].style.display = 'none';
        setTimeout(()=>{
            document.getElementById('loader').style.display = 'none';
            document.getElementsByTagName('header')[0].style.display = 'flex';
            if(document.title === "Index")
                document.getElementById('content_section').style.display = 'block';
            else
                document.getElementById('main_content').style.display = 'block';
            document.getElementsByTagName('footer')[0].style.display = 'flex';
        },900);
        document.getElementById('login_button').innerText = "LOGOUT";
        //For enabling pay now button in payment.html
        if(document.title === "Payment")
            document.getElementById('pay_now_button').disabled = false;
        document.getElementById('login_button').setAttribute('data-target','#');
    }else{
        alert("Invalid credentials");
        user.value = "";
        pwd.value = "";
    }
}

loginButton.addEventListener('click',login);

var logoutButton = document.getElementById('login_button');

var logout = () => {
    if(logoutButton.innerText === "LOGOUT"){
        document.getElementById('loader').style.display = 'block';
        document.getElementsByTagName('header')[0].style.display = 'none';
        if(document.title === "Index")
            document.getElementById('content_section').style.display = 'none';
        else
            document.getElementById('main_content').style.display = 'none';
        document.getElementsByTagName('footer')[0].style.display = 'none';
        setTimeout(()=>{
            document.getElementById('loader').style.display = 'none';
            document.getElementsByTagName('header')[0].style.display = 'flex';
            if(document.title === "Index")
                document.getElementById('content_section').style.display = 'block';
            else
                document.getElementById('main_content').style.display = 'block';
            document.getElementsByTagName('footer')[0].style.display = 'flex';
        },900);
        logoutButton.innerText = "LOGIN";
        //For disabling pay now button in payment.html
        if(document.title === "Payment")
            document.getElementById('pay_now_button').disabled = true;
        setTimeout(()=>{logoutButton.setAttribute('data-target','#exampleModal');},1000);
        user.value = "";
        pwd.value = "";
        localStorage.clear();
    }
}

logoutButton.addEventListener('click',logout);