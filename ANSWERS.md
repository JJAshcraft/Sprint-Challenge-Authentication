<!-- Answers to the Short Answer Essay Questions go here -->

1.  Describe Middleware, Sessions (as we know them in express), bcrypt and JWT.

These middleware are used to help with making the authentication process more secure in NodeJS. The middleware acts to protect certain routes and add security measures. 

2.  What does bcrypt do in order to prevent attacks?

bcrypt adds salt to the function to change the password, and then hashes the users passwords x number of times, set by the loop in the function. The 
combination helps to prevent guessing easy passwords, and changes the amount of time it takes to check passwords by brute force.

3.  What are the three parts of the JSON Web Token?

 header, payload and signature