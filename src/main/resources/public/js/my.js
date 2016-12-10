
function checkFileExist() {
    if(document.getElementById("file").value !== "") {
       window.location.href = "./user.html";
    }
    else {
        window.alert("Please select a file");
    }
}
function displayDoc() {
    var popup = document.getElementById('myPopup');
    popup.innerHTML = sessionStorage.fileContent;
    popup.classList.toggle('show');
}

function signInInfo() {
    if(typeof(Storage) !== "undefined") {
        sessionStorage.userEmail = $('#inputEmail2').val();
    } else {
        console.log("undefined");
    }
}

function getName() {
        if (sessionStorage.userEmail) {
          document.getElementById("welcome").innerHTML = "Welcome, " + sessionStorage.userEmail;
          document.getElementById("event").innerHTML = sessionStorage.event;
          document.getElementById("eventSentence").innerHTML = sessionStorage.eventSentence ;
          document.getElementById("eventSource").innerHTML = sessionStorage.eventSource;
        }
        else {
          document.getElementById("welcome").innerHTML = "Welcome, visitor" ;
        }
}