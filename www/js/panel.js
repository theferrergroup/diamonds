$(document).on("pageshow","#panel",function(event, ui){
    var aSesion = check_session();
    var sIdentificador=aSesion["CodigoWeb"];
    var sNombre=aSesion["nombre"];
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:'Fitness'
        },
        url:'http://condominioagil.com/appMovil/ajaxServiceCF.php',
        method:'POST',
        beforeSend:function(){
            $('.wait please').fadeIn();
        },success:function(respuesta){  
            var sFitness = respuesta;
            $("#hdHeadPanel").text(sFitness);
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });
    $("#liWOD").click(function(){
        $.mobile.changePage("mensajes.html",{ transition : "fade" });
    });
    $("#liReservas").click(function(){
        $.mobile.changePage("configcuenta.html",{ transition : "fade" });
    });
    $("#liPerfil").click(function(){
        $.mobile.changePage("pagos.html",{ transition : "fade" });
    });
    $("#liPagos").click(function(){
        $.mobile.changePage("reportespagos.html",{ transition : "fade" });
    });
    $("#liCerrar").click(function(){
        $.mobile.changePage("index.html",{ transition : "fade" });
    });
    
    /*$.ajax({
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
    });*/
});

