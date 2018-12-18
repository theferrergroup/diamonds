$(document).on("pageshow","#mensaje",function(event, ui){
    var stipoUsuario = localStorage.getItem("tipoUsuario");
    $("#liBack").click(function(){
        switch (stipoUsuario){
            case '1':
                $.mobile.changePage("prospect.html",{ transition : "fade" });
                break;
            case '2':
                $.mobile.changePage("finder.html",{ transition : "fade" });
                break;
            case '3':
                $.mobile.changePage("staff.html",{ transition : "fade" });
                break;
            case '4':
                $.mobile.changePage("perfilrubi.html",{ transition : "fade" });
                break;
            case '5':
                $.mobile.changePage("perfilzafiro.html",{ transition : "fade" });
                break;
        }

    });
    var sIdentificador = localStorage.getItem("idUsuario");
    $("#btEnviarMensaje").click(function(){
        var sMensaje=$('#tMensaje').val();
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sMensajePhp:sMensaje, Mandato:'EnviarMensaje'
            },
            url:globalURL,
            method:'POST',
            beforeSend:function(){
                $.mobile.loading( "show", {
                  text: "wait please",
                  textVisible: true,
                  theme: "a",
                  html: ""
                });
            },success:function(respuesta){
                $.mobile.loading( "hide" );
                if(respuesta==":)"){
                    $('#msjPasado').html("<label>Now -> "+sMensaje+'</label><br>'+$('#msjPasado').html());
                    $('#tMensaje').val("");    
                }  
            },error:function(jqXHR, textStatus, errorThrown){
                $.mobile.loading( "hide" );  
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });

        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, Mandato:'MostrarMensaje'
            },
            url:globalURL,
            method:'POST',
            beforeSend:function(){
                $.mobile.loading( "show", {
                      text: "wait please",
                      textVisible: true,
                      theme: "a",
                      html: ""
                    });
            },success:function(respuesta){
                $.mobile.loading( "hide" ); 
                if(respuesta!=":("){
                    var aMensaje = JSON.parse(respuesta);
                    $('#msjPasado').html("<br>");
                    $.each( aMensaje, function( i, value ) {
                        if(value['idRespuesta']==0){
                            $('#msjPasado').append("<label>"+value['dtFecha']+" -> "+value['vcMensaje']+'</label>');
                        }else{
                            $('#msjPasado').append("<label style='color: green;'>"+value['dtFecha']+" -> "+value['vcMensaje']+'</label>');
                        }

                    });

                }
            },error:function(jqXHR, textStatus, errorThrown){
                $.mobile.loading( "hide" );  
                ajax_error(jqXHR, textStatus, errorThrown, true);
            }
        });
       
    });
    $("#btRefrescar").click(function(){
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, Mandato:'MostrarMensaje'
            },
            url:globalURL,
            method:'POST',
            beforeSend:function(){
                $.mobile.loading( "show", {
                      text: "wait please",
                      textVisible: true,
                      theme: "a",
                      html: ""
                    });
            },success:function(respuesta){
                $.mobile.loading( "hide" ); 
                if(respuesta!=":("){
                    var aMensaje = JSON.parse(respuesta);
                    $('#msjPasado').html("<br>");
                    $.each( aMensaje, function( i, value ) {
                        if(value['idRespuesta']==0){
                            $('#msjPasado').append("<label>"+value['dtFecha']+" -> "+value['vcMensaje']+'</label>');
                        }else{
                            $('#msjPasado').append("<label style='color: green;'>"+value['dtFecha']+" -> "+value['vcMensaje']+'</label>');
                        }

                    });

                }
            },error:function(jqXHR, textStatus, errorThrown){
                $.mobile.loading( "hide" );  
                ajax_error(jqXHR, textStatus, errorThrown, true);
            }
        });
    });

    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador, Mandato:'MostrarMensaje'
        },
        url:globalURL,
        method:'POST',
        beforeSend:function(){
            $.mobile.loading( "show", {
                  text: "wait please",
                  textVisible: true,
                  theme: "a",
                  html: ""
                });
        },success:function(respuesta){
            $.mobile.loading( "hide" ); 
            if(respuesta!=":("){
                var aMensaje = JSON.parse(respuesta);
                $('#msjPasado').html("<br>");
                $.each( aMensaje, function( i, value ) {
                    if(value['idRespuesta']==0){
                        $('#msjPasado').append("<label>"+value['dtFecha']+" -> "+value['vcMensaje']+'</label>');
                    }else{
                        $('#msjPasado').append("<label style='color: green;'>"+value['dtFecha']+" -> "+value['vcMensaje']+'</label>');
                    }

                });

            }
        },error:function(jqXHR, textStatus, errorThrown){
            $.mobile.loading( "hide" );  
            ajax_error(jqXHR, textStatus, errorThrown, true);
        }
    });


});

