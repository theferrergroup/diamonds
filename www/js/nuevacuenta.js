$(document).on("pageshow","#nuevacuenta",function(event, ui){
    var sIdentificador=localStorage.getItem("idUsuario");
    var sEstatus=localStorage.getItem("iEstatus");
    //document.formContacto.tUsuario.value=localStorage.getItem("sDisponible");

    $("#slcTipo").change(function(){
        var sCat=$("#slcTipo").val();
        switch(sCat){
            case '01':
                $("#slcCategory option").remove();
                $("#slcCategory").append('<option value="00" ">---------</option>');
                $("#slcCategory").append('<option value="00" ">Without Category</option>');
                //$("#slcCategory").append('<option value="01" ">Rubi (Kids and Family)</option>');
                //$("#slcCategory").append('<option value="02" ">Zafiro (Your Pet)</option>');
                break;
            case '02':
                $("#slcCategory option").remove();
                $("#slcCategory").append('<option value="00" ">---------</option>');
                $("#slcCategory").append('<option value="00" ">Without Category</option>');
                break;
            case '03':
                $("#slcCategory option").remove();
                $("#slcCategory").append('<option value="00" ">---------</option>');
                $("#slcCategory").append('<option value="03" ">Designer</option>');
                $("#slcCategory").append('<option value="04" ">Make Up Artist</option>');
                $("#slcCategory").append('<option value="05" ">Photographer</option>');
                $("#slcCategory").append('<option value="06" ">Dress Designer</option>');
                break;
            default:
                $("#slcCategory option").remove();
        }
    });

    $("#tUsuario").focusout(function(){
        buscar(sIdentificador);
        
    });

    $("#tEmail").focusout(function(){
        var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        var sEmail=document.formContacto.tEmail.value;
        if (emailRegex.test(sEmail)){
            $("#tUsuario").css("background-color","green");
        }else{
            alert("Wrong mail :(");
            return false;

        }
    });

    $("#btModificar").click(function(){
        var sAcepta=document.formContacto.btAcepta.checked;
        if(sAcepta==false){
            alert("Missing Accept Terms & Conditions!");
            return false;
        }


        var sUsuario=document.formContacto.tUsuario.value;
        var sClave1=document.formContacto.tClave1.value;
        var sClave2=document.formContacto.tClave2.value;
        var sEmail=document.formContacto.tEmail.value;
        var sCiudad=document.formContacto.tCiudad.value;
        var sTipo=document.formContacto.slcTipo.value;
        var sCategoria=document.formContacto.slcCategory.value;
        var tamUsuario = sUsuario.length;
        if(sCiudad=='OT'){
            sCiudad = prompt("Please enter your city", "");
        }
        if(tamUsuario<4){
            alert("User Name is too short");
            return false;
        }
        
        if (sClave1==sClave2){
            $("#btModificar").html("<span class='icon-hour-glass'></span> Wait for answer");
            $("#btModificar").css("background-color","orange");
            $.ajax({
                data:{
                    sCodigoWebPhp:sIdentificador, sEmailPhp:sEmail, sUsuarioPhp:sUsuario, sClavePhp:sClave1, sTipoPhp:sTipo, sCategoriaPhp:sCategoria, sEstadoPhp:'--', sCiudadPhp:sCiudad, Mandato:'NuevaCuenta'
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
                    if(respuesta!="User Taken"){
                        $("#btModificar").html('<span class="icon-checkmark"></span> Update <span class="icon-happy"></span>');
                        $("#btModificar").css("background-color","green");
                        localStorage.setItem("idUsuario",respuesta);
                        localStorage.setItem("sDisponible","");

                        switch(sTipo){
                            case "01":
                                $.mobile.changePage("prospect.html",{ transition : "fade" });
                                break;
                            case "02":
                                $.mobile.changePage("finder.html",{ transition : "fade" });
                                break;
                            case "03":
                                $.mobile.changePage("staff.html",{ transition : "fade" });
                                break;
                            default:
                                alert("Wrong Data");
                        }
                        return false;
                    }else{
                        alert(respuesta);
                        $("#btModificar").html("<span class='icon-sad'></span> try again");
                        $("#btModificar").css("background-color","red");
                    }
                },error:function(jqXHR, textStatus, errorThrown){
                    $.mobile.loading( "hide" );
                    ajax_error(jqXHR, textStatus, errorThrown,true);
                }
            });
        }else{
            alert("Wrong Data :(");
        }
    });

    $("#btBuscar").click(function(){
        buscar(sIdentificador);
        return false;
    });
    

    $("#liConfigAtras").click(function(){
        var sExiste=localStorage.getItem("idUsuario");
        var sTipo=localStorage.getItem("tipoUsuario");
        localStorage.setItem("sDisponible","");

        if(parseInt(sExiste,10)>0){

            switch(sTipo){
                case "1":
                    $.mobile.changePage("perfil.html",{ transition : "fade" });
                    break;
                case "2":
                    $.mobile.changePage("finder.html",{ transition : "fade" });
                    break;
                case "3":
                    $.mobile.changePage("staff.html",{ transition : "fade" });
                    break;
                default:
                    alert("Wrong Data");
            }
        }else{
            $.mobile.changePage("inicio.html",{ transition : "fade" });
        }        
        return false;
    });

});

