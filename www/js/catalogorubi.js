$(document).on("pageshow","#catalogorubi",function(event, ui){

    $("#liCerrar").click(function(){
        $.mobile.changePage("perfilrubi.html",{ transition : "fade" });
    });
    
    var sIdentificador = localStorage.getItem("idUsuario");
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:'CatalogoRubi'
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
                    if(value["vcCatRubi1"]!=''){
                        imagen1.src = value["vcCatRubi1"];
                        imagen1.height=150;
                        localStorage.setItem("Catalogo1",imagen1.src);
                    }else{
                        imagen1.src = "img/diamondsf.png";
                        imagen1.height=150;
                        localStorage.setItem("Catalogo1","");
                    }
                   if(value["vcCatRubi2"]!=''){
                        imagen2.src = value["vcCatRubi2"];
                        imagen2.height=150;
                        localStorage.setItem("Catalogo2",imagen2.src);
                    }else{
                        imagen2.src = "img/diamondsf.png";
                        imagen2.height=150;
                        localStorage.setItem("Catalogo2","");
                    }
                    if(value["vcCatRubi3"]!=''){
                        imagen3.src = value["vcCatRubi3"];
                        imagen3.height=150;
                        localStorage.setItem("Catalogo3",imagen3.src);
                    }else{
                        imagen3.src = "img/diamondsf.png";
                        imagen3.height=150;
                        localStorage.setItem("Catalogo3","");
                    }
                    if(value["vcCatRubi4"]!=''){
                        imagen4.src = value["vcCatRubi4"];
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
        localStorage.setItem("FotoCambiar","RUBIC1");
        $.mobile.changePage("perfil.html",{ transition : "fade" });
    });

    $("#subircatalogo2").click(function(){
        localStorage.setItem("FotoCambiar","RUBIC2");
        $.mobile.changePage("perfil.html",{ transition : "fade" });
    });

    $("#subircatalogo3").click(function(){
        localStorage.setItem("FotoCambiar","RUBIC3");
        $.mobile.changePage("perfil.html",{ transition : "fade" });
    });

    $("#subircatalogo4").click(function(){
        localStorage.setItem("FotoCambiar","RUBIC4");
        $.mobile.changePage("perfil.html",{ transition : "fade" });
    });
   

});

