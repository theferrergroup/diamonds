$(document).on("pageshow","#configcuenta",function(event, ui){
    var sIdentificador=localStorage.getItem("idUsuario");
    var sEstatus=localStorage.getItem("iEstatus");

    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:'VerUsuario'
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
            $("#tEmail").val(aPerfil.Email);
            $("#tUsuario").val(aPerfil.Nombre);
            $("#tClave1").val(aPerfil.Password);
            $("#tCiudad").val(aPerfil.Ciudad);
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });


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

    $("#btModificar").click(function(){
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
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(sEmail)){
            $("#tUsuario").css("background-color","green");
        }else{
            alert("Wrong mail :(");
            return false;

        }
        if (sClave1==sClave2){
            $("#btModificar").html("<span class='icon-hour-glass'></span> Wait for answer");
            $("#btModificar").css("background-color","orange");
            $.ajax({
                data:{
                    sCodigoWebPhp:sIdentificador, sEmailPhp:sEmail, sUsuarioPhp:sUsuario, sClavePhp:sClave1, sTipoPhp:sTipo, sCategoriaPhp:sCategoria, sEstadoPhp:'--', sCiudadPhp:sCiudad, Mandato:'RegistrarCuenta'
                },
                url:globalURL,
                method:'POST',
                beforeSend:function(){
                    $('.wait please').fadeIn();
                },success:function(respuesta){  
                    if(respuesta!="Error on Register"){
                        $("#btModificar").html('<span class="icon-checkmark"></span> Update <span class="icon-happy"></span>');
                        $("#btModificar").css("background-color","green");
                        localStorage.setItem("idUsuario",respuesta);
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
                    ajax_error(jqXHR, textStatus, errorThrown,true);
                }
            });
        }else{
            alert("Wrong Data :(");
        }
    });
    $("#btRubi").click(function(){
        $.mobile.changePage("perfilrubi.html",{ transition : "fade" });
    });
    $("#btZafiro").click(function(){
        $.mobile.changePage("perfilzafiro.html",{ transition : "fade" });
    });

    $("#iralpanel").click(function(){
        var sExiste=localStorage.getItem("idUsuario");
        var sTipo=localStorage.getItem("tipoUsuario");
        if(parseInt(sExiste,10)>0){

            switch(sTipo){
                case "1":
                    $.mobile.changePage("prospect.html",{ transition : "fade" });
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
            return false;
        }else{
            $.mobile.changePage("inicio.html",{ transition : "fade" });
        }        
    });
});
