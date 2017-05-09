const exec = require('child_process').exec;
const packageJSON = require('../../package.json');
const fs = require('fs');

function patchNPMversion(successCallback) {
  const commandOptions = {
    cwd: process.env.PWD // Sets the current working directory to the location
    // from which the script was run.
  };

  exec('npm version patch', commandOptions, (error, stdout) => {
    if (error) {
      throw new Error(`exec error: ${error}`);
    }

    console.log(stdout);

    const newVersion = stdout.trim().replace('v', '');

    successCallback(newVersion);
  });
}

function copyPackageJSONDataToStyleCSS(newVersion) {
  const themeName = packageJSON.name
    .replace('-', ' ')
    .replace(/(?:^|\s)\S/g, a => a.toUpperCase());

  const styleData = `/*
* Theme Name: ${themeName}
* Text Domain: ${packageJSON.name}
* Description: ${packageJSON.description}
* Author: ${packageJSON.author}
* Version: ${newVersion}
*/`;

  fs.writeFile('style.css', styleData, error => {
    if (error) {
      return console.error(error);
    }
  });
}

patchNPMversion(copyPackageJSONDataToStyleCSS);
