$(document).on("pageshow","#paneladmin",function(event, ui){
    var aSesion = check_session();
    var sIdentificador=aSesion["CodigoWeb"];
    var sNombre=aSesion["nombre"];
    $("#hdCabeceraUser").html("<span class='icon-user'></span> "+sNombre);
    $("#liMensajes").click(function(){
        $.mobile.changePage("solicitudmsj.html",{ transition : "fade" });
    });
    $("#liBancos").click(function(){
        $.mobile.changePage("menugestionbancos.html",{ transition : "fade" });
    });
    $("#liPropietarios").click(function(){
        $.mobile.changePage("listapropietarios.html",{ transition : "fade" });
    });
    $("#liPagos").click(function(){
        $.mobile.changePage("ingresos.html",{ transition : "fade" });
    });
    $("#liReservas").click(function(){
        $.mobile.changePage("verreservas.html",{ transition : "fade" });
    });
    $("#liProveedores").click(function(){
        $.mobile.changePage("proveedores.html",{ transition : "fade" });
    });
    $("#liJunta").click(function(){
        $.mobile.changePage("solicitudes.html",{ transition : "fade" });
    });
    $("#liForo").click(function(){
        $.mobile.changePage("adminforo.html",{ transition : "fade" });
    });
    $("#liCuenta").click(function(){
        $.mobile.changePage("configcuenta.html",{ transition : "fade" });
    });
    $("#liBuenVecino").click(function(){
        $.mobile.changePage("inspeccion.html",{ transition : "fade" });
    });
    $("#liCerrar").click(function(){
        $.mobile.changePage("index.html",{ transition : "fade" });
    });
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:'Condominio'
        },
        url:'http://condominioagil.com/appMovil/ajaxService.php',
        method:'POST',
        beforeSend:function(){
            $('.wait please').fadeIn();
        },success:function(respuesta){  
            var sCondominio = respuesta;
            $("#hdHeadPanel").html(""+ respuesta+"<br>");
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:'Mensajes'
        },
        url:'http://condominioagil.com/appMovil/ajaxService.php',
        method:'POST',
        beforeSend:function(){
            $('.wait please').fadeIn();
        },success:function(respuesta){  
            var aMensajes = JSON.parse(respuesta);
            $.each( aMensajes, function( i, value ) {
                $("#h4Mensaje").text(value['sms_mensaje']);
            });
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });
    
});

