const packageJSON = require('../../package.json');
const fs = require('fs');

let themeName = packageJSON.name
  .replace('-', ' ')
  .replace(/(?:^|\s)\S/g, function(a) {
    return a.toUpperCase();
  });

let styleData = `/*
* Theme Name: ${themeName}
* Text Domain: ${packageJSON.name}
* Description: ${packageJSON.description}
* Author: ${packageJSON.author}
* Version: ${packageJSON.version}
*/`;

fs.writeFile('style.css', styleData, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Data written successfully!');
  console.log("Let's read newly written data");
  fs.readFile('style.css', function(err, data) {
    if (err) {
      return console.error(err);
    }
    console.log('Asynchronous read: ' + data.toString());
  });
});
