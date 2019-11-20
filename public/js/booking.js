window.onload = () => {

   const BOOKING_CARD = _$('.booking-card-btn');

   BOOKING_CARD.forEach((el) => {
        (
            function(element) {
                element.addEventListener('click', (event) => {
                    event.preventDefault();
                    const request = {
                        url: '/app/booking',
                        async: true,
                        jsonParse: true
                    };
                    servo.get(request)
                    .catch(({error}) => error)
                    .then(({response}) => {
                        if(response.dataFlag) window.location.assign('/dashboard');
                        window.location.assign('/signin');
                    });
                });
            }
        )(el)
   });
};



//// start here ////////////




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
	request.open('get','http://turfapi.herokuapp.com/users');
	request.onload = () => {
	
			
			const json =   JSON.parse(request.responseText);
			
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

    for(cell in row){
      //alert(cell);
      const td = document.createElement('td');
      td.textContent = row[cell];
      //console.log(td)
			tr.appendChild(td);
      

    }
    
/*
		// Next another forEach
	Array.from(row).forEach( (cell) => {
      alert(cell);
			//console.log(cell);
			const td = document.createElement('td');
			td.textContent = cell;
			tr.appendChild(td);
		});
*/
		rankingsBody.appendChild(tr);
	});

  }

 document.addEventListener('DOMContentLoaded', () => {loadRankings();}) 


 // eslint-disable-next-line no-unused-vars
  const BookForm = document.getElementById('bookingForm');
  BookForm.addEventListener ('submit', function(e){
            e.preventDefault();
            const formData = $('form#bookingForm').serialize();
            console.log(formData)
            fetch('http://turfapi.herokuapp.com/events',{
                method:'post',
                body: formData

            }).then( function(response){
                return response;
            }).then(function(text){
                console.log(text)
            }).catch( function(error){
                console.error(error)
            })
  })

