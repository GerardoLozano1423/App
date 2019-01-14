
var guardarComentario = function(){
        var estrellas = 0;
        if($('#radio1').is(':checked')) { estrellas = 5; }
        if($('#radio2').is(':checked')) { estrellas = 4; }
        if($('#radio3').is(':checked')) { estrellas = 3; }
        if($('#radio4').is(':checked')) { estrellas = 2; }
        if($('#radio5').is(':checked')) { estrellas = 1; }

        var comentario = $('#comentario').val();
        var id_servicio = 10;
        alert(`${estrellas}, ${comentario}`)

        var parameters = {
            id_servicio: id_servicio,
            estrellas: estrellas,
            comentario: comentario
        }

        if(estrellas == 0){
            alert("Agregar una calificacion");
            return false;
        }
        $.get( '/guardarcalificacion', parameters,function(data) {
            if(data == 1){
                alert("Gracias por su Calificacion");
            }
        });
};
