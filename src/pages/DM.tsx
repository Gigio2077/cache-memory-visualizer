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
        // busca na cache
        // hit ou miss? (linha amarela)
        // hit -> (linha verde e para)
        // miss -> (linha vermelha e linha amarela na ram)
        let lookUpResult: 'hit' | 'miss' | null = null;

        const keyframes = [
            () => {
                lookUpResult = null;
                animation.setHighLightLine(-1);
                animation.setKeyframe(1);
            },
            () => {
                const [data, result] = cache.current.lookup(address);
                lookUpResult = result
                animation.setHighLightLine(data);
    
                if (lookUpResult == 'miss') 
                    animation.setKeyframe(3);
                else
                    animation.setKeyframe(2);
            },
            () => {

            },
            () => {
                animation.setIsRunning(false);
            }
        ];

        animation.setIsRunning(true);
        animation.setKeyframe(0);

        console.log(animation);

        for (let i = 0; i < 2; i++) {
            setTimeout(() => {
                console.log("Passo: ", animation.keyframe)
                keyframes[animation.keyframe]()
            }, (i+1)*500);
        }
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