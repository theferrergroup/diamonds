$(document).on("pageshow","#inicio",function(event,ui){
    $('#tUsuario').val(localStorage.getItem("usuario"));
    $('#tClave').val(localStorage.getItem("clave"));
    localStorage.setItem("sDisponible","");
    $('#btNuevo').click(function(){
        localStorage.setItem("idUsuario","");
        $.mobile.changePage("nuevacuenta.html",{ transition : "fade" });
    });
    
    $('#btnIngresarUser').click(function(){
        var sUsuario = $('#tUsuario').val();
        var sClave = $('#tClave').val();

        if(sUsuario!='' && sClave!=''){
            $.ajax({
                data:{
                    sUsuarioPhp:sUsuario, sClavePhp:sClave, Mandato:'IngresarCuenta'
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
                    if(respuesta!="False Account "){
                        var aUsuario = JSON.parse(respuesta);
                        var sTipo=0;
                        var sIdentificador=0;
                        $.each( aUsuario, function( i, value ) {
                            sIdentificador=value['IDUsuario'];
                            localStorage.setItem("idUsuario",sIdentificador);
                            localStorage.setItem("usuario",sUsuario);
                            localStorage.setItem("clave", sClave);
                            sTipo=value['IDTipo'];
                            localStorage.setItem("iEstatus",sTipo);
                        });
                        if(sTipo==100){
                            $.mobile.changePage("paneladmin.html",{ transition : "fade" });
                        }else{
                            localStorage.setItem("tipoUsuario",sTipo);
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
                        }
                    }else{
                        alert("Account Error");
                    }
                },error:function(jqXHR, textStatus, errorThrown){
                    $.mobile.loading( "hide" );  
                    ajax_error(jqXHR, textStatus, errorThrown,true);
                }
            });
        };
    });
});