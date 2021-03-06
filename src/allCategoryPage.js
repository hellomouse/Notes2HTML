'use strict';

const path = require('path');
const basePath = path.normalize(__dirname);

const config = require(basePath + '/config.js');
const categoryColor = require(basePath + '/categoryColor.js');

const CATEGORY_TEMPLATE = `
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta name="description" content="Notes, formatted into a neat website using Notes2HTML">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Social meta -->
    <meta property="og:title" content="Notes">
    <meta property="og:description" content="Notes, formatted into a neat website using Notes2HTML">
    <meta property="og:image" content="img/thumbnail.jpg">

    <!-- Favicons -->
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">

    <title>Note Categories</title>

    <!-- Custom font -->
    <link href="https://fonts.googleapis.com/css?family=Major+Mono+Display|Raleway:400,400i,700,700i" rel="stylesheet">

    <!-- Custom JS -->
    <script src="${config.jsPath}/index.js"></script>

    <!-- Custom CSS -->
    <link rel="stylesheet" href="${config.cssPath}/index.css">
</head>

<body>
    <div class="header" style="border-bottom: 30px solid #777">
        <h1 class="header-title">NOTES</h1>
        <h4 class="header-sub">All note categories listed here</h4>
    </div>
    <div class="main-body">

    <h2>Categories</h2>
[BODY]

    </div>

    <div class="footer">
    <br>
    ${config.footerText}
    </div>
</body>
</html>
`

/**
 * Generate the category page
 * @param {array} categoryNames name of every category
 */
module.exports = function (categoryNames) {
    let body = '';

    for (let name of categoryNames) {
        let color = categoryColor(name);
        body += `<h4><a href="/a/${name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}" style="color: ${color}; 
text-decoration-color: ${color}">${name}</a></h4>\n`;
    }

    return CATEGORY_TEMPLATE
        .replace('[BODY]', body)
        .trim();
}