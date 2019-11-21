$(document).ready(function(){
    $.getJSON("http://turfapi.herokuapp.com/users", function(data){
        var user_data = '';
        $.each(data, function(key, value){
            user_data += '<tr>';
            user_data += '<td>'+value.id+'</td>';
            user_data += '<td>'+value.username+'</td>';
            user_data += '<td>'+value.email+'</td>';
            user_data += '<td>'+value.price+'</td>';
            user_data += '</tr>'
        });
        $('#rankings-table').append(user_data);
    })
});
