$(document).on("pageshow","#menuprospect",function(event, ui){

    $("#btPerfil").click(function(){
        localStorage.setItem("FotoCambiar","PERFIL");
        $.mobile.changePage("perfil.html",{ transition : "fade" });
    });
    $("#liCuenta").click(function(){
        $.mobile.changePage("configcuenta.html",{ transition : "fade" });
    });
    $("#liPortada").click(function(){
        $.mobile.changePage("portada.html",{ transition : "fade" });
    });
    $("#liCatalogo").click(function(){
        $.mobile.changePage("catalogo.html",{ transition : "fade" });
    });
    $("#liCerrar").click(function(){
        $.mobile.changePage("prospect.html",{ transition : "fade" });
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
                $('#btPerfil').html("Add Photo Profile");
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

