$(document).on("pageshow","#stafflicense",function(event, ui){

    $("#liCerrar").click(function(){
        $.mobile.changePage("staff.html",{ transition : "fade" });
    });
    
    var sIdentificador = localStorage.getItem("idUsuario");
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:'Licencia'
        },
        url:globalURL,
        method:'POST',
        beforeSend:function(){
            $('.wait please').fadeIn();
        },success:function(respuesta){
            if(respuesta=="Undefined License"){
                $("#hdHeadPanel").text(respuesta);
            }else{
                var aPerfil = JSON.parse(respuesta);
                var imagen = new Image();
                $.each( aPerfil, function( i, value ) {
                    imagen.src = value["vcBackground"];
                    imagen.height=500;
                    localStorage.setItem("Licencia",imagen.src);
                });
                $('#foto').html(imagen);
                $("#hdHeadPanel").text("Staff License");
            }
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });

    $("#subirlicencia").click(function(){
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
            cache:false
            ,success:function(respuesta){
                $("#respuesta").text(respuesta);
                var imagenCargada = new Image();
                imagenCargada.src = "http://starsonrise.com/diamond/appmovil/imgdiamonds/"+file.name;
                imagenCargada.height=500;
                $('#foto').html(imagenCargada);
                $('#foto').trigger('create');
                localStorage.setItem("Licencia",imagenCargada.src);
            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
    });

    $("#grabarlicencia").click(function(){

        var sFoto = localStorage.getItem("Licencia");
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sDireccionFotoPhp:sFoto, Mandato:'GrabarLicencia'
            },
            url:globalURL,
            method:'POST',
            beforeSend:function(){
                $('.wait please').fadeIn();
            },success:function(respuesta){
                alert(respuesta);
            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });

    });

});

