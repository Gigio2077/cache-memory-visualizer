import { useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import MultiToggle, { MultiToggleOption } from "../component/MultiToggle";
import { ICache } from "../cache/Interfaces";
import { NWayAssociativeCache } from "../cache/NWayAssociativeCache";
import CacheView from "../component/CacheView";
import RamView from "../component/RamView";

type NWayState = {
    setsPerLine: number,
    lineCount: number,
    bytesPerBlock: number
};

export default function NWay() {
    const [state, setState] = useState<NWayState>({
        setsPerLine: 2,
        lineCount: 8,
        bytesPerBlock: 2
    });
    const [, forceUpdate] = useState(0);

    const [cache, setCache] = useState(
        () => new NWayAssociativeCache(state.lineCount, state.setsPerLine, state.bytesPerBlock)
    );

    useEffect(() => {
        setCache(new NWayAssociativeCache(state.lineCount, state.setsPerLine, state.bytesPerBlock));
    }, [state]);

    return (
        <div>
            <div className="flex items-center justify-center h-screen gap-25">
            <div>
                <MultiToggle title="Set size">
                    {[2, 4, 8].map(n =>
                        <MultiToggleOption
                            key={n}
                            value={n}
                            selected={state.setsPerLine === n}
                            onSelect={() => setState(prev => ({ ...prev, setsPerLine: n }))}
                        />
                    )}
                </MultiToggle>
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
                        [1, 2, 3, 4].map(n =>
                            <MultiToggleOption
                                value={n}
                                selected={state.bytesPerBlock === n}
                                onSelect={() => setState(prev => ({ ...prev, bytesPerBlock: n }))}
                            />
                        )
                    }
                </MultiToggle>
            </div>
                <CacheView cache={cache} />
                <RamView />
            </div>
        </div>
    );
}