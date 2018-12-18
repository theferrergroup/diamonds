function readURL(input) {
    var imagen = new Image();
    var canvas = document.getElementById('fotocanvas');
    var ctx=canvas.getContext("2d");
    var maxW=300;
    var maxH=300;
    canvas.width=maxW;
    canvas.height=maxH;
    if (input.files ) {
        var reader = new FileReader();

        reader.onload = function (e) {
                imagen.src= e.target.result;
                imagen.addEventListener('load', mostrar_imagen, false);
    
        }
        reader.readAsDataURL(input.files[0]);
    }

    function mostrar_imagen(){
        var iw=imagen.width;
        var ih=imagen.height;
        var scale=Math.min((maxW/iw),(maxH/ih));
        var iwScaled=iw*scale;
        var ihScaled=ih*scale;
        canvas.width=iwScaled;
        canvas.height=ihScaled;
        ctx.drawImage(imagen,0,0,iwScaled,ihScaled);
        var imagenhide= document.getElementById('fotohide');;
        imagenhide.src=imagen.src;

    }


}


$(document).on("pageshow","#perfil",function(event, ui){

    var sIdentificador = localStorage.getItem("idUsuario");
    var stipoUsuario = localStorage.getItem("tipoUsuario");

    var sCambio = localStorage.getItem("FotoCambiar");
    var sOpcion='';
    var sGrabar='';
    var sNumFoto='';
    
    var angleInDegrees=0;

    $("#archivoImagen").change(function(){
        readURL(this);
    });

    switch (sCambio){
        case 'PERFIL':
            sOpcion='PerfilUsuario';
            sGrabar='GrabarFotoPerfil';
            break;
        case 'PORTADA':
            sOpcion='Portada';
            sGrabar='GrabarFotoPortada';
            break;
        case 'CATALOGO1':
            sOpcion='Catalogo';
            sGrabar='GrabarFotoCatalogo';
            sNumFoto='1';
            break;
        case 'CATALOGO2':
            sOpcion='Catalogo';
            sGrabar='GrabarFotoCatalogo';
            sNumFoto='2';
            break;
        case 'CATALOGO3':
            sOpcion='Catalogo';
            sGrabar='GrabarFotoCatalogo';
            sNumFoto='3';
            break;
        case 'CATALOGO4':
            sOpcion='Catalogo';
            sGrabar='GrabarFotoCatalogo';
            sNumFoto='4';
            break;
        case 'RUBI':
            sOpcion='PerfilUsuarioRubi';
            sGrabar='GrabarFotoPerfilRubi';
            break;
        case 'ZAFIRO':
            sOpcion='PerfilUsuarioZafiro';
            sGrabar='GrabarFotoPerfilZafiro';
            break;
        case 'PORTADARUBI':
            sOpcion='PortadaRubi';
            sGrabar='GrabarFotoPortadaRubi';
            break;
        case 'PORTADAZAFIRO':
            sOpcion='PortadaZafiro';
            sGrabar='GrabarFotoPortadaZafiro';
            break;
        case 'RUBIC1':
            sOpcion='CatalogoRubi';
            sGrabar='GrabarFotoCatalogoRubi';
            sNumFoto='1';
            break;
        case 'RUBIC2':
            sOpcion='CatalogoRubi';
            sGrabar='GrabarFotoCatalogoRubi';
            sNumFoto='2';
            break;
        case 'RUBIC3':
            sOpcion='CatalogoRubi';
            sGrabar='GrabarFotoCatalogoRubi';
            sNumFoto='3';
            break;
        case 'RUBIC4':
            sOpcion='CatalogoRubi';
            sGrabar='GrabarFotoCatalogoRubi';
            sNumFoto='4';
            break;
        case 'ZAFIROC1':
            sOpcion='CatalogoZafiro';
            sGrabar='GrabarFotoCatalogoZafiro';
            sNumFoto='1';
            break;
        case 'ZAFIROC2':
            sOpcion='CatalogoZafiro';
            sGrabar='GrabarFotoCatalogoZafiro';
            sNumFoto='2';
            break;
        case 'ZAFIROC3':
            sOpcion='CatalogoZafiro';
            sGrabar='GrabarFotoCatalogoZafiro';
            sNumFoto='3';
            break;
        case 'ZAFIROC4':
            sOpcion='CatalogoZafiro';
            sGrabar='GrabarFotoCatalogoZafiro';
            sNumFoto='4';
            break;
    }

    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:sOpcion
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
            switch (sOpcion){
                case 'PerfilUsuario':
                    imagen.src = aPerfil.DireccionFoto;
                    break;
                case 'Portada':
                    $.each( aPerfil, function( i, value ) {
                        imagen.src = value["vcBackground"];
                        localStorage.setItem("Portada",imagen.src);
                    });
                    break;
                case 'Catalogo':
                    $.each( aPerfil, function( i, value ) {
                        switch (sNumFoto){
                            case '1':
                                imagen.src = value["vcCatalogo1"];
                                break;
                            case '2':
                                imagen.src = value["vcCatalogo2"];
                                break;
                            case '3':
                                imagen.src = value["vcCatalogo3"];
                                break;
                            case '4':
                                imagen.src = value["vcCatalogo4"];
                                break;
                        }
                    });
                    break;
                case 'PerfilUsuarioRubi':
                    imagen.src = aPerfil.vcRubi;
                    break;
                case 'PerfilUsuarioZafiro':
                    imagen.src = aPerfil.vcZafiro;
                    break;
                
                case 'CatalogoRubi':
                    $.each( aPerfil, function( i, value ) {
                        switch (sNumFoto){
                            case '1':
                                imagen.src = value["vcCatRubi1"];
                                break;
                            case '2':
                                imagen.src = value["vcCatRubi2"];
                                break;
                            case '3':
                                imagen.src = value["vcCatRubi3"];
                                break;
                            case '4':
                                imagen.src = value["vcCatRubi4"];
                                break;
                        }
                    });
            }
            localStorage.setItem("FotoPerfil",imagen.src);
            var canvas = document.getElementById('fotocanvas');
            canvas.width = imagen.width;
            canvas.height = imagen.height;
            canvas.getContext("2d").drawImage(imagen, 0, 0);
            var imagenhide= document.getElementById('fotohide');;
            imagenhide.src=imagen.src;
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });




    $("#rotar").click(function(){

        angleInDegrees+=90;
        drawRotated(angleInDegrees);

        function drawRotated(degrees){
     
            var canvas = document.getElementById('fotocanvas');
            var ctx=canvas.getContext("2d");
            var imagen= document.getElementById('fotohide');;
            var maxW=300;
            var maxH=300;
            var iw=imagen.width;
            var ih=imagen.height;
            var scale=Math.min((maxW/iw),(maxH/ih));
            var iwScaled=iw*scale;
            var ihScaled=ih*scale;
            canvas.width=iwScaled;
            canvas.height=ihScaled;
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.save();
            ctx.translate(canvas.width/2,canvas.height/2);
            ctx.rotate(degrees*Math.PI/180);
            ctx.drawImage(imagen,-canvas.width/2,-canvas.height/2,iwScaled,ihScaled);
            ctx.restore();
        }


    });



 

    $("#subirimagen").click(function(){
        var canvas = document.getElementById('fotocanvas');
        
        var image_data = canvas.toDataURL();
        if(sOpcion.indexOf("Catalogo")==-1){
            $.ajax({
                url:"http://starsonrise.com/diamond/appmovil/subirimagen.php",
                method:"POST",
                data:{
                dataPhp:image_data, Mandato:"serviiiii"},
                beforeSend:function(){
                    $.mobile.loading( "show", {
                      text: "wait please",
                      textVisible: true,
                      theme: "a",
                      html: ""
                    });
                },success:function(respuesta){
                    $.mobile.loading( "hide" );
                    if(respuesta!="Impossible upload the image."){
                        $("#respuesta").text("Successfull Upload Image ");
                        var sFoto =  "http://starsonrise.com/diamond/appmovil/imgdiamonds/"+respuesta;
                        $.ajax({
                            data:{
                                sCodigoWebPhp:sIdentificador, sDireccionFotoPhp:sFoto, Mandato: sGrabar
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
                                alert(respuesta);
                            },error:function(jqXHR, textStatus, errorThrown){
                                ajax_error(jqXHR, textStatus, errorThrown,true);
                            }
                        });
                    }
               
                },error:function(jqXHR, textStatus, errorThrown){
                    ajax_error(jqXHR, textStatus, errorThrown,true);
                }
            });    
        }else{
            $.ajax({
                url:"http://starsonrise.com/diamond/appmovil/subirimagen.php",
                method:"POST",
                data:{
                dataPhp:image_data, Mandato:"serviiiii"},
                beforeSend:function(){
                    $.mobile.loading( "show", {
                      text: "wait please",
                      textVisible: true,
                      theme: "a",
                      html: ""
                    });
                },success:function(respuesta){
                    $.mobile.loading( "hide" );
                    if(respuesta!="Impossible upload the image."){
                        $("#respuesta").text("Successfull Upload Image ");
                        var sFoto =  "http://starsonrise.com/diamond/appmovil/imgdiamonds/"+respuesta;
                        $.ajax({
                            data:{
                                sCodigoWebPhp:sIdentificador, sDireccionFotoPhp:sFoto, sFotoPhp:sNumFoto, Mandato: sGrabar
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
                                alert(respuesta);
                            },error:function(jqXHR, textStatus, errorThrown){
                                ajax_error(jqXHR, textStatus, errorThrown,true);
                            }
                        });
                    }
               
                },error:function(jqXHR, textStatus, errorThrown){
                    ajax_error(jqXHR, textStatus, errorThrown,true);
                }
            });    

        }
        
    });    

    switch(stipoUsuario){
        case '1':
            $("#liCerrar").click(function(){
                switch (localStorage.getItem("FotoCambiar")){
                    case 'PERFIL':
                        $.mobile.changePage("menuprospect.html",{ transition : "fade" });
                        break;
                    case 'PORTADA':
                        $.mobile.changePage("portada.html",{ transition : "fade" });
                        break;
                    case 'CATALOGO1':
                    case 'CATALOGO2':
                    case 'CATALOGO3':
                    case 'CATALOGO4':
                        $.mobile.changePage("catalogo.html",{ transition : "fade" });
                        break;
                }
            });
            
            break;
            
        case '2':
            $("#liCerrar").click(function(){
                $.mobile.changePage("finder.html",{ transition : "fade" });
            });
            
            break;

        case '3':
            $("#liCerrar").click(function(){
                $.mobile.changePage("staff.html",{ transition : "fade" });
            });
            
            break;

        case '4':
            $("#liCerrar").click(function(){
                switch (localStorage.getItem("FotoCambiar")){
                    case 'RUBI':
                        $.mobile.changePage("perfilrubi.html",{ transition : "fade" });
                        break;
                    case 'PORTADARUBI':
                        $.mobile.changePage("portadarubi.html",{ transition : "fade" });
                        break;
                    case 'RUBIC1':
                    case 'RUBIC2':
                    case 'RUBIC3':
                    case 'RUBIC4':
                        $.mobile.changePage("catalogorubi.html",{ transition : "fade" });
                        break;
                }
            });
            
            break;
        case '5':
            $("#liCerrar").click(function(){
                switch (localStorage.getItem("FotoCambiar")){
                    case 'ZAFIRO':
                        $.mobile.changePage("perfilzafiro.html",{ transition : "fade" });
                        break;
                    case 'PORTADAZAFIRO':
                        $.mobile.changePage("portadazafiro.html",{ transition : "fade" });
                        break;
                    case 'ZAFIROC1':
                    case 'ZAFIROC2':
                    case 'ZAFIROC3':
                    case 'ZAFIROC4':
                        $.mobile.changePage("catalogozafiro.html",{ transition : "fade" });
                        break;
                }
            });
            
            break;
    }

});

