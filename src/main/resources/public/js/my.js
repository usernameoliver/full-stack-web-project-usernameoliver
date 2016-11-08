function checkFileExist() {
    if(document.getElementById("file").value !== "") {
       window.location.href = "./user.html";
    }
    else {
        window.alert("Please select a file");
    }
}