import './App.css';
import ProduitsListe from './components/ProduitsListe.jsx';
import CategoriesListe from './components/CategoriesListe.jsx';

import './index.css';


const App = () => {
  return (
    <div>
      <CategoriesListe />
      <ProduitsListe />
    </div>
  );
};

export default App;
