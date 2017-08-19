# package-json-to-wordpress-style-css
A Node module that creates/overwrites the header of the `style.css` file in a WordPress theme with corresponding information pulled from the theme's `package.json` file.

A header comment with the following format is created:

```
/*
* Theme Name: Some Theme Name
* Text Domain: some-theme-name
* Description: A WordPress theme for some purpose.
* Author: Some Author's Name
* Version: 0.0.0
*/
```
This module does not overwrite any CSS rules or comments (besides the header) that are already present in the `style.css` file.

Each time `style.css` is updated with information from `package.json`, the version number is bumped up to signify a patch in the theme. This can be used to tell the browser to re-cache if say a theme's JS or CSS files have been changed.
