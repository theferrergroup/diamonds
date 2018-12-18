$(document).on("pageshow","#diamond",function(event, ui){

    $("#btAtrasfinder").click(function(){
        $.mobile.changePage("finder.html",{ transition : "fade" });
    });
    

    var sIdentificador = localStorage.getItem("idUsuario");
    var sDiamond= localStorage.getItem("IDiamond");
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador, sDiamondPhp:sDiamond, Mandato:'PonerDiamond'
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
            if(respuesta=="Undefined"){
                alert(respuesta);
            }else{
                var aPerfil = JSON.parse(respuesta);
                var imagen = new Image();var imagen1 = new Image();
                var imagen2 = new Image();
                var imagen3 = new Image();
                var imagen4 = new Image();
                $.each( aPerfil, function( i, value ) {
                    $('nombrediamond').text(value["Nombre"]);

                    imagen.src = value["vcBackground"];
                    imagen.height=500;
                    imagen1.src = value["vcCatalogo1"];
                    imagen1.height=150;
                    imagen2.src = value["vcCatalogo2"];
                    imagen2.height=150;
                    imagen3.src = value["vcCatalogo3"];
                    imagen3.height=150;
                    imagen4.src = value["vcCatalogo4"];
                    imagen4.height=150;
                    $('#hdHeadPanel').text("Biography");
                    $('#tBio').text(value["vcBio"]);
                    $("#tBio").css('height',150);
                });
                $('#foto1').html(imagen1);
                $('#foto2').html(imagen2);
                $('#foto3').html(imagen3);
                $('#foto4').html(imagen4);                
                $('#fotoPortada').html(imagen);
            } 
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });
    
    $("#btLike").click(function(){
        var sIdentificador = localStorage.getItem("idUsuario");
        var sDiamond= localStorage.getItem("IDiamond"); 
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sDiamondPhp:sDiamond, Mandato:'Like'
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
                alert(respuesta);
            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
    });
    $("#btContact").click(function(){
        var sIdentificador = localStorage.getItem("idUsuario");
        var sDiamond= localStorage.getItem("IDiamond"); 
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sDiamondPhp:sDiamond, Mandato:'Contactar'
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
                alert(respuesta);
            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
    });
});

