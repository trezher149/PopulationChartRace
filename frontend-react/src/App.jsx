// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import PopChart from "./components/PopChart"
import PlayAndSelectButton from "./components/Buttons"

// import './App.css'
function App() {

  return (
    <div>
      <h1 className="m-8 text-center text-3xl font-bold
      ">
        Population growth per country, 1950 to 2021</h1>
      <PopChart />
    </div>
  )
}

export default App
