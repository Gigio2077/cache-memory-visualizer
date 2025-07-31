import { useContext, useEffect, useRef, useState } from "preact/hooks"
import { DirectMappingCache } from "../cache/DirectMappingCache"
import CacheView from "../component/CacheView";
import RamView from "../component/RamView";
import NavBarSimple from "../component/NavBarSimple";
import MemLoadsUI from "../component/MemLoadsUI";
import { BinString } from "../util/util";
import { AnimationContext } from "../context/animationContext";

export default function DM() {
    let cache = useRef(new DirectMappingCache(8, 2));
    const [, forceUpdate] = useState(0);
    const [address, setAddress] = useState(0);

    const animation = useContext(AnimationContext);

    useEffect(() => {
        cache.current.reRender = () => forceUpdate(n => n + 1);
    }, [])

    const buttonHandler = () => {
        console.log("Start animation");
        setTimeout(() => {
            animation.isRunning = true;
            animation.keyframe = 1;
        }, 1000)
        setTimeout(() => {
            animation.keyframe = 2;
        }, 2000)
        setTimeout(() => {
            animation.keyframe = 3;
            animation.isRunning = false;
        }, 3000)
    }

    return (
        <>
            <NavBarSimple />
            <MemLoadsUI
                onButtonClick={buttonHandler}
                setA={(s) => setAddress(s)}
            />
            {BinString(address)}
            keyframe: {animation.keyframe}

            <div className="flex items-center justify-center h-screen gap-25">
                <CacheView cache={cache.current} />
                <RamView onAddressClick={(addr) => cache.current.lookup(addr)} />
            </div>
        </>
    )
}