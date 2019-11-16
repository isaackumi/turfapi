

$(document).ready( () => {
    $('#bookingForm').submit( e => {
        submitForm();
        return false;
    })
});

async function submitForm(){

    $.ajax({
		type: "POST",
		url: `localhost:3000/events`,
		cache:false,
		data:  await $('form#bookingForm').serialize(),
		success: () => $("#booking-modal").modal('hide'),
		error: () =>{
			swal({
			title: "Error",
			text: "Sorry, an error occured!",
			icon: "error",
		  });

		}
		
	});

}


