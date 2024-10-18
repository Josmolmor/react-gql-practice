import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryDetails from './components/CountryDetails';
import CountryList from './components/CountryList';
import { ThemeSwitcher } from './components/ThemeSwitcher';

export default function App() {
  return (
    <>
      <ThemeSwitcher />
      <Router>
        <Routes>
          <Route path="/" element={<CountryList />} />
          <Route path="/country/:code" element={<CountryDetails />} />
        </Routes>
      </Router>
    </>
  );
}
