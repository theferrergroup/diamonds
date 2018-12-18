$(document).on("pageshow","#prospect",function(event, ui){

    localStorage.setItem("tipoUsuario","1");

    $("#btPerfil").click(function(){
        $.mobile.changePage("menuprospect.html",{ transition : "fade" });
    });
    $("#rubi").click(function(){
        $.mobile.changePage("perfilrubi.html",{ transition : "fade" });
    });
    $("#zafiro").click(function(){
        $.mobile.changePage("perfilzafiro.html",{ transition : "fade" });
    });
    $("#diamondainicio").click(function(){
        $.mobile.changePage("inicio.html",{ transition : "fade" });
    });
    $("#btBio").click(function(){
        $.mobile.changePage("bio.html",{ transition : "fade" });
    });
    $("#liCerrar").click(function(){
        $.mobile.changePage("inicio.html",{ transition : "fade" });
    });

    $("#adminchat").click(function(){
        $.mobile.changePage("mensaje.html",{ transition : "fade" });
    });

    var sIdentificador = localStorage.getItem("idUsuario");
    
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:'PerfilUsuario'
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
            var aPerfil = JSON.parse(respuesta);
            var imagen = new Image();
            if(aPerfil.DireccionFoto==''){
                imagen.src = "img/diamondsf.png";
            }else{
                imagen.src = aPerfil.DireccionFoto;
            }
            imagen.height=250;
            localStorage.setItem("FotoPerfil",imagen.src);
            $("#titular").text(aPerfil.Nombre);  
            $('#espacioFoto').html(imagen);
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });
});

