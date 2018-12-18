$(document).on("pageshow","#finder",function(event, ui){

    localStorage.setItem("tipoUsuario","2");
    $("#btPerfil").click(function(){
        $.mobile.changePage("perfil.html",{ transition : "fade" });
    });
    $("#liCerrar").click(function(){
        $.mobile.changePage("inicio.html",{ transition : "fade" });
    });
    $("#liCuenta").click(function(){
        $.mobile.changePage("configcuenta.html",{ transition : "fade" });
    });
    $("#liChat").click(function(){
        $.mobile.changePage("mensaje.html",{ transition : "fade" });
    });
    var sIdentificador = localStorage.getItem("idUsuario");
    var sOrden="Order By Name";
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador, sOrdenPhp:sOrden, Mandato:'VerDiamonds'
        },
        url:globalURL,
        method:'POST',
        beforeSend:function(){
            $('.wait please').fadeIn();
        },success:function(respuesta){  
            var aLista = JSON.parse(respuesta);
            localStorage.setItem("Diamonds",JSON.stringify(aLista));
            var aDiamonds = JSON.parse(localStorage.getItem("Diamonds"));
            $('#listaFinders').html('');
            for (x=0;x<aDiamonds.length;x++){
                $('#listaFinders').append('<center><h2 style="color: white;">'+aDiamonds[x]['Nombre']+'</h2></center>');
                $('#listaFinders').append('<img id="'+aDiamonds[x]['IDUsuario']+'" class="sushi-img" src='+aDiamonds[x]['DireccionFoto']+'>');
                $('#listaFinders').append('<button class="icon-heart" id="btMeGusta"'+aDiamonds[x]['IDUsuario']+'> </button> <h3 style="color: black;">'+aDiamonds[x]['Likes']+'</h2><br/><br/>');
                localStorage.setItem("DiamondActivo",x);
                localStorage.setItem("IDiamond",aDiamonds[x]['IDUsuario']);
                if(x==0){
                    return false;
                }
            }
 
            $('#listaFinders').show(100);
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });

    $("#tCiudad").change(function(){
        var sCiudad=$("#tCiudad").val();
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sCiudadPhp:sCiudad, sOrdenPhp:sOrden, Mandato:'VerDiamondsPorCiudad'
            },
            url:globalURL,
            method:'POST',
            beforeSend:function(){
                $('.wait please').fadeIn();
            },success:function(respuesta){  
                var aLista = JSON.parse(respuesta);
                localStorage.setItem("Diamonds",JSON.stringify(aLista));
                var aDiamonds = JSON.parse(localStorage.getItem("Diamonds"));
                $('#listaFinders').html('');
                for (x=0;x<aDiamonds.length;x++){
                    $('#listaFinders').append('<center><h2 style="color: white;">'+aDiamonds[x]['Nombre']+'</h2></center>');
                    $('#listaFinders').append('<img id="'+aDiamonds[x]['IDUsuario']+'" class="sushi-img" src='+aDiamonds[x]['DireccionFoto']+'>');
                    $('#listaFinders').append('<button class="icon-heart" id="btMeGusta"'+aDiamonds[x]['IDUsuario']+'> </button> <h3 style="color: black;">'+aDiamonds[x]['Likes']+'</h2><br/><br/>');
                    localStorage.setItem("DiamondActivo",x);
                    localStorage.setItem("IDiamond",aDiamonds[x]['IDUsuario']);
                    if(x==0){
                        return false;
                    }
                }
     
                $('#listaFinders').show(100);
            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });

    });

    $("#btDiamond").click(function(){
        $.mobile.changePage("diamond.html",{ transition : "fade" });
    });

    $("#listaFinders").click(function(){
        $.mobile.changePage("diamond.html",{ transition : "fade" });
    });

    $("#btOrden").click(function(){
        var sOrden="Filter By Name";
        if($("#btOrden").text()=="Filter by Name"){
            $("#btOrden").html('<span class="icon-heart"></span> Filter by Likes');
            sOrden="Filter by Name";
        }else{
            $("#btOrden").text("Filter by Name");
            sOrden="Filter by Likes";
        }
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sOrdenPhp:sOrden, Mandato:'VerDiamonds'
            },
            url:globalURL,
            method:'POST',
            beforeSend:function(){
                $('.wait please').fadeIn();
            },success:function(respuesta){  
                var aLista = JSON.parse(respuesta);
                localStorage.setItem("Diamonds",JSON.stringify(aLista));
                var aDiamonds = JSON.parse(localStorage.getItem("Diamonds"));
                $('#listaFinders').html('');
                for (x=0;x<aDiamonds.length;x++){
                    $('#listaFinders').append('<center><h2 style="color: white;">'+aDiamonds[x]['Nombre']+'</h2></center>');
                    $('#listaFinders').append('<img id="'+aDiamonds[x]['IDUsuario']+'" class="sushi-img" src='+aDiamonds[x]['DireccionFoto']+'>');
                    $('#listaFinders').append('<button class="icon-heart" id="btMeGusta"'+aDiamonds[x]['IDUsuario']+'> </button> <h3 style="color: black;">'+aDiamonds[x]['Likes']+'</h2><br/><br/>');
                    localStorage.setItem("DiamondActivo",x);
                    localStorage.setItem("IDiamond",aDiamonds[x]['IDUsuario']);
                    if(x==0){
                        return false;
                    }
                }
     
                $('#listaFinders').show(100);
            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
    });


    $("#btnRestar").click(function(){
        var proximo=0;
        var aDiamonds = JSON.parse(localStorage.getItem("Diamonds"));

        proximo=parseInt(localStorage.getItem("DiamondActivo"))-1;
            $('#listaFinders').html('');
            if(proximo=='-1'){
                $('#listaFinders').append('<center><h2 style="color: white;">'+aDiamonds[0]['Nombre']+'</h2></center>');
                $('#listaFinders').append('<img id="'+aDiamonds[0]['IDUsuario']+'" class="sushi-img" src='+aDiamonds[0]['DireccionFoto']+'>');
                $('#listaFinders').append('<button class="icon-heart" id="btMeGusta"'+aDiamonds[0]['IDUsuario']+'> </button> <h3 style="color: black;">'+aDiamonds[0]['Likes']+'</h2><br/><br/>');
                localStorage.setItem("DiamondActivo",x);
                localStorage.setItem("IDiamond",aDiamonds[x]['IDUsuario']);
                $('#listaFinders').show(100);
                return false;    
            }else{
                for (x=0;x<aDiamonds.length;x++){
                    if(x==proximo){
                        $('#listaFinders').append('<center><h2 style="color: white;">'+aDiamonds[x]['Nombre']+'</h2></center>');
                        $('#listaFinders').append('<img id="'+aDiamonds[x]['IDUsuario']+'" class="sushi-img" src='+aDiamonds[x]['DireccionFoto']+'>');
                        $('#listaFinders').append('<button class="icon-heart" id="btMeGusta"'+aDiamonds[x]['IDUsuario']+'> </button> <h3 style="color: black;">'+aDiamonds[x]['Likes']+'</h2><br/><br/>');
                        localStorage.setItem("DiamondActivo",x);
                        localStorage.setItem("IDiamond",aDiamonds[x]['IDUsuario']);
                        $('#listaFinders').show(100);
                        return false;
                    }
                }
            }
    });


    $("#btnSumar").click(function(){
        var proximo=0;
        proximo=parseInt(localStorage.getItem("DiamondActivo"))+1;
        var aDiamonds = JSON.parse(localStorage.getItem("Diamonds"));
        if(proximo==aDiamonds.length){
            proximo=proximo-1;
        }else{
            for (x=0;x<aDiamonds.length;x++){
                $('#listaFinders').html('');
                if(x==proximo){
                    $('#listaFinders').append('<center><h2 style="color: white;">'+aDiamonds[x]['Nombre']+'</h2></center>');
                    $('#listaFinders').append('<img id="'+aDiamonds[x]['IDUsuario']+'" class="sushi-img" src='+aDiamonds[x]['DireccionFoto']+'>');
                    $('#listaFinders').append('<button class="icon-heart" id="btMeGusta"'+aDiamonds[x]['IDUsuario']+'> </button> <h3 style="color: black;">'+aDiamonds[x]['Likes']+'</h2><br/><br/>');
                    localStorage.setItem("DiamondActivo",x);
                    localStorage.setItem("IDiamond",aDiamonds[x]['IDUsuario']);
                    $('#listaFinders').show(100);
                    return false;
                }
            }
        }
    });
});

