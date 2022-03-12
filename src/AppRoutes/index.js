import {Routes, Route} from 'react-router-dom'
import BioCanvas from '../pages/BioCanvas';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
const AppRoutes = () => {
    return(
    <Routes>
         <Route exact path='/' element={<BioCanvas />   } />
     </Routes>
    )
}
export default AppRoutes;