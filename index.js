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

function updateStyleCSSWithPackageJSONData(newVersion) {
  const packageData = generateStyleCSSData(newVersion);

  fs.readFile('style.css', 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }

    var updatedStyleCSSData = data.replace(/^\/\*[\s\S]*?\*\//g, packageData);

    fs.writeFile('style.css', updatedStyleCSSData, 'utf8', function(err) {
      if (err) {
        return console.log(err);
      }
    });
  });
}

function createStyleCSSWithPackageJSONData(newVersion) {
  const packageData = generateStyleCSSData(newVersion);

  fs.writeFile('style.css', packageData, error => {
    if (error) {
      return console.error(error);
    }
  });
}

function generateStyleCSSData(newVersion) {
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

  return styleData;
}

function createOrUpdateStyleCSS(newVersion) {
  if (fs.existsSync('style.css')) {
    updateStyleCSSWithPackageJSONData(newVersion);
  } else {
    createStyleCSSWithPackageJSONData(newVersion);
  }
}

patchNPMversion(createOrUpdateStyleCSS);
