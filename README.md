# Auth0 Rule - Microsoft Face API

An Auth0 rule that passes the user's avatar image to Microsoft's Face API and tests the results to determine if the user will be authenticated.
The coded example will only authenticate users who are male over the age of 30. This criteria can be easily changed. 

If the user is authenticated the Face API data is added to the Auth0 user object.

Microsoft Face API - https://www.microsoft.com/cognitive-services/en-us/face-api
