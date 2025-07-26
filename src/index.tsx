import { hydrate, prerender as ssr } from 'preact-iso';

import { DirectMappingCache } from './cache/DirectMappingCache';

import './style.css';
import { useEffect, useRef, useState } from 'preact/hooks';
import CacheView from './component/CacheView';
import RamView from './component/RamView';

export function App() {
	const [, forceUpdate] = useState(0);
	const cache = useRef<DirectMappingCache>(new DirectMappingCache(8, 4));

	useEffect(() => {
		cache.current.onChange = () => forceUpdate(n => n + 1);
		forceUpdate(n => n + 1);
	}, []);

	return (
		<div>
			<div className="flex gap-4 justify-center">
				<CacheView cache={cache.current} />
				<RamView />
			</div>
			<button onClick={() => { cache.current.lookup(4); }}>Clica</button>
		</div>
	);
}

if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
