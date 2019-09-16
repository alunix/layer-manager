import React from 'react';
import Map from 'components/map';
import Drawer from 'components/map/plugins/drawer';

// Layer manager
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginMapboxGl } from 'layer-manager'

// Legend
import {
  Icons,
  Legend,
  LegendListItem,
  LegendItemTypes,
  LegendItemToolbar,
  LegendItemButtonOpacity,
  LegendItemButtonVisibility,
  LegendItemButtonRemove
} from 'vizzuality-components';

// DATA
import layers from './layers.json';

import './App.scss'

function App() {
  const layerGroups = layers.map(l => {
    const { id } = l;

    return {
      slug: id,
      dataset: id,
      layers: [{
        active: true,
        ...l
      }]
    }
  });

  const onChangeOrder = (...props) => { console.log('onChangeOrder', props); }
  const onChangeVisibility = (...props) => { console.log('onChangeVisibility', props); }
  const onChangeOpacity = (...props) => { console.log('onChangeOpacity', props); }
  const onRemoveLayer = (...props) => { console.log('onRemoveLayer', props); }

  return (
    <div className="c-app">
      <Icons />

      <Map
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/layer-manager/ck07vfinn01xm1co324q5vcdl"
      >
        {_map => (
          <Drawer
            map={_map}
            drawing
            onDrawComplete={(geojson) => { console.log(geojson); }}
          />
        )}
      </Map>

      <div className="c-legend">
        <Legend
          maxHeight={'65vh'}
          collapsable={false}
          onChangeOrder={onChangeOrder}
        >
          {layerGroups.map((layerGroup, i) => {
            return (
              <LegendListItem
                index={i}
                key={layerGroup.slug}
                layerGroup={layerGroup}
                toolbar={
                  <LegendItemToolbar>
                    <LegendItemButtonOpacity
                      trackStyle={{
                        background: '#FFCC00'
                      }}
                      handleStyle={{
                        background: '#FFCC00'
                      }}
                    />
                    <LegendItemButtonVisibility />
                    <LegendItemButtonRemove />
                  </LegendItemToolbar>
                }
                onChangeVisibility={((l, visibility) => onChangeVisibility(l, visibility, layerGroup.slug))}
                onChangeOpacity={(l, opacity) => onChangeOpacity(l, opacity, layerGroup.slug)}
                onRemoveLayer={(l) => { onRemoveLayer(l)}}
              >
                <LegendItemTypes />
              </LegendListItem>
            )
          })}
        </Legend>
      </div>
    </div>
  );
}

export default App;
