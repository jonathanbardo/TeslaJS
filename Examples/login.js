//=====================================================================
// This sample demonstrates using TeslaJS
//
// https://github.com/mseminatore/TeslaJS
//
// Copyright (c) 2016 Mark Seminatore
//
// Refer to included LICENSE file for usage rights and restrictions
//=====================================================================

var tjs = require('../TeslaJS');
var fs = require('fs');
var colors = require('colors');
var program = require('commander');

program
  .option('-u, --username [string]', 'username (needed only if token not cached)')
  .option('-p, --password [string]', 'password (needed only if token not cached)')
  .option('-U, --uri [string]', 'URI of test server (e.g. http://127.0.0.1:3000)')
  .parse(process.argv);

//
//
//
function login_cb(result) {
    if (result.error) {
        console.log(JSON.stringify(result.error).red);
        process.exit(1);
    }

    var token = JSON.stringify(result.authToken);

    if (token) {
        console.log("Login " + "Successfull.".green);
        //    console.log("OAuth token is: " + token.green);

        fs.writeFileSync('.token', token, 'utf8');
        console.log('Auth token saved!');
    }
}

var username = program.username;
var password = program.password;

if (!username || !password)
    program.help();

if (program.uri) {
    console.log("Setting portal URI to: " + program.uri);
    tjs.setPortalBaseURI(program.uri);
}

tjs.login(username, password, login_cb);
