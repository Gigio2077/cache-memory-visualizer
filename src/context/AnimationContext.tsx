import { createContext } from "preact"

export type AnimationContextType = {
    isRunning: boolean;
    keyframe: number;
    highLightLine: number;
}

export const AnimationContext = createContext<AnimationContextType>({
    isRunning: false,
    keyframe: 0,
    highLightLine: 0
});
