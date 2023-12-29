import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/RickMortyEpisodes">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);