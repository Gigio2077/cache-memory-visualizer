import { hydrate, LocationProvider, Route, Router, prerender as ssr } from 'preact-iso';

import { DirectMappingCache } from './cache/DirectMappingCache';

import './style.css';
import { useEffect, useRef, useState } from 'preact/hooks';
import CacheView from './component/CacheView';
import RamView from './component/RamView';

import Home from './pages/Home';
import DM from './pages/DM';
import NWay from './pages/NWay';

export function App() {
	return (
		<LocationProvider>
			<Router>
				<Route path="/" component={Home} />
				<Route path="/direct-mapped-cache" component={DM} />
				<Route path="/n-way" component={NWay} />
				
				{/* <Route path="/fully-associative-cache"></Route>
				<Route path="/n-way-cache"></Route> */}
			</Router>
		</LocationProvider>


	);
}

if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
