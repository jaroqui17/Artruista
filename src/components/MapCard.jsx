import React from 'react';
import { useDispatch } from 'react-redux';
import { ViewMapCard, ViewPopCard } from '../redux/actions/actions.js';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // boxShadow: '0 3px 5px 2px rgba(45, 29, 32, .3)'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 0,
  }, 

  button: {
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const MapCard = ({selected, img}) => {
  const classes = useStyles();
  // dispatch if mapcard clicked or not
  const dispatch = useDispatch();
  const viewMapCard = () => dispatch(ViewMapCard());
  const viewPopCard = (data) => dispatch(ViewPopCard(data));



  // handleClick to open mapCard
  const handleClick = () => {
    viewPopCard(selected);
    viewMapCard();
  }


  const num = Math.floor(Math.random() * 8)

  return (
    <React.Fragment>
              <CssBaseline />
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    // image="https://source.unsplash.com/random"
                    image={img[num]}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {selected.firstName} 
                    </Typography>
                    <Typography>
                      {selected.story}
                    </Typography>
                    <Typography>
                      {selected.help}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.button}>
                  <Button size="small" color="primary" onClick={handleClick}>
                      View
                    </Button>
                  </CardActions>
                </Card>
    </React.Fragment>
  );
}

export default MapCard;
