import './App.css'
import CardProductNotLogged from './assets/cardProductNotLogged/CardProductNotLogged';
import CardProductLogged from './assets/cardProductLogged/CardProductLogged';

// Desde https://mui.com/joy-ui/react-card/

function App() {

  return (
    <>
      <div>
        <CardProductLogged />
      </div>
      <span>a</span>
      <div>
        <CardProductNotLogged />
      </div>
    </>
  )
}

export default App
