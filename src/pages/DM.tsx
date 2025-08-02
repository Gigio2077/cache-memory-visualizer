import { useContext, useEffect, useRef, useState } from "preact/hooks"
import { DirectMappingCache } from "../cache/DirectMappingCache"
import CacheView from "../component/CacheView";
import RamView from "../component/RamView";
import NavBarSimple from "../component/NavBarSimple";
import MemLoadsUI from "../component/MemLoadsUI";
import { AnimationContext } from "../context/AnimationContext";
import { startLookupAnimation } from "../animations/LookupAnimation";

export default function DM() {
    let cache = useRef(new DirectMappingCache(8, 2));
    const [, forceUpdate] = useState(0);
    const [addresses, setAddresses] = useState<number[]>([]);

    const animation = useContext(AnimationContext);

    useEffect(() => {
        cache.current.reRender = () => forceUpdate(n => n + 1);
    }, [])

    const buttonHandler = () => {
        let i = 0;

        const runNext = () => {
            if (i >= addresses.length) return;

            startLookupAnimation(cache, addresses[i], animation);
            i++;

            // Espera o tempo da animação (~500ms × número de estados)
            // Ajuste esse tempo para garantir que a animação termina antes de começar a próxima
            setTimeout(runNext, 3000); 
        };

        runNext();
    };
    return (
        <>
            <NavBarSimple />
            <MemLoadsUI
                onButtonClick={buttonHandler}
                setA={(s) => setAddresses(s)}
            />

            <div className="flex items-center justify-center h-screen gap-25">
                <CacheView cache={cache.current} />
                <RamView />
            </div>
        </>
    )
}