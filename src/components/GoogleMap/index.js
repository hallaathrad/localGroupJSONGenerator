import React from 'react';

const GoogleMap = (props) => {
  const componentDidMount = (rootNode) => {
    const mapOptions = {
            center: this.mapCenterLatLng(),
            zoom: this.props.initialZoom
          },
          map = new google.maps.Map(this.getDOMNode(), mapOptions);
    const marker = new google.maps.Marker({position: this.mapCenterLatLng(), title: 'Hi', map: map});
    this.setState({map: map});
  }
  const mapCenterLatLng = () => {
    return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
  }
  return <div className='map-gic'></div>;
};

GoogleMap.defaultProps = () => {
  return {
      initialZoom: 6,
      mapCenterLat: 53.5333,
      mapCenterLng: -113.4073126
  };
}

module.exports = GoogleMap;
