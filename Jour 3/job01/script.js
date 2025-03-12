$(document).ready(function() {
    $('#article').hide();

    $('#jour').click(function() {
        $('#article').show(); 
    });

    $('#nuit').click(function() {
        $('#article').hide(); 
    });
});