import { useContext, useEffect, useRef, useState } from "preact/hooks"
import { DirectMappingCache } from "../cache/DirectMappingCache"
import CacheView from "../component/CacheView";
import RamView from "../component/RamView";
import NavBarSimple from "../component/NavBarSimple";
import MemLoadsUI from "../component/MemLoadsUI";
import { AnimationContext } from "../context/AnimationContext";
import { startLookupAnimation } from "../animations/LookupAnimation";
import AddressLookupInfoDisplay from "../component/AddressLookupInfoDisplay";

export default function DM() {
    let cache = useRef(new DirectMappingCache(8, 2));
    const [, forceUpdate] = useState(0);
    const [address, setAddress] = useState(-1);

    const animation = useContext(AnimationContext);

    useEffect(() => {
        cache.current.reRender = () => forceUpdate(n => n + 1);
    }, [])

    const buttonHandler = () => {
        startLookupAnimation(cache, address, animation);
    };

    return (
        <>
            <NavBarSimple />
            <MemLoadsUI
                onButtonClick={buttonHandler}
                setA={(s) => setAddress(s)}
            />
            <div className="pt-2">
                <AddressLookupInfoDisplay address={address} decoder={cache.current.decoder} />
            </div>

            <div className="flex items-center justify-center h-screen gap-25">
                <CacheView cache={cache.current} />
                <RamView onAddressClick={(addr) => cache.current.lookup(addr)} />
            </div>
        </>
    )
}