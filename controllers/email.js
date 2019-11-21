
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
const sgMail = require('@sendgrid/mail');
const express = require('express');
const router = express.Router();
// Sendmail route



/*
router.post('/sendmail', function(req, res){
    var options = {
        auth: {
            api_key: 'process.env.SEND_GRID'
        }
    }
    var mailer = nodemailer.createTransport(sgTransport(options));
    mailer.sendMail(req.body, function(error, info){
        if(error){
            res.status('401').json({err: info});
        }else{
            res.status('200').json({success: true});
            const msg = {
                to: 'test@example.com',
                from: 'test@example.com',
                subject: 'Sending with SendGrid is Fun',
                text: 'and easy to do anywhere, even with Node.js',
                html: '<strong>and easy to do anywhere, even with Node.js</strong>',
              };
              sgMail.send(msg);
        }
    });
});


*/


router.post('/sendmail', (req, res) => {
    try {
    sgMail.setApiKey(`process.env.SEND_GRID`);
    const msg = {
    to: 'isaac.kumi@ashesi.edu.gh',
    from: req.body.email,
    subject: req.body.subject,
    text: req.body.message,
    html: `<p>${req.body.message}</p>`,
    };
    sgMail.send(msg);
    } catch (error) {
        console.error(error)
        
    }

});

router.post('/events', (req, res) => {
    try {
        sgMail.setApiKey(`process.env.SEND_GRID`);
        const msg = {
        to: req.body.email,
        from: 'noreply@magicians.com',
        subject: 'Booking Details',
        text: req.body,
        html: `<p>${req.body}</p>`,
        };
        sgMail.send(msg);
        } catch (error) {
            console.error(error)
            
        }

});

module.exports = router
