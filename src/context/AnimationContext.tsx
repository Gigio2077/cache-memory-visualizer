import { createContext } from "preact"
import { useState } from "preact/hooks";

export type AnimationContextType = {
    isRunning: boolean;
    keyframe: number;
    highLightLine: number;
    setIsRunning: (val: boolean) => void;
    setKeyframe: (val: number) => void;
    setHighLightLine: (val: number) => void;
};

export const AnimationContext = createContext<AnimationContextType>({
    isRunning: false,
    keyframe: 0,
    highLightLine: -1,
    setIsRunning: () => {},
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
                isRunning,
                keyframe,
                highLightLine,
                setIsRunning,
                setKeyframe,
                setHighLightLine
            }}
        >
            {children}
        </AnimationContext.Provider>
    );
}