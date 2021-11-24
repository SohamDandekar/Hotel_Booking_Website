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

