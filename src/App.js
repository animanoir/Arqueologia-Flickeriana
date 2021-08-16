import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import Moment from 'react-moment'
import moment from 'moment'
import './App.css';


function toTimestamp(strDate){
  var datum = Date.parse(strDate);
  return datum/1000;
 }

function toMaxTakenDate(timeStamp){
  let dia = 86399
  console.log('toMaxTakenDate'+timeStamp + dia)
  return timeStamp + dia
}

const App = () => {
  const [date, setDate] = useState(new Date());
  const [maxTakenDate, setMaxTakenDate] = useState(
    <Moment unix>{date}</Moment>
  )
  const [minTakenDate, setMinTakenDate] =  useState();
  const [photos, setPhotos] = useState([]);

    useEffect(() => {
      console.log(`minTakenDate: ${moment.unix(minTakenDate).format("DD-MM-YYYY HH:mm:ss")}, maxTakenDate: ${moment.unix(maxTakenDate).format("DD-MM-YYYY HH:mm:ss")}`)
      setPhotos([0])
      setMaxTakenDate(toTimestamp(date))
      fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=840642ee4589f9f9a3ad5572658073f7&tags=querétaro&min_taken_date=${minTakenDate}&max_taken_date=${maxTakenDate}&page=1&format=json&nojsoncallback=1`)
      .then(function(response){
        return response.json();
      })
      .then(function(j){
        // console.info(JSON.stringify(j));
        let picArray = j.photos.photo.map((pic, i) => {
          var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
          return(
            <div key={i} className='photo-timeline-item'>
              <img className='photo-timeline-img' alt="dogs" src={srcPath} />
              <small className='photo-timeline-title'>Título: {pic.title}</small>
            </div>
          )
        })
        setPhotos(picArray)
      })

    }, [date])

    return (
      <div className="App">
      <div>
        <Calendar
            className='calendario'
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
        </div>
        <div className='photo-timeline'>
            {photos}
        </div>
      </div>
    )
}

export default App;
