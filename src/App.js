

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import Introduction from './pages/Introduction/Introduction';

function App() {
  return (
    <Router>
			<Routes>
				<Route path="/:lang/:exp/" element={<Introduction />} />
			</Routes>
		</Router>
  );
}

export default App;
