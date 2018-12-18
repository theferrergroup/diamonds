$(document).on("pageshow","#catalogo",function(event, ui){

    $("#liCerrar").click(function(){
        $.mobile.changePage("menuprospect.html",{ transition : "fade" });
    });
    
    var sIdentificador = localStorage.getItem("idUsuario");
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:'Catalogo'
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
            if(respuesta=="Undefined Catalogue"){
                $("#hdHeadPanel").html('<label style="color: red;"><b>'+respuesta+'</b></label>');
            }else{
                var aCatalogo = JSON.parse(respuesta);
                var imagen1 = new Image();
                var imagen2 = new Image();
                var imagen3 = new Image();
                var imagen4 = new Image();
                $.each( aCatalogo, function( i, value ) {
                    if(value["vcCatalogo1"]!=''){
                        imagen1.src = value["vcCatalogo1"];
                        imagen1.height=150;
                        localStorage.setItem("Catalogo1",imagen1.src);
                    }else{
                        imagen1.src = "img/diamondsf.png";
                        imagen1.height=150;
                        localStorage.setItem("Catalogo1","");
                    }
                   if(value["vcCatalogo2"]!=''){
                        imagen2.src = value["vcCatalogo2"];
                        imagen2.height=150;
                        localStorage.setItem("Catalogo2",imagen2.src);
                    }else{
                        imagen2.src = "img/diamondsf.png";
                        imagen2.height=150;
                        localStorage.setItem("Catalogo2","");
                    }
                    if(value["vcCatalogo3"]!=''){
                        imagen3.src = value["vcCatalogo3"];
                        imagen3.height=150;
                        localStorage.setItem("Catalogo3",imagen3.src);
                    }else{
                        imagen3.src = "img/diamondsf.png";
                        imagen3.height=150;
                        localStorage.setItem("Catalogo3","");
                    }
                    if(value["vcCatalogo4"]!=''){
                        imagen4.src = value["vcCatalogo4"];
                        imagen4.height=150;
                        localStorage.setItem("Catalogo4",imagen4.src);
                    }else{
                        imagen4.src = "img/diamondsf.png";
                        imagen4.height=150;
                        localStorage.setItem("Catalogo4","");
                    }

                    
                    
                });
                $('#foto1').html(imagen1);
                $('#foto1').show();
                $('#foto1').trigger('create');

                $('#foto2').html(imagen2);
                $('#foto3').html(imagen3);
                $('#foto4').html(imagen4);
                $('#foto4').show();
                $('#foto4').trigger('create');

            }
        },error:function(jqXHR, textStatus, errorThrown){
            $.mobile.loading( "hide" );  
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });

    $("#subircatalogo1").click(function(){
        localStorage.setItem("FotoCambiar","CATALOGO1");
        $.mobile.changePage("perfil.html",{ transition : "fade" });
    });

    $("#subircatalogo2").click(function(){
        localStorage.setItem("FotoCambiar","CATALOGO2");
        $.mobile.changePage("perfil.html",{ transition : "fade" });
    });

    $("#subircatalogo3").click(function(){
        localStorage.setItem("FotoCambiar","CATALOGO3");
        $.mobile.changePage("perfil.html",{ transition : "fade" });
    });

    $("#subircatalogo4").click(function(){
        localStorage.setItem("FotoCambiar","CATALOGO4");
        $.mobile.changePage("perfil.html",{ transition : "fade" });
    });
    $("#grabarcatalogo").click(function(){

        var sNumFoto=$("#slcFotoCatlogo").val();
        var sFoto1 = localStorage.getItem("Catalogo1");
        var sFoto2 = localStorage.getItem("Catalogo2");
        var sFoto3 = localStorage.getItem("Catalogo3");
        var sFoto4 = localStorage.getItem("Catalogo4");
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sDireccionFoto1Php:sFoto1, sDireccionFoto2Php:sFoto2, sDireccionFoto3Php:sFoto3, sDireccionFoto4Php:sFoto4, Mandato:'GrabarFotoCatalogo'
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
                $("#hdHeadPanel").text(respuesta);
            },error:function(jqXHR, textStatus, errorThrown){
                $.mobile.loading( "hide" );  
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });

    });

});

