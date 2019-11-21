module.exports = {
    //a function that returns the names and munber of all repos a passed user has passed
    getRepos: function(user) {user.listRepos()
        .then(function({data: reposJson}) {
          var names = '';
          if (reposJson.length > 1) {
                console.log(`I have ${reposJson.length} repos:`);
                names = 'They are called ';
                for (var i=0; i<reposJson.length; i++) {
                    if(i!=reposJson.length-1) {
                        names += reposJson[i].name + ', ';
                    } else if (i!=0) {
                        names += 'and ' + reposJson[i].name + '.';
                    } else {
                        names += reposJson[i].name + '.';
                    }
                }
                console.log(names);
          } else if (reposJson.length == 1) {
                console.log(`I have 1 repo:`);
                names += 'It is called ' + reposJson[0].name + '.';
                console.log(names);
          } else {
              console.log('I have no repos');
          }
    
        });},
        //a function that returns the names and munber of starred repos a passed user has
        getStarredRepos: function(user) {
            user.listStarredRepos()
            .then(function({data: reposJson}) {
            var names = '';
            if (reposJson.length > 1) {
                    console.log(`I have ${reposJson.length} starred repos:`);
                    names = 'They are called ';
                    for (var i=0; i<reposJson.length; i++) {
                        if(i!=reposJson.length-1) {
                            names += reposJson[i].name + ', ';
                        } else if (i!=0) {
                            names += 'and ' + reposJson[i].name + '.';
                        } else {
                            names += reposJson[i].name + '.';
                        }
                    }
                    console.log(names);
            } else if (reposJson.length == 1) {
                    console.log(`I have 1 starred repo:`);
                    names += 'It is called ' + reposJson[0].name + '.';
                    console.log(names);
            } else {
                console.log('I have no starred repos');
            }

            });
        }
}
