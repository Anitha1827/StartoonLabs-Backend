import jwt from "jsonwebtoken"

//Generate JWT token
let generateJwtToken = (id) => {
    return jwt.sign({ id }, process.env.security);
  };

//Decode Jwt Token
const decodeJwtToken = (token) => {
    try {
      let decoded = jwt.verify(token, process.env.security);
      return decoded.id;
    } catch (error) {
      console.error("Error in Jwt Decoding", error);
      return null;
    }
};

//Get Current Date
function getCurrentDate(){
     // Get current date
     let currentDate = new Date();
     // Get day, month, and year from the current date
     let day = currentDate.getDate();
     let month = currentDate.getMonth() + 1; // Note: January is 0!
     let year = currentDate.getFullYear();
     // Pad day and month with leading zeros if needed
     day = day < 10 ? "0" + day : day;
     month = month < 10 ? "0" + month : month;
     // Format the date as dd/mm/yyyy
     let date = day + "/" + month + "/" + year;
     return date;
}

export {getCurrentDate, decodeJwtToken, generateJwtToken}