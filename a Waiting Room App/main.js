var Patients = ["zhang", "wang", "li", "zhao"];

function printWaitingRoom() {
    document.getElementById('numberOfPatient').innerHTML = Patients.length;
    document.getElementById('waitingRoom').innerHTML = "patients in the waiting room: " + Patients;
}

function addPatient() {
    let patientName = document.getElementById('myPatient').value;
    Patients.push(patientName);
    printWaitingRoom();
}

function nextPatient() {
    let nowPatient = Patients.shift();
    document.getElementById('currentPatient').innerHTML += nowPatient;
    printWaitingRoom();
}