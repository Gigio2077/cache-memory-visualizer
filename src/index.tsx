import { hydrate, LocationProvider, Route, Router, prerender as ssr } from 'preact-iso';

import './style.css';
import { useState } from 'preact/hooks';

import Home from './pages/Home';
import DM from './pages/DM';
import NWay from './pages/NWay';
import { AnimationProvider } from './context/animationContext';

export function App() {
	return (
		<AnimationProvider>
			<LocationProvider>
				<Router>
					<Route path="/" component={Home} />

					<Route path="/direct-mapped-cache" component={DM} />
					<Route path="/n-way" component={NWay} />

					{/* <Route path="/fully-associative-cache"></Route>
				<Route path="/n-way-cache"></Route> */}
				</Router>
			</LocationProvider>
		</AnimationProvider>
	);
}

if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
