var FCM = require('fcm-push');

//  var serverKey = 'AAAA-vhQn20:APA91bFRNikSzNXPGklpEB6SU12TWeihUrFFz60gBoGSQjnUHyncEjDHK07q1X_sJu3aLtsYfY4IQk52WwUMDLjVpp6lpoDXZfMJZW33dqaNkUkzXT_Yai26S-ktRHA9lhTpDn297Yi-';
//           var fcm = new FCM(serverKey); 
//           var message = {
//             // registration_ids: ['emqR_8IaqyY:APA91bEOFP9T5pD2OPrVur4Fu7CSLM5Kbitek2IE8mFZ4o1AkJMuJ7Wl54OhvwbesnTpaXvH2R0_QaFds6s-yC1iAygBAuAGgJKYDRNJ4laONtDjyoqB29cJWWD6Q7Y3Qp6AK6eYvHVs','fDyP9x0uTBU:APA91bHxw7mBWf9uzEKIetyOhno6jcDBDTOmN8aLYfGibBSRUT7YIqCirKGLqXcnCXKSxYEIvEPvhn-9w4umaaiNnwzzcImOVa6RYy2U0Z9qmTWXnIKkwrleL-sL38FEd1R6AeQ6SPOA'], // required fill with device token or topics
//             registration_ids:arr, 
//             collapse_key: 'AIzaSyB01w4EI-nHaTiY3r3bmpO7zz170RbfbBA', 
//              data: {
//                  your_custom_data_key: 'AIzaSyDt24Juf1hToQ2ILBQxNQcglnPrI5VqIxI'
//              },
//              notification: {
//                  title: "This is meeting title",
//                  body: "This is meeting body"
//              }
//            };
var serverKey = 'AAAA-vhQn20:APA91bFRNikSzNXPGklpEB6SU12TWeihUrFFz60gBoGSQjnUHyncEjDHK07q1X_sJu3aLtsYfY4IQk52WwUMDLjVpp6lpoDXZfMJZW33dqaNkUkzXT_Yai26S-ktRHA9lhTpDn297Yi-';
var fcm = new FCM(serverKey); 
var message = {
  // registration_ids: ['db48-2il2eU:APA91bE_fXzj3MbG4o7sfBOwEenYXjMWmOypCi9iuOroZFcXrhzURvgsmC9jrdJWafQ076cTkieLzOV8u2uCBy_iocsTDX9It0CZWOWC6dR5eMuwHxnf7BKfM3FKKuyPCOu67la7qbm3'], // required fill with device token or topics
  //registration_ids:arr, 
  //to:'db48-2il2eU:APA91bE_fXzj3MbG4o7sfBOwEenYXjMWmOypCi9iuOroZFcXrhzURvgsmC9jrdJWafQ076cTkieLzOV8u2uCBy_iocsTDX9It0CZWOWC6dR5eMuwHxnf7BKfM3FKKuyPCOu67la7qbm3',
  to:'cQk-3377iqk:APA91bEpPoxyK3eHRa14QZgnmLA34RdHy3Fx_KvesNb0AFMyJuGwk1pu79WidnLXWxR_SMbfIgv2wBuSxqiVzijvtN6AMOS1a0r2MWSS9Vb9seQL3M0yy9I1GsKZwrx_Ei-8JrJh0R3d',
  collapse_key: 'AIzaSyB01w4EI-nHaTiY3r3bmpO7zz170RbfbBA', 
   data: {
       your_custom_data_key: 'AIzaSyDt24Juf1hToQ2ILBQxNQcglnPrI5VqIxI'
   },
   notification: {
       title: "This is meeting title",
       body: "This is meeting body"
       
    }
 };


//callback style
// fcm.send(message, function(err, response){
//     if (err) {
//         console.log("Something has gone wrong!");
//     } else {
//         console.log("Successfully sent with response: ", response);
//     }
// });

//promise style
fcm.send(message)
    .then(function(response){
        console.log("Successfully sent with response: ", response);
    })
    .catch(function(err){
        console.log("Something has gone wrong!");
        console.error(err);
    })
  

    