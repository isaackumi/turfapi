import Swal from "sweetalert2";

/* eslint-disable no-undef */
/*
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

*/


/*
preConfirm: () => {
	if (document.getElementById('swal-input2').value) {
	   // Handle return value 
	} else {
	  Swal.showValidationMessage('First input missing')   
	}
  }

*/
  // fetch booking
/*
 async function loadRankings(){
let response = await fetch('http://localhost:3000/events');
console.log(response)
let json = await response.json()
populateRankings(json)
		
  }

*/



/*
  function loadRankings(){
	fetch('http://localhost:3000/events')
		.then(response => response.json())
		.then( (json)=> {
			try {
				const json =   JSON.parse(request.responseText);
				console.log(json)
				populateRankings(json);
			} catch (error) {
				console.warn('Could not load rankings!')
				
			}
		})
  }
  
  */

  // dashboard Ajax

  const rankingsBody = document.querySelector('#rankings-table >tbody');
  
 function loadRankings()
  {
	const request = new XMLHttpRequest();
	request.open('get','http://turfapi.herokuapp.com/events/');
	request.onload = () => {
	
			
			const json =   JSON.parse(request.responseText);
			//console.log(json)
			return populateRankings(json);
		 
	};
	request.send();

  }



  function populateRankings(json)
  {
	  // clear existing table data
	while(rankingsBody.firstChild){
		rankingsBody.removeChild(rankingsBody.firstChild);
	}

	// populate table
	json.forEach( (row) => {
		const tr = document.createElement('tr');

		// Next another forEach
		Object.keys.apply(row).forEach( (cell) => {
			//console.log(cell);
			const td = document.createElement('td');
			td.textContent = cell;
			tr.appendChild(td);
		});

		rankingsBody.appendChild(tr);
	});

  }

 document.addEventListener('DOMContentLoaded', () => {loadRankings();}) 


 // eslint-disable-next-line no-unused-vars
 function bookBtn(){
	if(document.getElementById('bookingBtn').clicked == true)
	{
	   Swal.fire('Booking Sent');
	}
	 
 }
