import React from "react";
import {
  Grid,
  CircularProgress,
  GridList,
  GridListTile,
  GridListTileBar,
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useQuery } from "react-query";
import MenuIcon from '@mui/icons-material/Menu';

const getPokemons = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
  const data = await response.json();

  return data;
};

const getPokemon = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

const PokemonTile = ({ name, url }) => {
  const { error, isLoading, data } = useQuery(`pokemon${name}`, () =>
    getPokemon(url)
  );

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (isLoading) {
    return (
      <Grid container justify="center">
        <CircularProgress />
      </Grid>
    );
  }

  const {
    sprites: { front_default }
  } = data;

  return (
    <GridListTile>
      <img src={front_default} alt={name} />
      <GridListTileBar title={name} />
    </GridListTile>
  );
};
const App = () => {
  
  const { error, isLoading, data } = useQuery("pokemons", getPokemons);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (isLoading) {
    return (
      <Grid container justify="center">
        <CircularProgress />
      </Grid>
    );
  }

  const { results: pokemons } = data;

  return (
    <>
<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Menubar
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <center><h1>PoKemon List</h1>
    <p>This line still show if in offline mode...</p>
    </center>
    <GridList cellHeight={300}>
      {pokemons.map((pokemon) => (
        <PokemonTile key={pokemon.name} {...pokemon} />
      ))}
    </GridList>
    </>
  );
};
export default App