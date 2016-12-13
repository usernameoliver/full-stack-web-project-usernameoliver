
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
        }
        else {
          document.getElementById("welcome").innerHTML = "Welcome, visitor" ;
        }
        document.getElementById("event").innerHTML = ' ';
        document.getElementById("eventSentence").innerHTML = sessionStorage.eventSentence ;
        document.getElementById("eventSource").innerHTML = sessionStorage.eventSource;
}
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};


// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myPassword");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};