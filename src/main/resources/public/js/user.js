function changePassword() {
            var emailClaim = sessionStorage.userEmail;
            var passwordOld = $('#inputPassword3').val();
            var passwordNew = $('#inputPassword4').val();
            var userClaim = {
                email : emailClaim,
                currentPassword : passwordOld,
                futurePassword  : passwordNew
            };
                $.ajax({
                        type: "POST",
                        data: userClaim,
                        url: "/changepassword",
                        dataType: 'JSON',
                        success: function (result) {

                                if(result.status == 200){
                                    alert('successfully changed password');
                                }
                        },
                        error: function(result){
                                alert("account and password mismatch");
                        }
                 });
}

function deleteAccount() {
    var emailClaim = sessionStorage.userEmail;
    var userClaim = {
        email : emailClaim,
    };
    alert('we are sending ' + emailClaim);
    $.ajax({
            type: "POST",
            data: userClaim,
            url: "/deleteAccount",
            dataType: 'JSON',
            success: function (result) {

                    if(result.status == 200){

                        alert('successfully deleted your account');
                        sessionStorage.userEmail = 'visitor';
                        sessionStorage.eventSentence = 'Empty';
                        sessionStorage.eventSource = 'Empty';
                        location.reload();
                    }
            },
            error: function(result){
                    alert("cannot delete your account");
            }
    });

}
function listDoc() {
    var emailClaim = sessionStorage.userEmail;
    var urlToSend =  '/listDoc?email=' + emailClaim;
    $.getJSON(urlToSend, function(result){
        sessionStorage.eventSentence = result.sentence;
        sessionStorage.eventSource = result.source;
        alert('retrieved my history' );
        location.reload();
    });
}