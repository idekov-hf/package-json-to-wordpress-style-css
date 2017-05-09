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

fs.writeFile('style.css', styleData, function(error) {
  if (error) {
    return console.error(err);
  }
});
