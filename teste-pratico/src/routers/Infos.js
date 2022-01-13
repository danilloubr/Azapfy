/* eslint-disable eqeqeq */
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { useLocation } from "react-router-dom";
import { useHistory, useParams } from "react-router";

import "../styles/List.css";

function List() {
  const [list, setList] = useState();

  const location = useLocation();
  const history = useHistory();

  const { id } = useParams();

  const goBack = () => {
    history.push("/dashboard");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: resp } = await axios.get(
          "https://cors-everywhere.herokuapp.com/http://homologacao3.azapfy.com.br/api/ps/metahumans"
        );
        const queryObj = new URLSearchParams(location.search);
        Number(queryObj.get("id"));
        const filteredHero = id ? resp.filter((hero) => hero.id == id) : resp;
        setList(filteredHero);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [location.search, id]);

  if (!list)
    return (
      <div>
        <Box
          sx={{
            display: "flex",
            marginTop: "40%",
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
      <div className="div-input"></div>
      <div className="div-principal">
        {list.map((item) => {
          return (
            <div key={item.id}>
              <Card
                className="card"
                sx={{
                  minWidth: 150,
                  maxWidth: 400,
                  boxShadow: "5px 5px 5px 2px rgba(0, 0, 0, 0.25)",
                  padding: "30px",
                }}
              >
                <CardContent>
                  <img src={item.images.md} alt={item.name} />
                  <Stack spacing={1}>
                    <Rating
                      name="half-rating"
                      defaultValue={2.5}
                      precision={0.5}
                    />
                  </Stack>
                  <Typography
                    sx={{ fontSize: 12 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Nome Completo:
                  </Typography>
                  <Typography variant="h4" component="div">
                    {item.biography.fullName}
                  </Typography>
                  <Typography sx={{ fontSize: 12 }} color="text.secondary">
                    Raça:
                  </Typography>
                  <Typography variant="body3">
                    {item.appearance.race}
                  </Typography>
                  <br />
                  <div className="conteudo-lateral">
                    <Typography
                      sx={{ fontSize: 12, marginTop: "10px" }}
                      color="text.secondary"
                    >
                      Ocupação:
                    </Typography>
                    <Typography variant="body3">
                      <p>{item.work.occupation}</p>
                    </Typography>
                    <Typography
                      sx={{ fontSize: 12, marginTop: "10px" }}
                      color="text.secondary"
                    >
                      Altura:
                    </Typography>
                    <Typography variant="body3">
                      <p>{item.appearance.height[1]}</p>
                    </Typography>
                    <Typography
                      sx={{ fontSize: 12, marginTop: "10px" }}
                      color="text.secondary"
                    >
                      Peso:
                    </Typography>
                    <Typography variant="body3">
                      <p>{item.appearance.weight[1]}</p>
                    </Typography>
                    <Typography
                      sx={{ fontSize: 12, marginTop: "10px" }}
                      color="text.secondary"
                    >
                      Atributos:
                    </Typography>
                    <Typography variant="body3">
                      <p>Inteligência: {item.powerstats.intelligence}</p>
                      <p>Força: {item.powerstats.strength}</p>
                      <p>Velocidade: {item.powerstats.speed} </p>
                      <p> Resistência: {item.powerstats.durability} </p>
                      <p>Poder: {item.powerstats.power}</p>
                      <p>Combate: {item.powerstats.combat} </p>
                    </Typography>
                  </div>
                </CardContent>
                <CardActions></CardActions>

                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => goBack()}
                >
                  Voltar
                </Button>
                <br />
              </Card>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}

export default List;
