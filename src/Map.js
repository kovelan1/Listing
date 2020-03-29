import React, { useState, useRef } from "react";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import "./App.css";
import home from "./marker.svg";
import mapStyles from './mapStyles';



const Marker = ({ children }) => children;


export default function Map(props) {
  //const [position] = useGeoPosition('AIzaSyBSjzsDH3F0JVL5K1yzHYOMi4zf6QDZ_Qc','B139 Merchant Place Cobleskill NY 12043');

  const mapRef = useRef();
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(10);
  

  const points=props.dataOut;

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 }
  });

  return (
    <div>
    <div style={{ height: "90vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBSjzsDH3F0JVL5K1yzHYOMi4zf6QDZ_Qc" }}
        defaultCenter={{ lat: 38.430965, lng:-80.720868 }} 
        defaultZoom={5}
        options={{styles:mapStyles}}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat
          ]);
        }}
      >
        {clusters.map(cluster => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount
          } = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                lat={latitude}
                lng={longitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: `${15 + (pointCount / points.length) * 150}px`,
                    height: `${15 + (pointCount / points.length) * 150}px`
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    mapRef.current.setZoom(expansionZoom);
                    mapRef.current.panTo({ lat: latitude, lng: longitude });
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }

          return (
            <Marker
              key={`house-${cluster.properties.propertyId}`}
              lat={latitude}
              lng={longitude}
            >
              <button className="house-marker">
                <img src={home}  alt="no property"/>
              </button>
            </Marker>
          );
        })}
      </GoogleMapReact>
     
    </div>
    <div>
      
    </div>

    </div>
  );
}