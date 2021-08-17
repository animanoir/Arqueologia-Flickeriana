import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import Moment from 'react-moment'
import moment from 'moment'
import Select from 'react-select';
import './App.css';


const opcionesZonas = [
  {value: 'querétaro%2Cqueretaro%2Cqro', label: 'Querétaro'},
  {value: 'ciudaddeméxico%2Ccdmx%2C%2Cdistritofederal', label: 'Ciudad de México'},
]

function toTimestamp(strDate){
  var datum = Date.parse(strDate);
  return datum/1000;
 }

// Suma tiempo al timestamp para llegar al final del mismo día
function toMaxTakenDate(timeStamp){
  let dia = 86399
  return timeStamp + dia
}

const App = () => {
  const [date, setDate] = useState(new Date());
  const [zonaTags, setZonaTags] = useState(opcionesZonas[0].value)
  const [zonaLabel, setZonaLabel] = useState(opcionesZonas[0].label)
  const [maxTakenDate, setMaxTakenDate] = useState(
    <Moment unix>{date}</Moment>
  )
  const [minTakenDate, setMinTakenDate] =  useState();
  const [photos, setPhotos] = useState([]);

    useEffect(() => {
      console.log(`minTakenDate ${minTakenDate}: ${moment.unix(minTakenDate).format("DD-MM-YYYY HH:mm:ss")}, maxTakenDate ${maxTakenDate}: ${moment.unix(maxTakenDate).format("DD-MM-YYYY HH:mm:ss")}`)
      setPhotos([0])
      fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=840642ee4589f9f9a3ad5572658073f7&tags=${zonaTags}&min_taken_date=${minTakenDate}&max_taken_date=${maxTakenDate}&user_id=&page=1&format=json&nojsoncallback=1`)
      .then(function(response){
        return response.json();
      })
      .then(function(j){
        let picArray = j.photos.photo.map((pic, i) => {
          var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
          return(
            <div key={i} className='photo-timeline-item'>
              <a href={`https://www.flickr.com/photos/${pic.owner}/${pic.id}`} target="_blank">
                <img className='photo-timeline-img' alt="dogs" src={srcPath} />
              </a>
              <div className='info-foto-contenedor'>
                <small className='photo-timeline-title'>
                  {
                    pic.title ? pic.title : ''
                  }
                </small>
              </div>
            </div>
          )
        })
        setPhotos(picArray)
      })

    }, [date, zonaTags])

    return (
      <div className="App">
        <div className='sidebar-izq'>
          <Calendar
              locale={'es-MX'}
              minDate={new Date(2004, 1, 10)}
              maxDate={new Date()}
              onChange={
                date => {
                  setDate(date);
                  console.log('fecha seleccionada: '+date);
                  setMinTakenDate(toTimestamp(date));
                  setMaxTakenDate(toMaxTakenDate(toTimestamp(date)));
                  <Moment format="YYYY/MM/DD HH:mm:ss">{date}</Moment>
                }
              }
              value={date}
            />
            <div>
            <Select
              options={opcionesZonas}
              onChange={
                value => {
                  setZonaTags(value.value)
                  setZonaLabel(value.label)
                }
              }
            />
          </div>
            <div>
              <h1 className='titulo'>Arqueología Flickeriana:
              </h1>
              <p className='texto-zona'>{zonaLabel}</p>
            </div>
        </div>
        <div className='photo-timeline'>
          {photos}
        </div>
        <div className='sidebar-der'>
          <p>
            ( en construcción ) La información digital muere si es olvidada. Tras la popularización de redes sociales que fomentan la rapidez y la superficialidad, las personas han comenzado a perder el itnerés por complementar la vida de otros de manera más profunda.
          </p>
          <p>
            <b>Arqueología Flickeriana</b> permite redescubrir fotografías en el borde del olvido e invita a rememorar tiempos donde la validación socio-digital no existía. A su vez, busca reflexionar sobre cómo las interfaces máquina-humano moldean nuestra conciencia y acciones, es decir, Flickr diseñado especificamente para compartir fotografía, sin "likes", sin validación social. ¿Cuántos selfies hay? Selecciona una fecha y te mostrará las fotos tomadas en ese día con las etiquetas de Querétaro o CDMX.
          </p>
          <p>

          </p>
          <small>
            por Óscar A. Montiel | 2021
          </small>
        </div>
      </div>
    )
}

export default App;
