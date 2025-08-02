import { createContext } from "preact"
import { useState } from "preact/hooks";

export type AnimationContextType = {
    keyframe: number;
    highLightLine: number;
    lastLookupResult: 'hit' | 'miss' | null
    ramLoadedAddr: number [];
    setRamLoadedAddr: (val: number[]) => void;
    setKeyframe: (val: number) => void;
    setHighLightLine: (val: number) => void;
    setLastLookupResult: (val: 'hit' | 'miss' | null) => void;
};

export const AnimationContext = createContext<AnimationContextType>({
    keyframe: 0,
    highLightLine: -1,
    lastLookupResult: null,
    ramLoadedAddr: [],
    setRamLoadedAddr: () => {},
    setKeyframe: () => {},
    setHighLightLine: () => {},
    setLastLookupResult: () => {}
});

export function AnimationProvider({ children }: { children: preact.ComponentChildren }) {
    const [keyframe, setKeyframe] = useState(0);
    const [highLightLine, setHighLightLine] = useState(-1);
    const [lastLookupResult, setLastLookupResult] = useState(null);
    const [ramLoadedAddr, setRamLoadedAddr] = useState<number[]>([]);

    return (
        <AnimationContext.Provider
            value={{
                keyframe,
                highLightLine,
                lastLookupResult,
                ramLoadedAddr,
                setRamLoadedAddr,
                setKeyframe,
                setHighLightLine,
                setLastLookupResult
            }}
        >
            {children}
        </AnimationContext.Provider>
    );
}
