// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res) {
    var surveyResult = req.body;
    var surveyScore = req.body.scores;

    var bestFriend = "";
    var bestDifference = 50;

    // Loop through all the friends
    for (var i = 0; i < friendsData.length; i++){
      var difference = 0;

      // Loop through all of the scores
      for (var j = 0; j < surveyResult.length; j++){
        difference += Math.abs(surveyScore[j] - friendsData[i].scores[j]);
      }

      if (difference < bestDifference) {
        bestDifference = difference;
        bestFriend = i;
      }
    }

    friendsData.push(surveyResult);
    res.json(friendsData[bestFriend]);
    
  });
};
