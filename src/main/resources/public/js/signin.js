$(document).ready(function(){
        $("button").click(function(){
            var emailClaim = $('#inputEmail2').val();
            var passwordClaim = $('#inputPassword2').val();
            var userClaim = {
                email : emailClaim,
                password : passwordClaim
            }

                $.ajax({
                        type: "POST",
                        data: userClaim,
                        url: "/signin",
                        dataType: 'JSON',
                        success: function(data){
                                  console.log('upload successful!\n' + data);
                        },
                        error: function(data) {
                            //alert("does not work" + data);
                            window.location.replace("/core.html");


                        }
                 });

        });
});

