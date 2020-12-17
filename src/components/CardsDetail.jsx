import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { ViewCard } from '../redux/actions/actions.js';
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



const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 3px 5px 2px rgba(45, 29, 32, .3)'
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


export default function CardsDetail() {
  const classes = useStyles();
  // retrieving userCards from global state to be rendered
  const cards = useSelector(state => state.userCard);
  const dispatch = useDispatch();
  const viewCard = () => dispatch(ViewCard());
  const history = useHistory();



  // when component mounts, using useEffect hook to get data from db
  useEffect(() => {

  });

  const handleView = (e, id) => {
    e.stopPropagation()
    viewCard();
    return history.push(`/view/${id}`);
  };

const img=["https://source.unsplash.com/user/erondu", "https://source.unsplash.com/user/john_vicente26", "https://source.unsplash.com/user/timbog80","https://source.unsplash.com/random",
"https://source.unsplash.com/user/priscilladupreez", "https://source.unsplash.com/user/chrisjoelcampbell", "https://source.unsplash.com/user/timbog80","https://source.unsplash.com/user/brucemars","https://source.unsplash.com/user/armedshutter"]

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card, i) => (
              <Grid item key={i} xs={12} sm={6}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    // image="https://source.unsplash.com/random"
                    image={img[i]}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.firstName} 
                    </Typography>
                    <Typography>
                      {card.story}
                    </Typography>
                    <Typography>
                      {card.help}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.button}>
                    <Button size="small" color="primary" onClick={(e) => handleView(e, i)}>
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}