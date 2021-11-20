/* eslint-disable eqeqeq */
import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { Modal } from 'react-responsive-modal'

import axios from "axios";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import DialogContent from "@mui/material/DialogContent";

import "../styles/List.css";
import Footer from "./Footer";

function List() {
  
  const [list, setList] = useState();
  const [busca, setBusca] = useState("");
  const [heros, setHeros] = useState([]);
  const [btn, setBtn] = useState([])
  const [open, setOpen] = useState(true);

  
  const location = useLocation();
  const history = useHistory();

  const heroi1 = heros[0] && Object.values(heros[0].powerstats).reduce(
      (acc, current) => (acc += current),0);
  
  const heroi2 = heros[1] && Object.values(heros[1].powerstats).reduce(
      (acc, current) => (acc += current), 0);

  const handleClickOpen = (id) => {
    const result = list.find((hero) => hero.id === id);

    setHeros([...heros, result]);
    setBtn([...btn, result.id]);
    setTimeout(() => setBusca(""), 200);
    
  };
  
  
  const handleClose = () => {
    setHeros([]);
    setOpen(true);
    setBtn([])
    
  };

  const goHero = (id) => {
    history.push(`/infos/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: resp } = await axios.get(
          "http://homologacao3.azapfy.com.br/api/ps/metahumans"
        ); 
        const queryObj = new URLSearchParams(location.search);
        const id = Number(queryObj.get("id"));
        const filteredHero = id ? resp.filter((hero) => hero.id === id) : resp;
        setList(filteredHero);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [location.search]);

  if (!list)
    return (
      <div>
        <Box
          sx={{
            display: "flex",
            marginTop: "25%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </div>
    );

  return (
    <Fragment>
      <div className="div-input">
        <TextField
          sx={{
            fontSize: "16px",
            marginTop: 5,
            marginLeft: 3.4,
            marginRight: 3.4,
            width: "100%",
            textAlign: "center",
          }}
          value={busca}
          onChange={(ev) => setBusca(ev.target.value)}
          label={"PESQUISAR"}
          variant="outlined"
          type="text"
        />
      </div>
      <div className="div-principal">
        {list
          .filter((item) =>
            item.name.toLowerCase().includes(busca?.toLowerCase())
          )
          .map((item) => {
            return (
              <div key={item.id}>
                <Card
                  className="card"
                  sx={{
                    minWidth: 150,
                    boxShadow: "5px 5px 5px 2px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <CardContent>
                    <img src={item.images.sm} alt={item.name} />
                    <Typography
                      sx={{ fontSize: 12 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Nome:
                    </Typography>
                    <Typography variant="h5" component="div">
                      {item.name}
                    </Typography>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                      Raça:
                    </Typography>
                    <Typography variant="body3">
                      {item.appearance.race}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {btn == item.id ? (<Button
                    className="btn-select"
                      size="small"
                      variant="contained"
                      color="success"
                      type="submit"
                      onClick={() => handleClickOpen(item.id)}
                    >
                      Selecionado
                    </Button>) :  <Button                    
                      size="small"
                      variant="contained"
                      color="success"
                      type="submit"
                      onClick={() => handleClickOpen(item.id)}
                    >
                      Selecionar
                    </Button>}
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => goHero(item.id)}
                    >
                      + infos.
                    </Button>
                  </CardActions>
                </Card>
              </div>
            );
          })}
      </div>

      
        {heros.length === 2 && (
          <Modal          
          open={open}
          onClose={handleClose}
          center 
          classNames={{
          overlay: "customOverlay",
          modal: "customModal",
        }}
          >

            {heros.map((item) => {
              return (                
                <div key={item.id}>
                    <DialogContent>
                    <Card
                  className="card-modal"
                  sx={{
                    minWidth: 150,
                    boxShadow: "5px 5px 5px 2px rgba(0, 0, 0, 0.25)",
                    borderRadius: "20px"
                  }}
                >
                      <img alt={item.id} src={item.images.sm}></img>
                      <br />
                      <br />
                      <div>Nome: {item.name}</div>
                      <br />
                      <p>Inteligência: {item.powerstats.intelligence}</p>
                      <p>Força: {item.powerstats.strength}</p>
                      <p>Velocidade: {item.powerstats.speed} </p>
                      <p> Resistência: {item.powerstats.durability} </p>
                      <p>Poder: {item.powerstats.power}</p>
                      <p>Combate: {item.powerstats.combat} </p>
                      
                      </Card>
                    </DialogContent>
                  </div>                
              );
            })}
            {heroi1 > heroi2 ? (
              <div className="div-result">
              <p className="container-modal">{heros[0].name} </p> 
              <p className="winner"> Winner</p>
              </div>
            ) : (
              <div className="div-result">
              <p className="container-modal">{heros[1].name} </p> 
              <p className="winner"> Winner</p>
              </div>
            )}
          </Modal>
        )}      
        <Footer/>
    </Fragment>
  );
}

export default List;
