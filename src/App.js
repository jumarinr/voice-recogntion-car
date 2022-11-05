import {useState} from 'react'

import logo  from './logo.svg';
import './App.css';

const recognition = new window.webkitSpeechRecognition()
recognition.continuous = true
recognition.lang = 'es-CO'
function App() {
  const [isVoiceOpen, setIsVoiceOpen] = useState(false)

  recognition.onresult = (event) => {
    for (const result of event.results) {
      console.log(result[0].transcript)
    }
  }

  recognition.onerror = (error) => {
    console.log(error)
  }

  const detectVoice = () => {
    setIsVoiceOpen(true)
    recognition.start()
  }

  const stopVoice = () => {
    setIsVoiceOpen(false)
    recognition.stop();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {isVoiceOpen
          ? <button onClick={stopVoice} > Click to close speech </button>
          : <button onClick={detectVoice} > Click to speech </button>
        }
      </header>
    </div>
  );
}

export default App;
