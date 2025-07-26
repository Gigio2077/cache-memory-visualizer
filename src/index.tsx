import { hydrate, LocationProvider, Route, Router, prerender as ssr } from 'preact-iso';

import { DirectMappingCache } from './cache/DirectMappingCache';

import './style.css';
import { useEffect, useRef, useState } from 'preact/hooks';
import CacheView from './component/CacheView';
import RamView from './component/RamView';

import Home from './pages/home';
import DM from './pages/DM';

export function App() {
	const [, forceUpdate] = useState(0);
	const cache = useRef<DirectMappingCache>(new DirectMappingCache(8, 4));

	useEffect(() => {
		cache.current.reRender = () => forceUpdate(n => n + 1);
		forceUpdate(n => n + 1);
	}, []);

	return (
		
		
		<LocationProvider>
			<Router>
				<Route path="/" component={Home}/> 
				<Route path="/direct-mapped-cache" component={DM}/>
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
