// Create viewer
var panoramic = pannellum;
var viewer;

var imgSrc =
  "https://s3.amazonaws.com/dev-assets-sv/IMG_20181114_191240.jpg?t=" +
  Math.random();

function loadPanorama(imgUrl) {
  viewer = panoramic.viewer("panorama", {
    type: "equirectangular",
    panorama: imgUrl,
    autoLoad: true,
    showControls: false,
    haov: 300,
    vaov: 100,
    vOffset: 1,
    hotSpots: [
      {
        pitch: 10,
        yaw: -75,
        cssClass: "custom-hotspot is-office",
        createTooltipFunc: hotspot,
        createTooltipArgs: ["Office", "Jaime Garcia"]
      },
      {
        pitch: 10,
        yaw: -55,
        cssClass: "custom-hotspot is-office",
        createTooltipFunc: hotspot,
        createTooltipArgs: ["Office", "Jose Giammattei"]
      },
      {
        pitch: 10,
        yaw: -30,
        cssClass: "custom-hotspot is-office",
        createTooltipFunc: hotspot,
        createTooltipArgs: ["Office", "Darwin Romero"]
      },
      {
        pitch: 10,
        yaw: -15,
        cssClass: "custom-hotspot is-conference-room",
        createTooltipFunc: hotspot,
        createTooltipArgs: ["Conference Room", "Dagobah"]
      },
      {
        pitch: 10,
        yaw: 6,
        cssClass: "custom-hotspot is-conference-room",
        createTooltipFunc: hotspot,
        createTooltipArgs: ["Conference Room", "Endor"]
      },
      {
        pitch: 9,
        yaw: 30,
        cssClass: "custom-hotspot is-conference-room",
        createTooltipFunc: hotspot,
        createTooltipArgs: ["Conference Room", "Hoth"]
      },
      {
        pitch: 9,
        yaw: 70,
        cssClass: "custom-hotspot is-conference-room",
        createTooltipFunc: hotspot,
        createTooltipArgs: ["Conference Room", "Tatooine"]
      },
      {
        pitch: 9,
        yaw: 110,
        cssClass: "custom-hotspot is-conference-room",
        createTooltipFunc: hotspot,
        createTooltipArgs: ["Conference Room", "Coruscant"]
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

var canvas;

function preloadImage() {
  var img = new Image();

  canvas = document.getElementById("canvas");

  img.setAttribute("crossOrigin", "anonymous");

  img.onload = function() {
    drawCanvas(img);
  };

  img.src = imgSrc;
}

function drawCanvas(img) {
  var width = img.naturalWidth;
  var height = img.naturalHeight;

  canvas.width = width;
  canvas.height = height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 10, 10);

  loadPanorama(canvas.toDataURL());
}

window.onload = function() {
  loadPanorama(imgSrc);
};
