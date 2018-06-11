# Redirect Portal - Click Tracking with Firebase

> This is a simple demo that will allow you to set up click tracking and redirect a user to the desired website. You can easily add a client list and create registration codes / personalized URLs (PURLs) to see which users have clicked on a link. Planning to add more features and better documentation in the future. Feel free to fork and use for your own projects!

## Workflow: 
-  Once your client list is in Firebase with your customized PURLs.
    -  User recieves link to the redirect domain and clicks (Example link: *somewebsite*.com?u=A47c)
    -  The DB is updated at key 'A47c' to show the user has clicked their unique link.
    -  The user is then redirected to the target website or subdomain once the document has been saved.

- Admin Page
    - Once you have added an authenticated user to the app in Firebase
    - Navigate to localhost:8080/admin to see a complete list of users and see who has clicked the link.

## Get Started
``` bash
# Add your firebase info to the initializeApp function in ./src/main.js

# If you want to test it out: upload ./scripts/demoData.json to your firebase DB
# OR
# Modify your data so that each object key/id is the desired URL parameter structure/length and upload it to Firebase.

# Run the app and open localhost:8080?u={{ONE_OF_YOUR_PURLS}}

# Once you are successfully redirected, navigate to localhost:8080/admin to verify that your visit was logged.
```

## Helpers

- If you need to modify your JSON array for Firebase
- Look in ./scripts/prepJsonForFirebase.js for a script that you may find useful. Alter the and run to prep your data for Firebase.
