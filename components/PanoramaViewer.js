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
      keyboardZoom: false,
      disableKeyboardCtrl: true,
      compass: false,
      hotSpots: this.getHotspots(),
    });

    this.viewer.on('load', this.showMinimap);

    this.yaw = this.viewer.getYaw() + 100;
    this.updateMinimapRotation(this.yaw);
    this.startUpdateMinimapRotation();
  }

  componentWillUnmount() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }

    this.viewer.off('load', this.showMinimap);
  }

  startUpdateMinimapRotation = () => {
    this.updateInterval = setInterval(() => {
      const yaw = this.viewer.getYaw() + 100;

      if (yaw !== this.yaw) {
        this.updateMinimapRotation(yaw);

        this.yaw = yaw;
      }
    }, 100);
  };

  updateMinimapRotation = yaw => {
    if (this.minimap) {
      this.minimap.style.transform = `rotate(${yaw}deg) translateY(0px)`;
    }
  };

  showMinimap = yaw => {
    if (this.minimap) {
      this.minimap.parentElement.style.transform = `translateY(0px)`;
      this.minimap.parentElement.style.opacity = 0.8;
    }

    if (this.select) {
      this.select.parentElement.style.opacity = 1;
    }
  };

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

  setRotation = e => {
    const value = e.target.value;

    if ( this.viewer ) {
      this.viewer.setYaw(Number(value));
    }

    this.select.value = '';
  };

  render() {
    return (
      <div>
        <div className="loader" id="loader">
          Loading...
        </div>
        <div id="panorama" />

        <div className="form-group jump-to">
          <select
            className="form-select"
            onChange={this.setRotation}
            ref={el => {
              this.select = el;
            }}>
            <option value="">Pan to:</option>
            {this.getHotspots().map(item => (
              <option value={item.yaw} key={item.yaw}>
                {item.createTooltipArgs.join(' - ')}
              </option>
            ))}
          </select>
        </div>

        <div
          className="minimap"
          style={{ backgroundImage: 'url(/static/minimap.png)' }}>
          <div
            className="minimap-position"
            ref={el => {
              this.minimap = el;
            }}>
            <i className="icon icon-arrow-up" />
            <div className="minimap-camera" />
          </div>
        </div>

        <div className="credits">
          Made with <span className="text-error">♥</span> by{' '}
          <a href="https://twitter.com/adielhercules" target="_blank">
            Adiel Hercules
          </a>
          . Photo by{' '}
          <a href="https://twitter.com/ronyvas" target="_blank">
            Rony Vásquez
          </a>
        </div>
      </div>
    );
  }
}
