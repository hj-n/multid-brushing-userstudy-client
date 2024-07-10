

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import Introduction from './pages/Introduction/Introduction';
import Trial from './pages/Trial/Trial';

function App() {
  return (
    <Router>
			<Routes>
				<Route path="/:lang/:exp/:participant" element={<Introduction />} />
				<Route path="/:lang/:exp/:participant/:trial" element={<Trial />} />
			</Routes>
		</Router>
  );
}

export default App;
