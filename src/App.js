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
      }, [url])

  if (error) {
    return (<div>Error: {error.message}</div>)
  } else {
    return (
      <div className='background'>
        <div className='container'>
          <div className='main'>
            <div className='image'>
            {isLoaded ?
              <img src={painting.primaryImage} alt={painting.title}/> :
              <Loader />
            }
            </div>
            <div className='info'>
            <h2 onClick={() => window.open((painting.objectURL), '_blank')}>
              {painting.title}
            </h2>
            <h3 onClick={() => window.open((painting.artistWikidata_URL), '_blank')}>
              {painting.artistDisplayName}
            </h3>
            </div>
            <div className='buttons'>
              <button onClick={() => setUrl(url - 1)}>
                Previous
              </button>
              <button onClick={() => setUrl(url + 1)}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
  )
  }
}

export default App;
