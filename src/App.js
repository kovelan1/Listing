import React from "react";
import "./App.css";
import Map from './Map.js';
import useSwr from "swr";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Search from "./Search";
import Container from '@material-ui/core/Container';

const fetcher = (...args) => fetch(...args).then(response => response.json());



// filter functuon//



export default function App() {
  const somedata=[];
  const url =
  "http://propertyservice.ap-southeast-1.elasticbeanstalk.com/api/property";
  const { data, error } = useSwr(url, { fetcher });
  const property = data && !error ? data.slice(5, 234) : [];


  const points = property.map(data => ({
    type: "Feature",
    properties: { cluster: false, propertyId: data.id, category: data.type},
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(data.address.lng),
        parseFloat(data.address.lat)
      ]
    }
  }));


  console.log(property)
  return (

    <div className="App">
    <Grid container spacing={2}>
      <Grid item xs={12}>
          <Paper >xs=12</Paper>
        </Grid>
    </Grid>
<Container maxWidth="lg">
      <Grid container spacing={2}>
     
        
          <Grid item xs={12} sm={6}>
            <Search data={property}/>
          </Grid>
      
          <Grid item xs={12} sm={6}>
            <Map dataOut={points}/>
          </Grid>
     
        
        
      </Grid>

      </Container>
    </div>
     
  
  
  );
}