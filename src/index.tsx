import { hydrate, LocationProvider, Route, Router, prerender as ssr } from 'preact-iso';

import './style.css';
import { useState } from 'preact/hooks';

import Home from './pages/Home';
import DM from './pages/DM';
import NWay from './pages/NWay';
import { AnimationContext, AnimationContextType } from './context/animationContext';

export function App() {
	const [animation, setAnimation] = useState<AnimationContextType>({
		isRunning: false,
		keyframe: 0,
		highLightLine: 0
	})

	return (
		<AnimationContext value={animation}>
			<LocationProvider>
				<Router>
					<Route path="/" component={Home} />

					<Route path="/direct-mapped-cache" component={DM} />
					<Route path="/n-way" component={NWay} />

					{/* <Route path="/fully-associative-cache"></Route>
				<Route path="/n-way-cache"></Route> */}
				</Router>
			</LocationProvider>
		</AnimationContext>
	);
}

if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
