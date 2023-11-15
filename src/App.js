import { LoadRoutes } from './Components/Routes/LoadRoutes';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './Redux/Store/Store';
// import TeacherTable from './Components/Tables/TeacherTable';
// import './Style/style.css';
// import './Style/learnSass.scss'
// import './App.css';
// import { SignIn } from './Components/SignIn/SignIn';


function App() {
  return <Provider store={store}>
    <BrowserRouter>
      <LoadRoutes></LoadRoutes>
      {/* <SignIn></SignIn> */}
    </BrowserRouter>
  </Provider>
  // return <TeacherTable></TeacherTable>
}

export default App;
