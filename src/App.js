import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Moment from "react-moment";
import moment from "moment";
import Select from "react-select";
import "./App.css";

const opcionesZonas = [
  { value: "querétaro%2Cqueretaro%2C", label: "Querétaro" },
  { value: "ciudaddeméxico%2Ciztapalapa", label: "Ciudad de México" },
  { value: "aguascalientes", label: "Aguascalientes" },
  { value: "bajacalifornia", label: "Baja California" },
  { value: "campeche", label: "Campeche" },
  { value: "chiapas", label: "Chiapas" },
  { value: "Saltillo", label: "Saltillo" },
  { value: "Colima%2Cmanzanillo", label: "Colima" },
  { value: "Durango", label: "Durango" },
  { value: "Guanajuato", label: "Guanajuato" },
  { value: "Guerrero", label: "Guerrero" },
  { value: "Hidalgo", label: "Hidalgo" },
  { value: "Jalisco%2CGuadalajara", label: "Guadalajara" },
  {
    value: "estadodemexico%2Cecatepec%2Ctolucadelerdo",
    label: "Estado De México",
  },
  { value: "michioacán%2Cmichioacan%2Cmorelia", label: "Michoacán" },
  { value: "morelos%2Ccuernavaca", label: "Morelos" },
  { value: "nayarit%2Ctepic", label: "Nayarit" },
  { value: "monterrey%2Cnuevoleon", label: "Monterrey" },
  { value: "oaxaca", label: "Oaxaca" },
  { value: "puebla%2Cpuebladezaragoza", label: "Puebla" },
  { value: "quintanaroo%2Cchetumal%2Ccancún%2Ccancun", label: "Quintana Roo" },
  { value: "sanluispotosi%2Csanluiospotosí", label: "San Luis Potosí" },
  { value: "sinaola%2Cculiacán%2Cculiacan", label: "Sinaloa" },
  { value: "sonora%2Chermosillo", label: "Sonora" },
  { value: "tabasco%2Cvillahermosa", label: "Tabasco" },
  { value: "tamaulipas%2Cciudadvictoria%2Creynosa", label: "Tamaulipas" },
  {
    value: "tlaxcala%2Ctlaxcaladexicohténcatl%2Cxicohténcatl%2Cxicotencatl",
    label: "Tlaxcala",
  },
  { value: "veracruz", label: "Veracruz" },
  { value: "yucatán%2Cyucatan%2Cmérida%2Cmerida", label: "Yucatán" },
  { value: "zacatecas", label: "Zacatecas" },
];

function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}

// Suma tiempo al timestamp para llegar al final del mismo día
function toMaxTakenDate(timeStamp) {
  let dia = 86399;
  return timeStamp + dia;
}

