import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';

function App() {
  const [test, setTest] = useState(false)

  useEffect(()=>{
    fetch("http://localhost:9292/test")
    .then(r=>r.json())
    .then(data=>setTest(data[0].name))
  }, [])

  return (
    <div className="App">
      {test ? <h2>{test}</h2> : <h2>loading...</h2>}
    </div>
  );
}

export default App;
