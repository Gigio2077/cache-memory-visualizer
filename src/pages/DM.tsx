import { useEffect, useRef, useState } from "preact/hooks"
import { DirectMappingCache } from "../cache/DirectMappingCache"
import CacheView from "../component/CacheView";
import RamView from "../component/RamView";
import NavBarSimple from "../component/NavBarSimple";


export default function DM() {

    let cache = useRef(new DirectMappingCache(8, 2));
    const [state, forceUpdate] = useState(0);
    const [address, setAddress] = useState(0);

    useEffect(() => {
        cache.current.reRender = () => forceUpdate(n => n + 1);
    },
        [])
    return (
        <>
            <div>
                <NavBarSimple />
            </div>
            <div className="flex items-center justify-center h-screen gap-25">
                <CacheView cache={cache.current} />
                <RamView />
            </div>
        </>
    )
}