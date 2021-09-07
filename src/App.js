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
      setPhotos(['Obteniendo imágenes desde los servidores de Flickr...'])
      fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_API_KEY}&tags=${zonaTags}&min_taken_date=${minTakenDate}&max_taken_date=${maxTakenDate}&user_id=&page=1&format=json&nojsoncallback=1`)
      .then(function(response){
        return response.json();
      })
      .then(function(j){
        let picArray = j.photos.photo.map((pic, i) => {
          var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
          return(
            <div key={i} className='photo-timeline-item fade-in'>
              <a href={`https://www.flickr.com/photos/${pic.owner}/${pic.id}`} target="_blank">
                <img className='photo-timeline-img' alt={pic.title} src={srcPath} />
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
              className='calendario'
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
              placeholder='Seleccionar territorio'
              onChange={
                value => {
                  setZonaTags(value.value)
                  setZonaLabel(value.label)
                }
              }
            />
          </div>
            <div>
              <p className='texto-zona blanco'>{zonaLabel}</p>
            </div>
        </div>
        <div className='photo-timeline blanco'>
              {photos}
        </div>
        <div className='sidebar-der blanco'>
          <p style={{marginTop: '0'}}>
              Tras la popularización de redes sociales que fomentan la rapidez y superficialidad de la vida, las personas han dejado de <i>estar en el momento, en el aquí y ahora</i>, sustituyéndolo por un futuro incierto de vacua popularidad.
          </p>
          <p>
            <b>Arqueología Flickeriana</b> invita a redescubrir fotografías al borde del olvido para revivir aquellos tiempos donde la validación socio-digital <b>{'<$>realmente</$>'}</b> no importaba.
          </p>
          <p>¿galería de fotos?</p>
          <p>
            A su vez, busca reflexionar sobre cómo es que la Experiencia de usuario (UX) moldean nuestra conciencia, ergo acciones para consigo mismo y los otros. Flickr diseñado especificamente para compartir fotografía, sin "likes", sin validación social {'<<¿cuántos selfies crees encontrar?>>'}
          </p>
          <p>
          </p>
          <small>
            por Óscar A. Montiel | 2021 (lo que aconteció en el día)
          </small>
        </div>
      </div>
    )
}

export default App;
