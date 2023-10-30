let D1Mode = null;

$(document).ready(function(){
    $.ajaxSetup({ cache: false }); 
    setInterval(function() {
        $.get("../IOD1Mode.html", function(result){
            D1Mode = result;
        });
    },1000);
});

$(document).ready(function(){
    $.ajaxSetup({ cache: false }); 
    setInterval(function() {
        $.get("../IODehStatus.html", function(result){
            if (result === "1"){
                $('#estadoDeshidratador').text('encendido');
            } else {
                $('#estadoDeshidratador').text('apagado');
            }
        });
    },1000);
});

$(document).ready(function(){
    $.ajaxSetup({ cache: false }); 
    setInterval(function() {
        $.get("../IOD1Status.html", function(result){
            if (result === "1"){
                $('#estadoDeshidratador1').text('encendido');
            } else {
                $('#estadoDeshidratador1').text('apagado');
            }
        });
    },1000);
});

$(document).ready(function(){
    $.ajaxSetup({ cache: false }); 
    setInterval(function() {
        $.get("../IOTempD1Status.html", function(result){
  $('#temperaturaDeshidratador').text(result);
        });
    },1000);
});

$(document).ready(function(){
    $.ajaxSetup({ cache: false }); 
    setInterval(function() {
        $.get("../IOHumD1Status.html", function(result){
  $('#humedadDeshidratador').text(result);
        });
    },1000);
});

$(document).ready(function(){
    $.ajaxSetup({ cache: false }); 
    setInterval(function() {
        $.get("../IOD1HystStatus.html", function(result){
            $('#hystDeshidratador1').text(result);
        });
    },1000);
});

$(document).ready(function(){
    $.ajaxSetup({ cache: false }); 
    setInterval(function() {
        $.get("../IOHumD1InitStatus.html", function(result){
            $('#humedadInicialDeshidratador1').text(result);
        });
    },1000);
});

$(document).ready(function(){
    $.ajaxSetup({ cache: false }); 
    setInterval(function() {
        $.get("../IOHumD1MidStatus.html", function(result){
            $('#humedadIntermediaDeshidratador1').text(result);
        });
    },1000);
});

$(document).ready(function(){
    $.ajaxSetup({ cache: false }); 
    setInterval(function() {
        $.get("../IOHumD1FinalStatus.html", function(result){
            $('#humedadFinalDeshidratador1').text(result);
        });
    },1000);
});

$(document).ready(function(){
    $.ajaxSetup({ cache: false }); 
    setInterval(function() {
        $.get("../IOTempD1InitStatus.html", function(result){
            $('#temperaturaInicialDeshidratador1').text(result);
        });
    },1000);
});

$(document).ready(function(){
    $.ajaxSetup({ cache: false }); 
    setInterval(function() {
        $.get("../IOTempD1MidStatus.html", function(result){
            $('#temperaturaIntermediaDeshidratador1').text(result);
        });
    },1000);
});

$(document).ready(function(){
    $.ajaxSetup({ cache: false }); 
    setInterval(function() {
        $.get("../IOTempD1FinalStatus.html", function(result){
            $('#temperaturaFinalDeshidratador1').text(result);
        });
    },1000);
});

var mouseDown = function(elementId, formId) {
    document.getElementById(elementId).value = "1";
    document.getElementById(formId).submit();
}

var activarDeshidratador = function(url, buttonId) {
        name='"Iniciar"';
        val=$('input[id='+ buttonId +']').attr('coilValue');
        sdata=escape(name)+'='+val;
        $.post(url,sdata,function(result){});
}

var desactivarDeshidratador = function(url, buttonId) {
        name='"Detener"';
        val=$('input[id='+ buttonId +']').attr('coilValue');
        sdata=escape(name)+'='+val;
        $.post(url,sdata,function(result){});
}

var cargarSetPointHumD1 = function(url) {
          name='"Set_Point_Humedad"';
          val=$('input[id=setHumD]').val();
          sdata=escape(name)+'='+val;
          $.post(url,sdata,function(result){});
}

var cargarSetPointTempD1 = function(url) {
          name='"Set_Point_Deshidratador"';
          val=$('input[id=setTempD]').val();
          sdata=escape(name)+'='+val;
          $.post(url,sdata,function(result){});
}

var cambiarModoOperacionD1 = function(url) {
    name='"Modos_Operacion".Modo_Preset_D1';
    val= D1Mode;
    if (val == "0"){
        val = "1";
        $("#buttonD1Mode").attr('value', 'Fijo');
    } else{
        val = "0";
        $("#buttonD1Mode").attr('value', 'Presets');
    }
    $("#presetsHeadingD1").toggle();
    $("#presetsPanelD1").toggle();
    sdata=escape(name)+'='+val;
    $.post(url,sdata,function(result){});
}

var cargarHystD1 = function(url) {
    name='"Tiempo_Histeresis_D1"';
    val=$('input[id=setHystD1]').val();
    sdata=escape(name)+'='+val;
    $.post(url,sdata,function(result){});
}

var cargarSetPointHumInitD1 = function(url) {
    name='"Set_Point_Humedad_D1_Inicial"';
    val=$('input[id=setHumD1Init]').val();
    sdata=escape(name)+'='+val;
    $.post(url,sdata,function(result){});
}

var cargarSetPointHumMidD1 = function(url) {
    name='"Set_Point_Humedad_D1_Intermedia"';
    val=$('input[id=setHumD1Mid]').val();
    sdata=escape(name)+'='+val;
    $.post(url,sdata,function(result){});
}

var cargarSetPointHumFinalD1 = function(url) {
    name='"Set_Point_Humedad_D1_Final"';
    val=$('input[id=setHumD1Final]').val();
    sdata=escape(name)+'='+val;
    $.post(url,sdata,function(result){});
}

var cargarSetPointTempInitD1 = function(url) {
    name='"Set_Point_Deshidratador1_Inicial"';
    val=$('input[id=setTempD1Init]').val();
    sdata=escape(name)+'='+val;
    $.post(url,sdata,function(result){});
}

var cargarSetPointTempMidD1 = function(url) {
    name='"Set_Point_Deshidratador1_Intermedia"';
    val=$('input[id=setTempD1Mid]').val();
    sdata=escape(name)+'='+val;
    $.post(url,sdata,function(result){});
}

var cargarSetPointTempFinalD1 = function(url) {
    name='"Set_Point_Deshidratador1_Final"';
    val=$('input[id=setTempD1Final]').val();
    sdata=escape(name)+'='+val;
    $.post(url,sdata,function(result){});
}