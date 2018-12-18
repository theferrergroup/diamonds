$(document).on("pageshow","#bio",function(event, ui){

    var stipoUsuario = localStorage.getItem("tipoUsuario");
    $("#liBack").click(function(){
        switch (stipoUsuario){
            case '1':
                $.mobile.changePage("prospect.html",{ transition : "fade" });
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
    $("#btGuardarBio").click(function(){
        var sBio=document.formBio.tBio.value;
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sBioPhp:sBio, sTipoBioPhp:stipoUsuario, Mandato:'GuardarBio'
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
            },error:function(jqXHR, textStatus, errorThrown){
                $.mobile.loading( "hide" );  
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
       
    });

    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador, sTipoBioPhp:stipoUsuario, Mandato:'MostrarBio'
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
            if(respuesta!="Undefined Bio"){
                document.formBio.tBio.value=respuesta;
                $("#tBio").css('height',250);
            }
        },error:function(jqXHR, textStatus, errorThrown){
            $.mobile.loading( "hide" );  
            ajax_error(jqXHR, textStatus, errorThrown, true);
        }
    });


});

