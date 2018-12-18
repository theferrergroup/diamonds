$(document).on("pageshow","#portada",function(event, ui){

    $("#liCerrar").click(function(){
        $.mobile.changePage("menuprospect.html",{ transition : "fade" });
    });
    
    var sIdentificador = localStorage.getItem("idUsuario");
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:'Portada'
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
            if(respuesta=="Undefined Portrait"){
                $("#hdHeadPanel").text(respuesta);
            }else{
                var aPerfil = JSON.parse(respuesta);
                var imagen = new Image();
                $.each( aPerfil, function( i, value ) {
                    imagen.src = value["vcBackground"];
                    imagen.height=500;
                    localStorage.setItem("Portada",imagen.src);
                });
                $('#foto').html(imagen);
                $("#hdHeadPanel").text("User Portrait");
            }
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });

    $("#subirportada").click(function(){
        var inputFileImage = document.getElementById("archivoImagen");
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
                $("#respuesta").text(respuesta);
                var imagenCargada = new Image();
                imagenCargada.src = "http://starsonrise.com/diamond/appmovil/imgdiamonds/"+file.name;
                imagenCargada.height=500;
                $('#foto').html(imagenCargada);
                $('#foto').trigger('create');
                localStorage.setItem("Portada",imagenCargada.src);
            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
    });

    $("#grabarportada").click(function(){

        

    });

});

