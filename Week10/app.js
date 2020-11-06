const gju = require("geojson-utils");
const express = require("express");
const app = express();

let gameArea = require("./gameData.js").gameArea.geometry;
let players = require("./gameData.js").players;

app.get("/", (req, res) => res.send("Geo Demo!"));

// Endpoint 1:  /geoapi/isuserinarea/:lon/:lat
app.get("/geoapi/isuserinarea/:lon/:lat", (req, res) => {
  const { lon, lat } = req.params;
  const myPoint = { type: "Point", coordinates: [lon, lat] };

  const status = gju.pointInPolygon(myPoint, gameArea);
  msg = status
    ? "Point was inside the tested polygon"
    : "Point was NOT inside tested polygon";

  const result = {
    status,
    msg,
  };

  res.send(result);
});

// Endpoint 2:  /geoapi/findNearbyPlayers/:lon/:lat/:rad
app.get("/geoapi/findNearbyPlayers/:lon/:lat/:rad", (req, res) => {
  const { lon, lat, rad } = req.params;
  const myPoint = { type: "Point", coordinates: [lon, lat] };
  console.log(rad);

  let result = players.filter((player) => {
    let check = gju.geometryWithinRadius(player.geometry, myPoint, rad);
    console.log(check);
    return check;
  });

  res.send(result);
});

// Endpoint 3:  /geoapi/distanceToUser/:lon/:lat/:username
app.get("/geoapi/distanceToUser/:lon/:lat/:username", (req, res) => {
  const { lon, lat, username } = req.params;
  const myPoint = { type: "Point", coordinates: [lon, lat] };

  const player = players.find((player) => {
    return player.properties.name && player.properties.name == username;
  });

  if (player) {
    const distance = gju.pointDistance(myPoint, player.geometry);
    result = { distance, to: username };
    res.send(result);
  } else {
    res.statusCode = 404;
    res.send({ msg: "User not found" });
  }
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));