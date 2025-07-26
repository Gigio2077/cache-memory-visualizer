import { useEffect, useRef, useState } from "preact/hooks"
import { DirectMappingCache } from "../cache/DirectMappingCache"
import CacheView from "../component/CacheView";

export default function DM() {

    let cache = useRef(new DirectMappingCache(8, 4));
    const [state, forceUpdate] = useState(0);
    const [address, setAddress] = useState(0);

    useEffect(() => {
        cache.current.reRender = () => forceUpdate(n => n + 1);
    },
        [])
    return (
        <div>
            <CacheView cache={cache.current} />
            <button onClick={() => { cache.current.lookup(address); console.log(state) }}>Aperte-me</button>
            <input
                type="number"
                name="Acessar endereço"
                value={address}
                onChange={(e) => {
                    const newValue = parseInt(e.target.value, 10);
                    setAddress(newValue);
                    console.log("New Address:", newValue);
                }}
            />
        </div>
    )
}