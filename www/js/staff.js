$(document).on("pageshow","#staff",function(event, ui){

    localStorage.setItem("tipoUsuario","3");
    $("#btPerfil").click(function(){
        localStorage.setItem("FotoCambiar","PERFIL");
        $.mobile.changePage("perfil.html",{ transition : "fade" });
    });
    $("#btAtras").click(function(){
        $.mobile.changePage("inicio.html",{ transition : "fade" });
    });
    $("#adminchat").click(function(){
        $.mobile.changePage("mensaje.html",{ transition : "fade" });
    });
    
    
    $("#btLicencias").click(function(){
        $.mobile.changePage("catalogo.html",{ transition : "fade" });
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
            imagen.src = aPerfil.DireccionFoto;
            imagen.height=250;
            localStorage.setItem("FotoPerfil",imagen.src);
            $("#titular").text(aPerfil.Nombre);  
            $('#espacioFoto').html(imagen);
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });
});

