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
                    imagen1.src = value["vcCatalogo1"];
                    imagen1.height=150;
                    localStorage.setItem("Catalogo1",imagen1.src);
                    imagen2.src = value["vcCatalogo2"];
                    imagen2.height=150;
                    localStorage.setItem("Catalogo2",imagen2.src);
                    imagen3.src = value["vcCatalogo3"];
                    imagen3.height=150;
                    localStorage.setItem("Catalogo3",imagen3.src);
                    imagen4.src = value["vcCatalogo4"];
                    imagen4.height=150;
                    localStorage.setItem("Catalogo4",imagen4.src);
                });
                $('#foto1').html(imagen1);
                $('#foto2').html(imagen2);
                $('#foto3').html(imagen3);
                $('#foto4').html(imagen4);
            }
        },error:function(jqXHR, textStatus, errorThrown){
            $.mobile.loading( "hide" );  
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });

    $("#subircatalogo1").click(function(){
        var inputFileImage = document.getElementById("archivoImagen1");
        var file = inputFileImage.files[0];
        var data = new FormData();
        data.append("uploadedfile",file);
        $.ajax({
            url:"http://starsonrise.com/diamond/appmovil/subirimagen.php",
            method:"POST",
            contentType:false,
            data:data,
            processData:false,
            cache:false,
            beforeSend:function(){
                $.mobile.loading( "show", {
                  text: "wait please",
                  textVisible: true,
                  theme: "a",
                  html: ""
                });
            },success:function(respuesta){
                $.mobile.loading( "hide" );
                var imagenCargada = new Image();
                imagenCargada.src = "http://starsonrise.com/diamond/appmovil/imgdiamonds/"+file.name;
                imagenCargada.height=150;
                $('#foto1').html(imagenCargada);
                $('#foto1').trigger('create');
                localStorage.setItem("Catalogo1",imagenCargada.src);
            },error:function(jqXHR, textStatus, errorThrown){
                $.mobile.loading( "hide" );  
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
    });

    $("#subircatalogo2").click(function(){
        var inputFileImage = document.getElementById("archivoImagen2");
        var file = inputFileImage.files[0];
        var data = new FormData();
        data.append("uploadedfile",file);
        $.ajax({
            url:"http://starsonrise.com/diamond/appmovil/subirimagen.php",
            method:"POST",
            contentType:false,
            data:data,
            processData:false,
            cache:false,
            beforeSend:function(){
                $.mobile.loading( "show", {
                  text: "wait please",
                  textVisible: true,
                  theme: "a",
                  html: ""
                });
            },success:function(respuesta){
                $.mobile.loading( "hide" );
                var imagenCargada = new Image();
                imagenCargada.src = "http://starsonrise.com/diamond/appmovil/imgdiamonds/"+file.name;
                imagenCargada.height=150;
                $('#foto2').html(imagenCargada);
                $('#foto2').trigger('create');
                localStorage.setItem("Catalogo2",imagenCargada.src);
            },error:function(jqXHR, textStatus, errorThrown){
                $.mobile.loading( "hide" );  
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
    });

    $("#subircatalogo3").click(function(){
        var inputFileImage = document.getElementById("archivoImagen3");
        var file = inputFileImage.files[0];
        var data = new FormData();
        data.append("uploadedfile",file);
        $.ajax({
            url:"http://starsonrise.com/diamond/appmovil/subirimagen.php",
            method:"POST",
            contentType:false,
            data:data,
            processData:false,
            cache:false,
            beforeSend:function(){
                $.mobile.loading( "show", {
                  text: "wait please",
                  textVisible: true,
                  theme: "a",
                  html: ""
                });
            },success:function(respuesta){
                $.mobile.loading( "hide" );
                var imagenCargada = new Image();
                imagenCargada.src = "http://starsonrise.com/diamond/appmovil/imgdiamonds/"+file.name;
                imagenCargada.height=150;
                $('#foto3').html(imagenCargada);
                $('#foto3').trigger('create');
                localStorage.setItem("Catalogo3",imagenCargada.src);
            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
                $.mobile.loading( "hide" );  
            }
        });
    });

    $("#subircatalogo4").click(function(){
        var inputFileImage = document.getElementById("archivoImagen4");
        var file = inputFileImage.files[0];
        var data = new FormData();
        data.append("uploadedfile",file);
        $.ajax({
            url:"http://starsonrise.com/diamond/appmovil/subirimagen.php",
            method:"POST",
            contentType:false,
            data:data,
            processData:false,
            cache:false,
            beforeSend:function(){
                $.mobile.loading( "show", {
                  text: "wait please",
                  textVisible: true,
                  theme: "a",
                  html: ""
                });
            },success:function(respuesta){
                $.mobile.loading( "hide" );
                var imagenCargada = new Image();
                imagenCargada.src = "http://starsonrise.com/diamond/appmovil/imgdiamonds/"+file.name;
                imagenCargada.height=150;
                $('#foto4').html(imagenCargada);
                $('#foto4').trigger('create');
                localStorage.setItem("Catalogo4",imagenCargada.src);
            },error:function(jqXHR, textStatus, errorThrown){
                $.mobile.loading( "hide" );  
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
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

