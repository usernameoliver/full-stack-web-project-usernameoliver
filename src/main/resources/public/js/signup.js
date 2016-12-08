$(document).ready(function(){
        $("button").click(function(){
            var errorCount = 0;
                // Check and make sure errorCount's still at zero
                if(errorCount === 0) {

                    var newUser = {
                        email : $('#inputEmail1').val(),
                        password : $('#inputPassword1').val()
                    }
                    alert(newUser.email);
                    $.ajax({
                        type: "POST",
                        data: newUser,
                        url: "/new",
                        dataType: 'JSON',
                        success: function(data){
                                  console.log('upload successful!\n' + data);
                        },
                        error: function(data) {
                            alert("does not work" + data);
                        }
                    });
                }

        });
});