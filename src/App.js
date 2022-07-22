import React, { useEffect, useState} from 'react';
import './App.css';
import Loader from './Loader';

function App() {
  const [error, setError] = useState(null);
  const [painting, setPainting] = useState({});
  const [url, setUrl] = useState(436121);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${url}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPainting(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
        )
      })

  if (error) {
    return (<div>Error: {error.message}</div>)
  } else if (!isLoaded) {
    return (
      <Loader />
    )
  } else {
    return (
      <div className='container'>
        <div className='images'>
          <img src={painting.primaryImageSmall} alt={painting.title}/>
        </div>
        <h2>
          {painting.title}
        </h2>
        <h3>
          {painting.artistDisplayName}
        </h3>
        <div>
          <button onClick={() => setUrl(url - 1)}>Previous Painting</button>
          <button onClick={() => setUrl(url + 1)}>Next Painting</button>
        </div>
      </div>
  )
  }
}

export default App;
