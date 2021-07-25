const { hashChain, gameResult } = require("./provable");

//get query parameters from the url
function getParams(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  var results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// seeding events...
// https://bitcointalk.org/index.php?topic=5277365.msg57302055#msg57302055
// https://twitter.com/chipsgg/status/1407721005037113346
const clientSeed =
  "0000000000000000000e1e3bd783ce0de7b0cdabf2034723595dbcd5a28cf831";

const limit = getParams("limit") || 10;
const roundHash =
  getParams("hash") ||
  "bb2e4cf33b170dc361acb379c7f1dd584f546139f5ca31ad4ac91ce164c3ba2a";

// generate provable hashes
const rounds = hashChain(roundHash, limit);

var tableBody = document.getElementById("table");
tableBody.innerHTML = "";
tableBody.innerHTML = rounds
  .map(function (hash, index) {
    var outcome = gameResult(hash, clientSeed);
    return "<tr><td>" + hash + "</td><td>" + outcome + "x</td></tr>";
  })
  .join("");
