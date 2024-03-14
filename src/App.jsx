import { Outlet} from "react-router-dom"
import Navbar from './Components/Navbar';
import Footer from './Components/Footer'


function App() {
  return (
    <div className="App">
      <Navbar/>
      <main className="container-main">
        <Outlet/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
