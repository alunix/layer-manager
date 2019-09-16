import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

// styles
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

// constants
import { DRAWER_CONFIG } from './constants';

class Drawer extends PureComponent {
  static propTypes = {
    map: PropTypes.object.isRequired,
    drawing: PropTypes.bool.isRequired,
    onDrawComplete: PropTypes.func.isRequired
  }

  componentDidMount() {
    if (this.props.drawing) {
      this.initDrawing();
    }
  }

  componentDidUpdate(prevProps) {
    const { drawing } = this.props;
    const drawingChanged = drawing !== prevProps.drawing;

    // start drawing
    if (drawing && drawingChanged) {
      this.initDrawing();
    }

    // stop drawing
    if (!drawing && drawingChanged) {
      this.closeDrawing();
    }
  }

  initDrawing = () => {
    const { map, onDrawComplete } = this.props;

    this.draw = new MapboxDraw(DRAWER_CONFIG);
    map.addControl(this.draw);

    if (this.draw.changeMode) {
      this.draw.changeMode('draw_polygon');
    }

    console.log(this.draw, this.props.map);

    map.on('draw.create', (e) => {
      console.log('draw.create');
      const geoJSON = e.features && e.features[0];
      if (geoJSON) {
        onDrawComplete(geoJSON);
      }
    });
  };

  closeDrawing = () => {
    const { map } = this.props;
    map.off('draw.create');
    map.removeControl(this.draw);
  };

  render() {
    if (this.props.map) console.log(this.props.map.getStyle().layers);
    return null;
  }
}

export default Drawer;
