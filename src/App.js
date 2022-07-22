import React, { useEffect, useState} from 'react';
import './App.css';

function App() {
  const [error, setError] = useState(null);
  const [painting, setPainting] = useState({});
  
  useEffect(() => {
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/436121')
      .then(res => res.json())
      .then(
        (result) => {
          setPainting(result);
        },
        (error) => {
          setError(error);
        }
        )
      }, [])

  if (error) {
    return (<div>Error: {error.message}</div>)
  } else {
    return (
      <div className='container'>
        <img src={painting.primaryImage} alt={painting.title}/>
        <h2>
          {painting.title}
        </h2>
        <h3>
          {painting.artistDisplayName}
        </h3>
      </div>
  )
  }
}

export default App;
