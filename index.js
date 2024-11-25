/*
assumptions:
- csv file contains data for persons
- birth date in the csv file formatted as MM/DD/YYYY
- birth time formatted as 12 hour (am, pm)

Task requirements:
- change the birth date format to match the person country format (as possible)
- calculate the age of the person in 1st October 2025
- add the calculated age to the person data
- create a paragraph from the formatted data
- save new data in a new file

*/

/**
 * read the file data to string variable
 * split the data by end of line
 * loop for each line
 * split the line by ','
 * use country and language code along with time zone to format the date
 * calculate the age
 * construct the final paragraph
 * append the paragraph to a string variable
 * save the data in a new file
 */

//1,male,Tawnya Grimwood,tgrimwood0@123-reg.co.uk,01/24/1981,04:15 AM,UZ,Uzbekistan,uz,UTC+5

/**
 * [0] => id
 * [1] => gender
 * [2] => name
 * [3] => email
 * [4] => date
 * [5] => time
 * [6] => Country code
 * [7] => Country
 * [8] => Language code
 * [9] => time zone
 */

import * as fs from "fs"; // built-in module 'fs' is stands for 'file system' for dealing with files
import { DateTime } from "luxon";

let data = fs.readFileSync("./MOKE_DATA.csv", { encoding: "utf8", flag: "r" });
let dataArray = data.split("\n");
let newData = "";
dataArray.forEach((line) => {
  let ln = line.split(",");
  // date    time        format
  let full = DateTime.fromFormat(`${ln[4]} ${ln[5]}`, "MM/dd/yyyy t", {
    zone: ln[9],
  }); // lan_code - country-code
  let local_datetime = full
    .setLocale(`${ln[8]}-${ln[6]}`)
    .toLocaleString(DateTime.DATETIME_FULL);

  let october = DateTime.fromFormat(
    "2025-10-01 00:00:00",
    "yyyy-MM-dd HH:mm:ss",
    { zone: ln[9] }
  );
  let diff = october.diff(full, "year");

  let tm = `${ln[0]} - ${ln[2]} is born in ${ln[7]} on ${local_datetime}
  ${ln[1] == "male" ? "his" : "her"} age in 1st October 2025 is ${Math.round(
    diff.years
  )} years
  ${ln[1] == "male" ? "his" : "her"} contact information is ${ln[3]}
  --------------------------------------------------------------`;
  newData += `${tm}\n`;
});


fs.writeFileSync('./newData.txt', newData, { encoding: 'utf8' });
console.log('New data written SUCCESSFULLY');