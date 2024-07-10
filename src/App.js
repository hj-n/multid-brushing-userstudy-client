

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import Introduction from './pages/Introduction/Introduction';
import Trial from './pages/Trial/Trial';
import Closing from './pages/Closing/Closing';
import Demographic from './pages/Demographic/Demographic';

function App() {
  return (
    <Router>
			<Routes>
				<Route path="/:lang/:exp/:participant" element={<Introduction />} />
				<Route path="/:lang/:exp/:participant/survey" element={<Demographic />} />
				<Route path="/:lang/:exp/:participant/:trial" element={<Trial />} />
				<Route path="/:lang/closing" element={<Closing />} />
			</Routes>
		</Router>
  );
}

export default App;
