$(document).ready(function(){
        $("button").click(function(){
            var emailClaim = $('#inputEmail2').val();
            var passwordClaim = $('#inputPassword2').val();
            var userClaim = {
                email : emailClaim,
                password : passwordClaim
            };

                $.ajax({
                        type: "POST",
                        data: userClaim,
                        url: "/signin",
                        dataType: 'JSON',
                        success: function (result) {
                                alert(result);
                                if(result.status == 200){

                                    window.location.replace("/core.html");
                                }
                        },
                        error: function(result){
                                alert("account and password mismatch");
                        }
                        /*
                        success: function(data){
                                  console.log('upload successful!\n' + data);
                        },
                        error: function(data) {
                            //alert("does not work" + data);
                            window.location.replace("/core.html");


                        }
                        */
                 });

        });
});

