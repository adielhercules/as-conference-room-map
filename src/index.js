// Create viewer
var panoramic = pannellum;
var viewer;

var imgSrc =
  "https://s3.amazonaws.com/dev-assets-sv/PANO_20181115_181549.jpg?t=" +
  Math.random();

function loadPanorama(imgUrl) {
  viewer = panoramic.viewer("panorama", {
    type: "equirectangular",
    panorama: imgUrl,
    autoLoad: true,
    showControls: false,
    yaw: -100,
    hotSpots: [
      {
        pitch: 0,
        yaw: -200,
        cssClass: "custom-hotspot is-office",
        createTooltipFunc: hotspot,
        createTooltipArgs: ["Office", "Jaime Garcia"]
      },
      {
        pitch: -2,
        yaw: -175,
        cssClass: "custom-hotspot is-office",
        createTooltipFunc: hotspot,
        createTooltipArgs: ["Office", "Jose Giammattei"]
      },
      {
        pitch: -3,
        yaw: -160,
        cssClass: "custom-hotspot is-office",
        createTooltipFunc: hotspot,
        createTooltipArgs: ["Office", "Darwin Romero"]
      },
      {
        pitch: -3,
        yaw: -143,
        cssClass: "custom-hotspot is-conference-room",
        createTooltipFunc: hotspot,
        createTooltipArgs: ["Conference Room", "Dagobah"]
      },
      {
        pitch: -3,
        yaw: -130,
        cssClass: "custom-hotspot is-conference-room",
        createTooltipFunc: hotspot,
        createTooltipArgs: ["Conference Room", "Endor"]
      },
      {
        pitch: -3,
        yaw: -100,
        cssClass: "custom-hotspot is-conference-room",
        createTooltipFunc: hotspot,
        createTooltipArgs: ["Conference Room", "Hoth"]
      },
      {
        pitch: -3,
        yaw: -70,
        cssClass: "custom-hotspot is-conference-room",
        createTooltipFunc: hotspot,
        createTooltipArgs: ["Conference Room", "Tatooine"]
      },
      {
        pitch: -3,
        yaw: -35,
        cssClass: "custom-hotspot is-conference-room",
        createTooltipFunc: hotspot,
        createTooltipArgs: ["Conference Room", "Coruscant"]
      },
      {
        pitch: -5,
        yaw: 25,
        cssClass: "custom-hotspot is-office",
        createTooltipFunc: hotspot,
        createTooltipArgs: ["Office", "RRHH. Mayte Serpas"]
      }
    ]
  });
}

/*
1. Dagobah
2. Endor
3. Hoth
4. Tatooine
5. Coruscant
*/

// Hot spot creation function
function hotspot(hotSpotDiv, args) {
  hotSpotDiv.classList.add("custom-tooltip");
  var span;

  if (Array.isArray(args)) {
    span = document.createElement("span");
    args.forEach(function(arg) {
      var i = document.createElement("i");
      i.innerHTML = arg;
      span.appendChild(i);
    });
    hotSpotDiv.appendChild(span);
  } else {
    span = document.createElement("span");
    span.innerHTML = args;
    hotSpotDiv.appendChild(span);
  }

  span.style.width = span.scrollWidth - 20 + "px";
  span.style.marginLeft =
    -(span.scrollWidth - hotSpotDiv.offsetWidth) / 2 + "px";
  span.style.marginTop = -span.scrollHeight - 12 + "px";
}

window.onload = function() {
  loadPanorama(imgSrc);
};
