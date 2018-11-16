import React from 'react';

import './PanoramaViewer.css';

export default class PanoramaViewer extends React.PureComponent {
  viewerPlugin = global.pannellum;
  imageUrl =
    'https://s3.amazonaws.com/dev-assets-sv/PANO_20181115_181549.jpg?t=' +
    Math.random();

  componentDidMount() {
    this.viewer = this.viewerPlugin.viewer('panorama', {
      type: 'equirectangular',
      panorama: this.imageUrl,
      autoLoad: true,
      showControls: false,
      yaw: -100,
      hotSpots: this.getHotspots(),
    });
  }

  getHotspots = () =>
    [
      {
        pitch: 0,
        yaw: -200,
        cssClass: 'is-office',
        createTooltipArgs: ['Office', 'Jaime Garcia'],
      },
      {
        pitch: -2,
        yaw: -175,
        cssClass: 'is-office',
        createTooltipArgs: ['Office', 'Jose Giammattei'],
      },
      {
        pitch: -3,
        yaw: -160,
        cssClass: 'is-office',
        createTooltipArgs: ['Office', 'Darwin Romero'],
      },
      {
        pitch: -3,
        yaw: -143,
        cssClass: 'is-conference-room',
        createTooltipArgs: ['Conference Room', 'Dagobah'],
      },
      {
        pitch: -3,
        yaw: -130,
        cssClass: 'is-conference-room',
        createTooltipArgs: ['Conference Room', 'Endor'],
      },
      {
        pitch: -3,
        yaw: -100,
        cssClass: 'is-conference-room',
        createTooltipArgs: ['Conference Room', 'Hoth'],
      },
      {
        pitch: -3,
        yaw: -70,
        cssClass: 'is-conference-room',
        createTooltipArgs: ['Conference Room', 'Tatooine'],
      },
      {
        pitch: -3,
        yaw: -35,
        cssClass: 'is-conference-room',
        createTooltipArgs: ['Conference Room', 'Coruscant'],
      },
      {
        pitch: -5,
        yaw: 25,
        cssClass: 'is-office',
        createTooltipArgs: ['Office', 'RRHH. Mayte Serpas'],
      },
    ].map(hotspot =>
      Object.assign({}, hotspot, {
        cssClass: `${hotspot.cssClass} custom-hotspot`,
        createTooltipFunc: this.drawHotspot,
      }),
    );

  drawHotspot = (hotSpotDiv, [type, title]) => {
    hotSpotDiv.classList.add('custom-tooltip');

    let container = document.createElement('div');
    container.classList.add('tooltip-container');

    [type, title].forEach(text => {
      const row = document.createElement('div');
      row.classList.add('tooltip-container-row');
      row.innerHTML = text;
      container.appendChild(row);
    });

    const icon = document.createElement('i');
    icon.classList.add('icon');

    if (hotSpotDiv.className.includes('is-office')) {
      icon.classList.add('icon-people');
    } else if (hotSpotDiv.className.includes('is-conference-room')) {
      icon.classList.add('icon-location');
    }

    hotSpotDiv.appendChild(icon);
    hotSpotDiv.appendChild(container);

    container.style.width = container.scrollWidth - 20 + 'px';
    container.style.marginLeft =
      -(container.scrollWidth - hotSpotDiv.offsetWidth) / 2 + 'px';
    container.style.marginTop = -container.scrollHeight - 50 + 'px';
  };

  render() {
    return (
      <div>
        <div className="loader" />
        <div id="panorama" />
      </div>
    );
  }
}