function buscar(sIdentificador, sUsuario){
    var sUsuario=document.formContacto.tUsuario.value;
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador, sUsuarioPhp:sUsuario, Mandato:'BuscarCuenta'
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
            if(respuesta!="User Taken"){
                localStorage.setItem("sDisponible",respuesta);
                //modalnueva("is Available");
                
                $("#tUsuario").val(respuesta);
                $("#tUsuario").css("background-color","green");
            }else{
                localStorage.setItem("sDisponible","");
                $("#tUsuario").css("background-color","red");
                //modalnueva(respuesta);

            }
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });
}

function modalnueva(texto){
    //$('#modal') este es el div contenedor del modal");
    //var modal, armo la estructura del modal
    var modal = '<div class="modal-dialog modal-lg">';
        modal += '<div class="modal-content">';
        modal += '<div class="modal-header">';
        modal += '<button type="button" onclick="cerrarmodalnueva()" class="close" data-dismiss="modal" aria-label="Cerrar"><span aria-hidden="true">×</span></button>';
        modal += '<h4 class="modal-title">Result</h4>';
        modal += '</div>';
        modal += '<div class="modal-plan">';
        modal += '<div class="overlay-wrapper">';
        modal += '<div class="overlay">';
        modal += '<i class="fa fa-refresh fa-spin"></i>';
        modal += '</div></div></div>';
        modal += '<div class="clearfix">&nbsp;</div>';
        modal += '<div style="clear:both;" class="modal-footer" align="center"></div>';
        modal += '</div>';
    
    //html le coloco el contenido al selector indicado, en este caso, yo estoy indicando que a #modal se le va a agregar todo lo que esta dentro del parentesis
    $('#modalnueva').html(modal);
    //luego de que agregue la estructura a de la ventana a #content, le agrego al div .boxContent (q lo acabo de crear), el contenido que va a generar la funcion "ponerusuario(id,obj)"
    $('.modal-plan').append(msjnuevo('.modal-plan',texto));
    //despus q ya cree toda la estructura, le indico q la ventana como tal va a aparecer deslizandose hacia abajo.
    $('#modalnueva').show(); //modal();
    //$('.imgBox').slideDown('fast',function(){$('.label').show()});
} 
  
function msjnuevo(obj,texto){
    var formulario = '<form class="editForm form" style="background-color:white;" id="edit"><div class="contentBox" style="background-color:white;" align="left">';
    formulario += '<div class="col-sm-20" align="center" style="background-color:white; color: black; width: 80%;">';
    
    formulario += '<h1>'+texto+'</h1>'
 
    formulario += '</div>';

                

    $('.modal-footer').html('<button type="button" id="edit-info" onclick="cerrarmodalnueva()" class="btn-diamond">Accept</button></div>');
    $('.modal-title').html('Result');
    $(obj).html(formulario);
}

function cerrarmodalnueva(){
    $("#modalnueva").hide();
}    

