import { createContext } from "preact"
import { useState } from "preact/hooks";

export type AnimationContextType = {
    running: boolean;
    keyframe: number;
    highLightLine: number;
    setRunning: (val: boolean) => void;
    setKeyframe: (val: number) => void;
    setHighLightLine: (val: number) => void;
};

export const AnimationContext = createContext<AnimationContextType>({
    running: false,
    keyframe: 0,
    highLightLine: -1,
    setRunning: () => {},
    setKeyframe: () => {},
    setHighLightLine: () => {}
});

export function AnimationProvider({ children }: { children: preact.ComponentChildren }) {
    const [isRunning, setIsRunning] = useState(false);
    const [keyframe, setKeyframe] = useState(0);
    const [highLightLine, setHighLightLine] = useState(0);

    return (
        <AnimationContext.Provider
            value={{
                running: isRunning,
                keyframe,
                highLightLine,
                setRunning: setIsRunning,
                setKeyframe,
                setHighLightLine
            }}
        >
            {children}
        </AnimationContext.Provider>
    );
}
