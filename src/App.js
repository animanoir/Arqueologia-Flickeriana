import React, { useState, useEffect } from 'react';
import './App.css';


const App = () => {
  const [photos, setPhotos] = useState([]);

    useEffect(() => {
      fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+process.env.REACT_APP_API_KEY+'&tags=querétaro&min_taken_date=1293775200&max_taken_date=1293858000&per_page=20&page=1&format=json&nojsoncallback=1')
      .then(function(response){
        return response.json();
      })
      .then(function(j){
        console.info(JSON.stringify(j));
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

    }, [])

    return (
      <div className="App">
        <div className='photo-timeline'>
          {photos}
        </div>
      </div>
    )
}

export default App;
