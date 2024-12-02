
import './App.css';
import './api.js';
import ProduitsListe from './components/ProduitsListe.jsx';
import CategoriesListe from './components/CategoriesListe.jsx';

import './index.css';


const App = () => {
  return (
    <div>
      <ProduitsListe />
      <CategoriesListe />
    </div>
  );
};

export default App;
