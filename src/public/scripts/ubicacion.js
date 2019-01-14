$(document).ready(function(){     
    'use strict'
    
    desactivarCampos();
    getEstados();
    ocultarCampos();
});


var getEstados = function(){    
    $.get( '/getestados', function(data) {        
        data.forEach(element => {
            var newOption = new Option(element.nombre, element.id, false, false);
            $('#estado').append(newOption).trigger('change');
        });
    });
    getMunicipios();
};

var getMunicipios = function(){
    $( "#estado" ).change(function() {
        var parameters = { id: $(this).val() };

        $.get( '/getmunicipios', parameters,function(data) {
            data.forEach(element => {
                var newOption = new Option(element.nombre, element.nombre, false, false);
                $('#municipio').append(newOption).trigger('change');
            });
            habilitarCampos();
        });
    });
};

var habilitarCampos = function(){
    $( "#estado" ).change(function() {
        $("#direccion").removeAttr('disabled');
        $("#cp").removeAttr('disabled');
        $("#telefono").removeAttr('disabled');
        $("#referencias").removeAttr('disabled');
    });
}

var desactivarCampos = function(){
    $("#direccion").attr("disabled", "true");
    $("#cp").attr("disabled", "true");
    $("#telefono").attr("disabled", "true");
    $("#referencias").attr("disabled", "true");
}


var geolocate = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
        });
    }
}

var ocultarCampos = function(){
    $("#street_number").hide();
    $("#route").hide();
    $("#locality").hide();
    $("#administrative_area_level_1").hide();
    $("#country").hide();
    $("#postal_code").hide();
}

var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('direccion')),
        {types: ['geocode']});


    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
    }

    for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];
        document.getElementById(addressType).value = val;
    }
    }
}

function geolocate() {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
    });
    }
}

var guardarDireccion = function(){
    var estado = $("#estado").val();
    var municipio = $("#municipio").val();
    var direccion = $("#direccion").val();
    var postal_code = $("#postal_code").val();
    var country = $("#country").val();
    var street_number = $("#street_number").val();
    var route = $("#route").val();
    var locality = $("#locality").val();
    var estadoMAps = $("#administrative_area_level_1").val();
    var telefono = $("#telefono").val();
    var referencias = $("#referencias").val();


    if(estado != estadoMAps){
        alert("Direccion no estra en el rango");
        return false;
    }
    
    if(municipio != locality){
        alert("Direccion no estra en el rango");
        return false;
    }

    var parameters = { 
        estado: estado,
        municipio: municipio,
        direccion: direccion,
        postal_code: postal_code,
        country: country,
        street_number: street_number,
        route: route,
        locality: locality,
        estadoMAps: estadoMAps,
        telefono: telefono,
        referencias: referencias
    };
    $.get( '/guardarubicacion', parameters,function(data) {
        if(data == 1){
            alert("datos Guardados");
        }
    });
}