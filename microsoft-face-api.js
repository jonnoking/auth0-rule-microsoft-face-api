function (user, context, callback) {    

//https://www.microsoft.com/cognitive-services/en-us/face-api
    var REQUIRED_AGE = 30;
    var REQUIRED_GENDER = "male";
    var reqBody;

    if (user.picture) {
      reqBody = {
          "url": user.picture
      };        
    } else {
      // no avatar so deny access
      return callback(new UnauthorizedError('Access denied. No avatar found.'));    
    }
   
    request({
        uri: 'https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses',
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": configuration.FACE_API_KEY
        },
        body: JSON.stringify(reqBody) 
        
    },
     function (error, response, body) {
         if (error || (response && response.statusCode !== 200)) {             
             return callback(new UnauthorizedError('Access denied. Error calling Face API'));
         }

         var faces = JSON.parse(body);         
         if (faces.length > 0) {
             // test first face only
             var face = faces[0];

           // verify user meets the criteria
             if (face.faceAttributes.age >= REQUIRED_AGE && face.faceAttributes.gender === REQUIRED_GENDER) {                                 

               // User meets the criteria                 
               // add Face API data to user profile
                user.user_metadata = user.user_metadata || {};
                user.user_metadata.faceAPI = face;

                callback(null, user, context);

             } else {
                return callback(new UnauthorizedError('Access denied. You did not meet the entry requirements.'));
             }
         } else {
             return callback(new UnauthorizedError('Access denied. No face found in avatar.'));             
         }
     });
}