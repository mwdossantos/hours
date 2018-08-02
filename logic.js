// public vars

var Salary = 0;
var Time = [];
const Reducer = (accumulator, currentValue) => accumulator + currentValue;

(function() {

    // get the initial rate from the user
    document.getElementById("GetRateButton").onclick = function() {

        Onboarduru("RateField");
        
    }

    // work our magic when clicking the calculate salary button
    document.getElementById("CalcSalaryButton").onclick = function() {

        Magicuru(Rate, "HoursField", "Salary", "Hours");

    }

    // delete the last added hour and recalculate the salary
    document.getElementById("DeleteLastHour").onclick = function() {
        Deleturu(Time, "Salary", Rate);
    }
 
})();

// maybe place this in another page?

function Onboarduru (RateField) {

    var RField = document.getElementById(RateField).value;

    // check if field is empty
    if (RField == "") {
        alert("Vul je uurloon in om door te gaan!");
    } else {
        // get the initial Rate after which you go to the main page
        var Rate = document.getElementById(RateField).value;

        // visualize the rate for the user
        document.getElementById("Rate").innerHTML = Rate;

        // save Rate value for later use!
        return Rate;
    }
}

// a while later...

function Magicuru (Rate, HoursField, SalaryDOM, HoursDOM) {

    var HField = document.getElementById(HoursField).value;

    // check if field is empty
    if (HField == "") {

        alert("Vul je uren in om door te gaan!");

    } else {
        // get hour values
        var Hours = parseFloat(document.getElementById(HoursField).value);

        // add hours to array
        Time.push(Hours);

        // sum up all hours
        var TimeSum = Time.reduce(Reducer);

        // log all hours to console
        console.log(TimeSum);

        // log the current array to the console
        console.log(Time);

        // calculate your salary up to date
        var Salary = Rate.innerHTML * TimeSum;

        // convert your salary to 2 decimal spaces
        Salary = parseFloat(Math.round(Salary * 100) / 100).toFixed(2);

        // show current salary of this month in the DOM
        document.getElementById(SalaryDOM).innerHTML = "€" + Salary;

        // show added hours in individual divs and add ability to delete them
        var str = '<ul id="hour-list">'

        Time.forEach(function(hour) {
            str += '<li class="hour" id="hour-id">'+ hour + " uur" +'</li>';
        }); str += '</ul>';

        document.getElementById(HoursDOM).innerHTML = str;

        return Time;
    }
}

// and then when we don't like that hour anymore

function Deleturu (array, SalaryDOM, Rate) {

    // remove last added hours from array
    array.pop();

    // show the result in the console
    console.log(array);

    // // update the UI accordingly
    var div = document.getElementById("hour-list");
    div.removeChild(div.lastChild);

    // sum up all hours
    var TimeSum = Time.reduce(Reducer, 0);

    // calculate your salary up to date
    var Salary = Rate.innerHTML * TimeSum;

    // convert your salary to 2 decimal spaces
    Salary = parseFloat(Math.round(Salary * 100) / 100).toFixed(2);

    // show current salary of this month in the DOM
    document.getElementById(SalaryDOM).innerHTML = "€" + Salary;
}