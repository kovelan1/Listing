import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FaBed ,FaBath,FaParking} from "react-icons/fa";
import home1 from "./home1.jpg";
import home2 from "./home2.jpg";
import home3 from "./home3.jpg";

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
  },
});

export default function ImgMediaCard(props) {
  const classes = useStyles();
  
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={home1}
          title="Contemplative Reptile"
        />
        <CardContent style={{textAlign:"left"}}>
          <Typography gutterBottom variant="h7" component="h2">
            {props.name}
            
          </Typography>
          
          <Typography variant="body2" color="textSecondary" component="p">
            <div >
            {props.address} {props.city} {props.state} {props.zip}
            <table>
              <tr>
                <th ><h3>${props.rent}</h3></th>
                <th style={{paddingLeft:5}}><FaBed></FaBed> {props.bed} </th>
                <th > <FaBath></FaBath>{props.bath}</th>
              </tr>
            </table>
            </div>
           
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
