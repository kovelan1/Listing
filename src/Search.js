import React, { Component } from 'react'
import ImgMediaCard from './ImgMediaCard';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function searchingFor(term,catgry){
    return function(x){
        
        if(catgry==="type"){
            return x.type.toLowerCase().includes(term.toLowerCase())|| !term;
        }
        else if(catgry==="city"){
            return x.address.city.toLowerCase().includes(term.toLowerCase())|| !term;
        }
        // else if(catgry==="bed"){
        //     return x.bed_rooms.includes(term)|| !term;
        // }
        else if(catgry==="state"){
            return x.address.state.toUpperCase().includes(term.toUpperCase())|| !term;
        }
        else{
            return x.address.city.toLowerCase().includes(term.toLowerCase())|| !term;
        }
        
    }
}

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

export class Search extends Component {

    
    //const people=props.data;
    constructor(props){
        super(props)
   
        this.state={
            people: props.data,
            term:'',
            catgry:''
        }
        
        this.searchHandeler=this.searchHandeler.bind(this);
        this.searchHandelerBed=this.searchHandelerBed.bind(this);
        this.searchHandelerCity=this.searchHandelerCity.bind(this);
        this.searchHandelerState=this.searchHandelerState.bind(this);
    }
    
    searchHandeler(event){
        this.setState({term: event.target.value})
        this.setState({catgry: "type"})
    }

    searchHandelerBed(event){
        this.setState({term: event.target.value})
        this.setState({catgry: "bed"})
    }

    searchHandelerState(event){
        this.setState({term: event.target.value})
        this.setState({catgry:"state" })
    }

    searchHandelerCity(event){
        this.setState({term: event.target.value})
        this.setState({catgry: "city"})
    }
    render() {
        const properties=this.props.data;
       const {term,catgry}=this.state;
     
        return (
            <div>
                
                <form >
                <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                <TextField id="type" label="Type" variant="filled" onChange={this.searchHandeler}
                       />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField disabled id="bed" label="Bed Rooms" variant="filled" onChange={this.searchHandelerBed}
                        />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="city" label="City" variant="filled" onChange={this.searchHandelerCity}
                       />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="filled-basic" label="State" variant="filled" onChange={this.searchHandelerState}
                        />
                </Grid>
                </Grid>
                </form>
                
                <Grid container spacing={2}>
                    
                    {
                        properties.filter(searchingFor(term,catgry)).map((data,index) =>{
                           
                            if(((index+1)%3)===2){
                                return(
                                    <Grid item xs={12} sm={4} key={index}>
                                     <ImgMediaCard rent={data.rent} bed={data.bathrooms_attach} bath={data.bed_rooms} name={data.type} address={data.address.address} city={data.address.city} state={data.address.state} zip={data.address.zip} image="home1"/> 
                                     </Grid>
                                     
                                );
                                
                            }else if(((index+1)%3)===1){
                                return(
                                    <Grid item xs={12} sm={4} key={index}>
                                     <ImgMediaCard rent={data.rent} bed={data.bathrooms_attach} bath={data.bed_rooms} name={data.type} name={data.type} address={data.address.address} city={data.address.city} state={data.address.state} zip={data.address.zip} image="home2"/> 
                                     </Grid>
                                     
                                );
                            }else if(((index+1)%3)===0){
                                return(
                                    <Grid item xs={12} sm={4} key={index}>
                                     <ImgMediaCard rent={data.rent} bed={data.bathrooms_attach} bath={data.bed_rooms} name={data.type} name={data.type} address={data.address.address} city={data.address.city} state={data.address.state} zip={data.address.zip} image="home3"/> 
                                     </Grid>
                                     
                                );
                            }
                            
                        }
                        )
                    }
                   </Grid>
            </div>
            
        );
    }
}

export default Search
