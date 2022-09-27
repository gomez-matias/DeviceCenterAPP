import { Route, Routes} from 'react-router-dom'


import MainPage from "./pages/MainPage.jsx";

import CrearOrdenPage from "./pages/CrearOrdenPage.jsx";


import Navbar from './components/Navbar.jsx';




function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/crearOrden" element={<CrearOrdenPage />} />
      </Routes>
    </>
  );

}

export default App
