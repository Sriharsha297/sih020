
import React from "react"
import { Polygon } from "react-google-maps";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"


export default withScriptjs(withGoogleMap(props => (   

     <GoogleMap
      defaultZoom={15}
      center={props.center}
    >
        <Polygon
            visible ={true}
            paths={props.paths}
          />
        
    </GoogleMap>
  )
  ));



