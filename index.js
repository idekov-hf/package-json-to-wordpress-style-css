const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');
const packageJSON = require(path.resolve(process.env.PWD, 'package.json'));

function patchNPMversion(successCallback) {
  const commandOptions = {
    cwd: process.env.PWD // Sets the current working directory to the location
    // from which the script was run.
  };

  exec('npm version patch', commandOptions, (error, stdout) => {
    if (error) {
      throw new Error(`exec error: ${error}`);
    }

    const newVersion = stdout.trim().replace('v', '');

    successCallback(newVersion);
  });
}

function updateStyleCSSWithPackageJSONData(newVersion) {
  const packageData = generateStyleCSSData(newVersion);

  fs.readFile('style.css', 'utf8', function(err, styleData) {
    if (err) {
      return console.log(err);
    }

    let updatedStyleCSSData = getUpdatedStyleCSSData(styleData, packageData);

    fs.writeFile('style.css', updatedStyleCSSData, 'utf8', function(err) {
      if (err) {
        return console.log(err);
      }
      console.log(
        `style.css version successfully updated from ${packageJSON.version} to ${newVersion}`
      );
    });
  });
}

function getUpdatedStyleCSSData(styleData, packageData) {
  let updatedStyleCSSData = '';
  /*
   * Regular expression for matching the header section
   * of a WordPress Theme main style.css file.
   */
  const styleCSSHeaderRegexp = /\/\*[\s\S]*?Theme[\s\S]*?\*\//;

  /*
   * If no header comment is found in style.css, generate the
   * header and append the contents of the style.css file to it.
   * If a header comment is found, replace it with the new
   * data extracted from the package.json file (leaving intact
   * any other content that exists in the style.css file).
	 */
  if (!styleData.match(styleCSSHeaderRegexp)) {
    updatedStyleCSSData = packageData + styleData;
  } else {
    updatedStyleCSSData = styleData.replace(styleCSSHeaderRegexp, packageData);
  }

  return updatedStyleCSSData;
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
