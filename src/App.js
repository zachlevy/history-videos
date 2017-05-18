import React, { Component } from 'react'
import './App.css'
import moments from './moments.json'
import Timeline from './Timeline'
import 'mapbox-gl'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      center: [12.5359979, 41.9100711],
      zoom: [3]
    }
  }
  onMapLoad(map, event) {
    console.log("onMapLoad")
    this.map = map
  }
  handleTimelineMomentClick(moment, event) {
    console.log("handleTimelineMomentClick")
    this.setState({
      center: [
        moment.location.lng,
        moment.location.lat
      ],
      zoom: [12]
    })
  }
  handleMapMarkerClick(moment, event) {
    console.log("handleMapMarkerClick")
    this.setState({
      center: [
        moment.location.lng,
        moment.location.lat
      ],
      zoom: [12]
    })
  }
  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-6">
              <ReactMapboxGl
                style="mapbox://styles/mapbox/streets-v8"
                accessToken="pk.eyJ1IjoiemFjaGxldnkiLCJhIjoiY2lobWExbHJyMG8yNnQ0bHpmYW1zZXV2YyJ9.5RDwdgrQtOdHCOapEwe6eA"
                containerStyle={{height: "100vh", width: "100%"}}
                center={this.state.center}
                zoom={this.state.zoom}
                onStyleLoad={this.onMapLoad.bind(this)}
              >
                <Layer
                  type="symbol"
                  id="marker"
                  layout={{ "icon-image": "marker-15" }}>
                  {
                    moments.map((moment, index) => {
                      return <Feature key={index} coordinates={[moment.location.lng, moment.location.lat]} onClick={this.handleMapMarkerClick.bind(this, moment)}/>
                    })
                  }
                </Layer>
              </ReactMapboxGl>
            </div>
            <div className="col-12 col-sm-6">
              <Timeline handleMomentClick={this.handleTimelineMomentClick.bind(this)} moments={moments} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
