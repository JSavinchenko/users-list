import {SideBar} from './components/SideBar';
import {UsersList} from './components/UsersList';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import styles from './App.module.scss';
import {Profile} from './components/Profile';

function App() {
  return (
    <Router>
      <div className={styles.container}>
        <SideBar />
        <Routes>
          <Route path='/' element={<UsersList />} />
          <Route path='/profile/:userId' element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
