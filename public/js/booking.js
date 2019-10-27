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

