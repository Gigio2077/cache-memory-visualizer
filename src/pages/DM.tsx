import { useContext, useEffect, useRef, useState } from "preact/hooks"
import { DirectMappingCache } from "../cache/DirectMappingCache"
import CacheView from "../component/CacheView";
import RamView from "../component/RamView";
import NavBarSimple from "../component/NavBarSimple";
import MemLoadsUI from "../component/MemLoadsUI";
import { AnimationContext } from "../context/AnimationContext";
import { startLookupAnimation } from "../animations/LookupAnimation";
import MultiToggle, { MultiToggleOption } from "../component/MultiToggle";

export default function DM() {
    //let cache = useRef(new DirectMappingCache(4, 2));
    const [, forceUpdate] = useState(0);
    const [addresses, setAddresses] = useState<number[]>([]);

    const animation = useContext(AnimationContext);

    type DMState = {
        lineCount: number,
        bytesPerBlock: number
    };

    const [state, setState] = useState<DMState>({
        lineCount: 4,
        bytesPerBlock: 2
    });

    const cache = useRef<DirectMappingCache>(new DirectMappingCache(state.lineCount, state.bytesPerBlock));

    useEffect(() => {
        cache.current = new DirectMappingCache(state.lineCount, state.bytesPerBlock);
        // Force update to re-render if needed
        forceUpdate(n => n + 1);
    }, [state]);

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
            <div className="pt-2">
                <AddressLookupInfoDisplay address={address} decoder={cache.current.decoder} />
            </div>

            <div className="flex items-center justify-center h-screen gap-25">
                <div className="flex flex-col gap-4">
                    <MultiToggle title="Line count">
                        {
                            [4, 8, 16].map(n =>
                                <MultiToggleOption
                                    value={n}
                                    selected={state.lineCount === n}
                                    onSelect={() => setState(prev => ({ ...prev, lineCount: n }))}
                                />
                            )
                        }
                    </MultiToggle>
                    <MultiToggle title="Bytes per set">
                        {
                            [1, 2, 4].map(n =>
                                <MultiToggleOption
                                    value={n}
                                    selected={state.bytesPerBlock === n}
                                    onSelect={() => setState(prev => ({ ...prev, bytesPerBlock: n }))}
                                />
                            )
                        }
                    </MultiToggle>
                </div>
                <CacheView cache={cache.current} />
                <RamView />
            </div>
        </>
    )
}