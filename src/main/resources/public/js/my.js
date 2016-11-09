
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
    popup.innerHTML = "Microsoft Corp.’s planned acquisition of LinkedIn Corp. potentially is a very savvy move, though you would be hard-pressed to discern that. There are lots of reasons for skepticism. The price tag, for one. At $26.2 billion, it is by far Microsoft’s largest acquisition ever. The size alone is a reason for caution, given the sorry history of such large deals. Then, there is Microsoft’s own checkered history with acquisitions. It has recorded write-downs exceeding the $9.4 billion it paid for the handset unit of Nokia Corp. in 2014. Earlier deals for Skype Technologies and Yammer Inc., designed to bolster Microsoft’s digital and social credentials, did little of either. ";
    popup.classList.toggle('show');
}
function signIn() {
    window.location.href = "./user.html";
    //To do: get the current user and set the name in user.html
}
