// WEBSITE USED FOR DATA FROM MAP:  http://geojson.io/#map=13/55.7965/12.5409

const gameArea = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [12.566986083984375, 55.77860043298326],
        [12.583637237548828, 55.788735922537114],
        [12.57711410522461, 55.800219623559414],
        [12.559261322021484, 55.80060557149618],
        [12.550334930419922, 55.787674232983626],
        [12.566986083984375, 55.77860043298326],
      ],
    ],
  },
};

const players = [
  {
    type: "Feature",
    properties: {
      name: "Christian IX's Hegn",
      inside: false,
    },
    geometry: {
      type: "Point",
      coordinates: [12.569561004638672, 55.80552607236859],
    },
  },
  {
    type: "Feature",
    properties: {
      name: "Stampeskov",
      inside: false,
    },
    geometry: {
      type: "Point",
      coordinates: [12.55359649658203, 55.80272821676827],
    },
  },
  {
    type: "Feature",
    properties: {
      name: "Eremitage Palace",
      inside: true,
    },
    geometry: {
      type: "Point",
      coordinates: [12.571277618408203, 55.795201952252214],
    },
  },
  {
    type: "Feature",
    properties: {
      name: "Jægerborg Dyrehave",
      inside: true,
    },
    geometry: {
      type: "Point",
      coordinates: [12.565784454345703, 55.790087121938804],
    },
  },
];

module.exports = {
  gameArea,
  players,
};
