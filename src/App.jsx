import { Outlet} from "react-router-dom"
import Navbar from './Components/Navbar';
import Footer from './Components/Footer'
import StateProvider from "./Components/utils/StateProvider";


function App() {
  return (
    <StateProvider>
    <div className="App">
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
    </StateProvider>
  );
}

export default App;
