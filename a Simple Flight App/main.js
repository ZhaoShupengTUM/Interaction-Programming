/*initialization*/
console.log('app is alive');

let flights = [];
let details = [];
let day = "";
let month = "";
let year = "";
let origin = "";
let destination = "";

const monthLIst = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const dayList = ["Sonntag", "Montag", "Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];

function init() {
    console.log('app is initialized');
    document.getElementById('vonInput').value = '';
    document.getElementById('nachInput').value = '';
    document.getElementById('datumInput').value = '';
    document.getElementById('uhrInput').value = '';
    getFlights();
    setFlightId();
    getDetails();
    setDetailsId();
}

//load the flights 
function getFlights() {
    flights = mockFlight;
}

//set is for the flight
function setFlightId() {
    let idInitial = 0;
    flights.forEach( flight => {
        flight.id = idInitial;
        idInitial ++;
    })
}

//load the details
function getDetails() {
    details = mockdetails;
}

//set id for the details
function setDetailsId() {
    let idInitial = 0;
    details.forEach( detail => {
        detail.id = idInitial;
        idInitial ++;
    })
}


/* -----------------serach requirements----------------- */
//the button is disabled when no inputting
function filled() {
    if(document.getElementById("vonInput").value==="" || document.getElementById("nachInput").value==="" ) { 
           document.getElementById('suchen').disabled = true; 
           document.getElementById('suchen').style.backgroundColor = "gray";
       } else { 
           document.getElementById('suchen').disabled = false;
           document.getElementById('suchen').style.backgroundColor = "blue";
       }
   }

//update the date according to the input
document.getElementById("suchen").addEventListener('click', () => {
    console.log("suchen button clicked");
   //change the corresponding date 
    let d = document.getElementById('datumInput').value;
    day = d.slice(0,2);
    month = d.slice(3,5);
    year = d.slice(6,10);
    document.getElementById('dateRe').innerHTML = day + "." + monthLIst[month-1] + " " + year;
    var date = new Date(year,month,day);
    document.getElementById('weekdayRe').innerHTML = dayList[date.getDay()];
    
    //change the corresponding origin and destination
    origin = document.getElementById('vonInput').value;
    destination = document.getElementById('nachInput').value;
    document.getElementById('vonWoRe').innerHTML = "Von " + origin;

    flights.forEach( flight => {
        flight.nach = destination;
        console.log("the nach name is changed");
    }) 

    document.getElementById('search').style.display = 'none';
    document.getElementById('results').style.display = 'block';

    displayFlights();
})


/*------------------results requirement------------------*/
//display the flights
function displayFlights() {
    document.getElementById('flight-list').innerHTML = "";
    flights.forEach( flight => {
        let currentFlightHtmlString = 
        `<div id="`+ flight.id +`" onclick="goToDetails(this.id)">
        <p><span class="flightNum">` + flight.name +`</span> <span class="destination">Nach `+ flight.nach +`</span></p>
        <hr>
        <p><span class="time">` + flight.departure + `</span> <span class="ifOntime">planmäßig</span></p>
        <p><span class="time">` + flight.arrive + `</span> <span class="ifOntime">planmäßig</span></p>
    </div>`;
    document.getElementById('flight-list').innerHTML += currentFlightHtmlString;
    }
    )
}

//results to search
document.getElementById('resultsArrow').addEventListener('click', () => {
    console.log('From results back to search');
    document.getElementById('results').style.display = "none";
    document.getElementById('search').style.display = "block";
})

//results to details
function goToDetails(flightID) {
    console.log("click the flight info:" + flightID);
    //update the corresponding details view
    //update the date in the headbar
    var dateDe = new Date(year,month,day);
    document.getElementById('dateDe').innerHTML = day + "." + monthLIst[month-1] + " " + year;
    document.getElementById('weekdayDe').innerHTML = dayList[dateDe.getDay()];

    //find the corresponding detail to show
    details.forEach( detail => {
        if(detail.id == flightID) {
            showDetail(detail);
        }
    })
}


/*----------------details requirement------------------*/
//from details to results
document.getElementById('detailsArrow').addEventListener('click', () => {
    document.getElementById('details').style.display = 'none';
    document.getElementById('results').style.display = "block";
})

//click the schedule event alerts the date and depature time of the choen flight
document.getElementById('kalendar').addEventListener('click', () => {
    let alertDate = document.getElementById('weekdayDe').innerHTML;
    let departureTime = document.getElementById('depatureTime').innerHTML;
    alert("The date:" + alertDate + "\n" + "The depature time:" + departureTime);
})

function showDetail(detail) {
    //the origin and destinatoin
    document.getElementById('flightNumDe').innerHTML = detail.name;
    document.getElementById('airplane').innerHTML = detail.airplane;
    document.getElementById('vonWoDe').innerHTML = "Von " + detail.von;
    document.getElementById('depatureTime').innerHTML = detail.departure;
    document.getElementById('vonGate').innerHTML = detail.nachGate;
    document.getElementById('nachWoDe').innerHTML = "Nach " + detail.nach;
    document.getElementById('arrivetime').innerHTML = detail.arrive;
    document.getElementById('nachGate').innerHTML = detail.nachGate;
    //the flight number
    document.getElementById('results').style.display = "none";
    document.getElementById('details').style.display = "block";
}