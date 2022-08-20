import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Info from './Information';
import Search from './Search';

function Main() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/info" element={<Info />} />
				<Route path="/search" element={<Search />} />
			</Routes>
		</Router>
	)
}
export default Main;