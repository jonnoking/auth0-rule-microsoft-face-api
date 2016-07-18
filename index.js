// VELVET ROPE
//function (user, context, callback) {
    

    var request = require('request');
    var config = require('./config.js')
    var FACE_PREVIEW_KEY = config.faceAPI;
    var REQUIRED_AGE = 30;
    var REQUIRED_GENDER = "male";

    var reqBody = {
        "url": "https://lh5.googleusercontent.com/-zKHj2fvqdrU/AAAAAAAAAAI/AAAAAAAAAAA/Q35BtlTZQDI/photo.jpg"
    };

    request({
        uri: 'https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses',
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": FACE_PREVIEW_KEY
        },
        body: JSON.stringify(reqBody) 
        
    },
     function (error, response, body) {
         if (error || (response && response.statusCode !== 200)) {             
             console.log(response.statusCode);
             return;
             //return callback(new UnauthorizedError('Access denied. Error'));
         }

         console.log(body);
         var faces = JSON.parse(body);
         if (faces.length > 0) {
             var face = faces[0];
             // verify user meets the criteria
             if (face.faceAttributes.age >= REQUIRED_AGE && face.faceAttributes.gender === REQUIRED_GENDER) {
                 
                 // add Face API data to user profile
                 //user.user_metadata = user.user_metadata || {};
                 //user.user_metadata.faceAPI = face;

                 console.log("Congratulations! You meet the criteria");

             } else {
                //return callback(new UnauthorizedError('Access denied. No face found in avatar.'));
                console.log("You do not meet the criteria");
             }

         } else {
             //return callback(new UnauthorizedError('Access denied. No face found in avatar.'));
             return;
         }
     }
    );

//}