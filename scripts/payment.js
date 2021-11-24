// Code for enabling and disabling pay now button w.r.t login/logout is in common.js (line 49 & 66)

// Pay Now button functionality
var payButton = document.getElementById('pay_now_button');

var payFeature = () => {
    alert("Hi your booking is successfull !!");
}

payButton.addEventListener('click',payFeature);