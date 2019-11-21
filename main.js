var displays = require('./displays.js');
var GitHub = require('github-api');


// basic auth
const gh = new GitHub({
    username: 'ruthbrennankk',
    password: 'cs3012Password'
 });
 
 const me = gh.getUser();

 const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  readline.question(`Would you like to see our options`, (ans) => {
    if ()
    readline.close()
  })

 



//displays.getStarredRepos(me);
//displays.getRepos(me);
 

