const fs = require("fs");
const dayjs = require("dayjs");
const readline = require('readline');
const data = require("./myjson.json");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

fs.readFile("./myjson.json", (err) => {
  if (err) {
    console.log("Error reading the file", err);
  }
  console.log("No error reading the file!");
  rl.question('Which ID are you looking for? ', (answer) => {
    for (let i = 0; i < data.content.LinkInfos.length; i++) {
      if (answer == (data.content.LinkInfos[i].Id)) { //Search for Id within data
        rl.question('What information do you need? ', (answer) => {
          if (answer.toLowerCase() == 'all') { //Print all info related to Id
            getData(i);
            rl.close();
          } else if (answer.includes("Starting")) { //Print selected data starting with "Starting"
            answer.toString() - "Starting";
            console.log(answer.toString(), ":", data.content.LinkInfos[i].Starting[answer]);
            rl.close();
          } else if (answer.includes("Ending")) { //Print selected data starting with "Ending"
            answer.toString() - "Ending";
            console.log(answer.toString(), ":", data.content.LinkInfos[i].Ending[answer]);
            rl.close();
          } else { //Print only the info requested
            console.log(answer.toString(), ":", data.content.LinkInfos[i][answer]);
            rl.close();
          }
        })
      } else if (answer.toLowerCase() == "all") { //Print info for all data (long process not recommended)
        for (let i = 0; i < data.content.LinkInfos.length; i++) {
          getData(i);
        }
      }
    }
    let bol = 1;
    for (let i = 0; i < data.content.LinkInfos.length; i++) { //Check through data if Id exist
      if (answer == (data.content.LinkInfos[i].Id)) { //Set bol to true if Id exist 
        bol = 2;
      }
    }
    if (bol == 1) { //If Id doesn't exist
      console.log("Id not found");
      rl.close();
    }

  });
})

function getData(input) {
  console.log("Time Stamp:", dayjs(data.content.LinkInfos[input].TimeStamp).format('MM/DD/YYYY'));
  console.log("Time Id:", data.content.LinkInfos[input].TIMEDId);
  console.log("Name:", data.content.LinkInfos[input].Name);
  console.log("Organization:", data.content.LinkInfos[input].Organization);
  console.log("Native System Id:", data.content.LinkInfos[input].NativeSystemId);
  console.log("Description:", data.content.LinkInfos[input].Description);
  console.log("Link Length:", data.content.LinkInfos[input].TIMEDId);
  console.log("Heading Compass Direction:", data.content.LinkInfos[input].HeadingCompassDirection);
  console.log("Start State:", data.content.LinkInfos[input].StartState);
  console.log("End State:", data.content.LinkInfos[input].EndState);
  console.log("Start Facility:", data.content.LinkInfos[input].StartFacility);
  console.log("End Facility:", data.content.LinkInfos[input].EndFacility);
  console.log("Start Point:", data.content.LinkInfos[input].StartPoint);
  console.log("End Point:", data.content.LinkInfos[input].EndPoint);
  console.log("Start Exit Name:", data.content.LinkInfos[input].StartExitName);
  console.log("End Exit Name:", data.content.LinkInfos[input].EndExitName);
  console.log("Start Latitude:", data.content.LinkInfos[input].StartLatitude);
  console.log("End Latitude:", data.content.LinkInfos[input].EndLatitude);
  console.log("Start Longitude:", data.content.LinkInfos[input].StartLongitude);
  console.log("End Longitude:", data.content.LinkInfos[input].EndLongitude);
  console.log("Status Code:", data.content.LinkInfos[input].StatusCode);
  console.log("External Id:", data.content.LinkInfos[input].ExternalId);
  console.log("Posted Speed In Mph:", data.content.LinkInfos[input].PostedSpeedInMph);
  console.log("Starting Reader Name:", data.content.LinkInfos[input].Starting.StartingReaderName);
  console.log("Starting Open Reach Facility Id:", data.content.LinkInfos[input].Starting.StartingOpenReachFacilityId);
  console.log("Ending Reader Name:", data.content.LinkInfos[input].Ending.EndingReaderName);
  console.log("Ending Open Reach Facility Id:", data.content.LinkInfos[input].Ending.EndingOpenReachFacilityId);
}