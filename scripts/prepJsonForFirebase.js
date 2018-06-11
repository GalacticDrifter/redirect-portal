/**
  Simple script to modify your JSON data for the Firebase realtime db.
  Customise to fit your data structure and parameter requirements.
*/

let jsonD = require('./unmodifiedDemoData.json') // Location of JSON to modify for Firebase.
let idCharLength = 4 // How many characters your registration codes/PURL paramaters should be. 
                     // Ex: yourwebsite.com/?u=A4h3 

makeid = () => {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < idCharLength; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));   
    
  return text;
}

let arr = {}

// Map all the objects to a unique key to make Firebase happy.
jsonD.forEach(jsn => {
  let key = makeid() // This will be both the objects registration code/PURL and the id in Firebase.
  let obj = {
    city: jsn.City ? jsn.City.toString() : null,
    email: jsn.Email ? jsn.Email.toString() : null,
    name: jsn.Name ? jsn.Name.toString().trim() : null,
    phone: jsn.Phone && jsn.Phone !== "" ? jsn.Phone.toString() : null,
    phoneHome: jsn.PhoneHome ? jsn.PhoneHome.toString() : null,
    phoneMobile: jsn.PhoneMobile ? jsn.PhoneMobile.toString() : null,
    phoneOther: jsn.PhoneOther ? jsn.PhoneOther.toString() : null,
    state: jsn.State ? jsn.State.toString() : null,
    street: jsn.Street ? jsn.Street.toString() : null,
    zip: jsn.Zip ? jsn.Zip.toString() : null
  }
  arr[key] = obj
})

let jsonString = JSON.stringify(arr)

/** 
  Depending on the size of the json file you are using... 
  It may be better to print this in a file rather than copy from the console.
*/
console.log(jsonString)

/** 
  Lastly, don't forget to wrap the modified JSON object with the desired table name.
  EX: {"participants": {THE_MODIFIED_DATA}}

  Check out the file ./demoData.json for an example of the data strucure to upload to Firebase.
*/

