function getCredentials(cb) {
  var data = {
    'grant_type': 'client_credentials',
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET
  };

  return $.ajax({
    'url': 'https://api.clarifai.com/v1/token',
    'data': data,
    'type': 'POST'
  })
  .then(function(r) {
    localStorage.setItem('accessToken', r.access_token);
    localStorage.setItem('tokenTimestamp', Math.floor(Date.now() / 1000));
    cb();
  });
}

function postImage(imgurl) {
  var data = {
    'url': imgurl,
    'model': 'food-items-v0.1'
  };
  var accessToken = localStorage.getItem('accessToken');

  return $.ajax({
    'url': 'https://api.clarifai.com/v1/tag',
    'headers': {
      'Authorization': 'Bearer ' + accessToken,
    },
    'data': data,
    'type': 'POST'
  }).then(function(r){
    parseResponse(r);
  });
}

function parseResponse(resp) {
  var tags = [];
  var prob = [];
  if (resp.status_code === 'OK') {
    var results = resp.results;
    tags = results[0].result.tag.classes;
    probs = results[0].result.tag.probs;
  } else {
    console.log('Sorry, something is wrong.');
  }

  //$('#tags').text(tags.toString().replace(/,/g, ', '));
  getRecipe(tags);
  writeTable(tags, probs);
  return tags;
}

function run(imgurl) {
  if (localStorage.getItem('tokenTimeStamp') - Math.floor(Date.now() / 1000) > 86400
    || localStorage.getItem('accessToken') === null) {
    getCredentials(function() {
      postImage(imgurl);
    });
  } else {
    postImage(imgurl);
  }
}

function writeTable(tags, probs) {
    var table = $('#results-table');
    table.find("tr").remove();
    for (var i = 0; i < tags.length; i++) {
        var tr = $('<tr/>').appendTo(table);
        tr.append('<td>' + tags[i] + '</td>').append('<td>' + probs[i] + '</td>');
    }
}

function jsonCallback(data) {
  parseRecipeResponse(data);
}

function getRecipe(tags) {
  // var data = {
  //   'app_id': CLIENT_ID_FOOD,
  //   'app_key': CLIENT_KEY_FOOD,
  //   'q': tags.slice(0,5).join(),
  // };
  // return $.ajax({
  //   'url': 'https://api.edamam.com/search',
  //   'data': data,
  //   'dataType': 'jsonp',
  //   'jsonpCallback': 'jsonCallback',
  //   'type': 'GET'
  // });

  var data = {
    'query': tags.slice(0,3).join(),
    'number': '10',
  };
  return $.ajax({
    'url': 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',
    'data': data,
    //'dataType': 'json',
    'headers' : {
      'X-Mashape-Key': '52641VWCNPmshGDtEunr2LczbXhtp1jav5Sjsn9bHLwkulJw4i',
    },
    'type': 'GET'
  }).then(function (res) {
    console.log(res.results[0].title);
    //parseRecipeResponse(res);
  });
}

function parseRecipeResponse(resp) {
  var recipeName = resp.results[0].title;
  var url = createUrl(recipeName, resp.results[0].id);
  var recipeText = getRecipeText(url);
  //if (resp.status_code === 'OK') {
    var results = resp.hits;
    recipe = results[0].label;
    recipeURL = results[0].url;
  //} else {
  //  console.log('Sorry, something is wrong.');
  //}

  $('#recipe-name').text(recipeName);
  $('#recipe-text').text(recipeText);
  //return tags;
}

function getRecipeText(url) {
  var data = {
    'url': url
  };
  return $.ajax({
    'url': 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract',
    'data': data,
    //'dataType': 'json',
    'headers' : {
      'X-Mashape-Key': '52641VWCNPmshGDtEunr2LczbXhtp1jav5Sjsn9bHLwkulJw4i',
    },
    'type': 'GET'
  }).then(function (res) {
    return res.text;
    //parseRecipeResponse(res);
  });
}

function createUrl(name, id) {
  var url = "https://spoonacular.com/recipes/";
  var foodId = (name + " " + id).replace(/\s/g, "-").replace(/([!@#$%^&*()+=\[\]\\';,./{}|":<>?~_-])/g, "\\$1");
  return url + foodId;

}