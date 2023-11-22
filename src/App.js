import './App.css';
import SubNavbar from './components/Navbar/SubNavbar';
import InputField  from './components/AddFlashCard/InputField';
import MyFlashCardPage  from './components/cards/MyFlashCardPage';
import MyNav from './components/Navbar/MyNav';
import { Routes , Route } from 'react-router-dom';
import CardsDetails from './components/cardsDetails/CardsDetails';
import ErrorPage from './components/error/ErrorPage';



function App() {
  return (
    <div className="App">
     <MyNav/>
     <SubNavbar/>
     <Routes>
      <Route path='/' element={<InputField/>}/>
      <Route path='/myflashcard' element={<MyFlashCardPage/>}/>
      <Route path='/cardsdetails/:id' element={<CardsDetails/>}/>
      <Route path='*' element={<ErrorPage/>}/>
     </Routes>

    </div>
  );
}

export default App;
