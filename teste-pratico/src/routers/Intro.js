import { Button } from "@mui/material";
import { Fragment, useState } from "react";
import capa from "../assets/capa.png";
import capamobile from "../assets/capa-mobile.png";
import { useHistory } from "react-router";
import { Modal } from "react-responsive-modal";
import "../styles/Intro.css";

function Intro() {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  return (
    <Fragment>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        classNames={{
          overlay: "customOverlayIntro",
          modal: "customModalIntro",
        }}
      >
        <div>
          <h1>REGRAS DO JOGO</h1>
          <p>
            Você tem que selecionar dois CARDS e o heroi com maior pontuação
            vence a batalha!
          </p>
        </div>
      </Modal>
      <section className="img-wrapper">
        <img className="img-responsive" src={capa} alt="Capa Metahumans"></img>
        <img
          className="img-responsive-mobile"
          src={capamobile}
          alt="Capa Metahumans"
        ></img>
        <div className="img-overlay">
          <Button
            size="large"
            color="error"
            variant="contained"
            onClick={() => history.push("/dashboard")}
          >
            JOGAR
          </Button>
          <Button
            size="large"
            color="error"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            REGRAS
          </Button>
        </div>
      </section>
    </Fragment>
  );
}

export default Intro;
