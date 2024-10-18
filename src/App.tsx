import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryDetails from './components/CountryDetails';
import CountryList from './components/CountryList';
import Layout from './layout';

export default function App() {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<CountryList />} />
          <Route path="/country/:code" element={<CountryDetails />} />
        </Routes>
      </Router>
    </Layout>
  );
}
