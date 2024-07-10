

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import Introduction from './pages/Introduction/Introduction';
import Trial from './pages/Trial/Trial';
import Closing from './pages/Closing/Closing';

function App() {
  return (
    <Router>
			<Routes>
				<Route path="/:lang/:exp/:participant" element={<Introduction />} />
				<Route path="/:lang/:exp/:participant/:trial" element={<Trial />} />
				<Route path="/:lang/closing" element={<Closing />} />
			</Routes>
		</Router>
  );
}

export default App;
