import axios from 'axios';
import Rigester from './Register';

function App() {
  axios.defaults.baseURL = 'localhost:4040';
  axios.defaults.withCredentials = true;
  return <Rigester />;
}

export default App;