const App = () => {
  const [date, setDate] = useState(new Date());
  const [zonaTags, setZonaTags] = useState(opcionesZonas[0].value);
  const [zonaLabel, setZonaLabel] = useState(opcionesZonas[0].label);
  const [maxTakenDate, setMaxTakenDate] = useState(
    <Moment unix>{date}</Moment>
  );
  const [minTakenDate, setMinTakenDate] = useState();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    //console.log(`minTakenDate ${minTakenDate}: ${moment.unix(minTakenDate).format("DD-MM-YYYY HH:mm:ss")}, maxTakenDate ${maxTakenDate}: ${moment.unix(maxTakenDate).format("DD-MM-YYYY HH:mm:ss")}`)
    setPhotos(["Obteniendo imágenes desde los servidores de Flickr..."]);
    fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_API_KEY}&tags=${zonaTags}&min_taken_date=${minTakenDate}&max_taken_date=${maxTakenDate}&user_id=&page=1&format=json&nojsoncallback=1`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (j) {
        let picArray = j.photos.photo.map((pic, i) => {
          var srcPath =
            "https://farm" +
            pic.farm +
            ".staticflickr.com/" +
            pic.server +
            "/" +
            pic.id +
            "_" +
            pic.secret +
            ".jpg";
          return (
            <div key={i} className="photo-timeline-item fade-in">
              <a
                href={`https://www.flickr.com/photos/${pic.owner}/${pic.id}`}
                target="_blank"
              >
                <img
                  className="photo-timeline-img"
                  alt={pic.title}
                  src={srcPath}
                />
              </a>
              <div className="info-foto-contenedor">
                <small className="photo-timeline-title">
                  {pic.title ? pic.title : ""}
                </small>
              </div>
            </div>
          );
        });
        if (picArray.length <= 0) {
          setPhotos([
            `No se encontraron fotos en Flickr de ${zonaLabel} tomadas en esta fecha. Intenta con tiempos anteriores.`,
          ]);
        } else {
          setPhotos(picArray);
        }
      });
  }, [date, zonaTags]);

  return (
    <div className="App">
      <div className="foreground" />
      <div className="sidebar-der blanco">
        <p style={{ marginTop: "0", fontSize: "1.3rem" }}>
          <b>
          Historias se capturan a cada instante, fragmentos de eternidad destinados a ser compartidos. Son únicas, inigualables, irrepetibles. Tiempo y lugar se combinan para conjurar la toma perfecta.
        </p>
        <p>
        Arqueología Flickeriana nos invita a redescubrir y encontrar inspiración en fotografías casi olvidadas, alojadas en la otrora popular plataforma de Flickr. A través de esta propuesta, se revelan imágenes tomadas en un mismo día en cualquier rincón de México.

        ¿Qué sucedía en los días previos a un sismo? ¿Qué político recibía alabanzas mientras los más necesitados clamaban por alimento? ¿Qué arte emergía mientras otro quedaba en el olvido?

        Este proyecto también nos anima a reflexionar sobre las plataformas actuales, como Instagram, cuyo enfoque prioriza el consumo y la personalización de publicidad, relegando la calidad del contenido a un segundo plano. ¿Y si promovemos servicios diseñados para enriquecer cada experiencia humana, en lugar de moldearlas al interés comercial?
        </p>
        <p></p>
        <p className="autor">
          por{" "}
          <a
            style={{ color: "rgba(243, 243, 243, 0.574)" }}
            target="_blank"
            href="https://www.animanoir.xyz/"
          >
            Óscar A. Montiel
          </a>{" "}
          | 2021 | Seleccionado para exhibición en <a style={{ color: "rgba(243, 243, 243, 0.574)" }} href="https://cecriticc.org/tierrayterritorio/">  Encuentro de Imagen MMXXI: tierra y territorio (Octubre 2021)</a>
        </p>
        <img id="edm-logo" src="./encuentro-header-logo.png" alt="Encuentro de Imagen MMXXI Tierra y Territorio UAQ"/>
      </div>
      <div className="sidebar-izq">
        <Calendar
          className="calendario"
          locale={"es-MX"}
          minDate={new Date(2004, 1, 10)}
          maxDate={new Date()}
          onChange={(date) => {
            setDate(date);
            console.log("fecha seleccionada: " + date);
            setMinTakenDate(toTimestamp(date));
            setMaxTakenDate(toMaxTakenDate(toTimestamp(date)));
            <Moment format="YYYY/MM/DD HH:mm:ss">{date}</Moment>;
          }}
          value={date}
        />
        <div>
          <Select
            className="select-custom"
            options={opcionesZonas}
            placeholder="Seleccionar territorio"
            onChange={(value) => {
              setZonaTags(value.value);
              setZonaLabel(value.label);
            }}
          />
        </div>
        <div>
          <p className="blanco" style={{ marginBottom: ".5rem" }}>
            Territorio actual:
          </p>
          <p className="texto-zona blanco">{zonaLabel}</p>
        </div>
      </div>
      <div className="photo-timeline blanco">{photos}</div>
    </div>
  );
};

export default App;
