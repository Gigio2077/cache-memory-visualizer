import { MutableRef } from "preact/hooks";
import { AnimationContextType } from "../context/AnimationContext";
import { DirectMappingCache } from "../cache/DirectMappingCache";

type AnimationState = 'INITIAL' | 'LOOKUP' | 'HIT' | 'MISS' | 'RAM_LOOKUP' | 'DONE';

interface StateConfig {
    action: () => void;
    next: AnimationState | ((result: 'hit' | 'miss' | null) => AnimationState) | null;
}

export const startLookupAnimation = (cache: MutableRef<DirectMappingCache>, address: number, animation: AnimationContextType) => {
    let lookUpResult: 'hit' | 'miss' | null = null;

    const states: Record<AnimationState, StateConfig> = {
        INITIAL: {
            action: () => {
                animation.setHighLightLine(-1);
                animation.setKeyframe(0);
                animation.setLastLookupResult(null);
            },
            next: 'LOOKUP',
        },
        LOOKUP: {
            action: () => {
                console.log("LOOKUP");
                const [data, result] = cache.current.lookup(address);
                lookUpResult = result;
                animation.setLastLookupResult(result);
                animation.setHighLightLine(cache.current.decoder.setIndex(address));
                animation.setKeyframe(1);
            },
            next: (result: 'hit' | 'miss' | null) => result === 'hit' ? 'HIT' : 'MISS',
        },
        HIT: {
            action: () => {
                console.log("HIT");
                animation.setKeyframe(2);
            },
            next: 'DONE',
        },
        MISS: {
            action: () => {
                console.log("MISS");
                animation.setKeyframe(3);
            },
            next: 'RAM_LOOKUP',
        },
        RAM_LOOKUP: {
            action: () => {
                console.log("RAM_LOOKUP");
                animation.setKeyframe(4);
            },
            next: 'DONE',
        },
        DONE: {
            action: () => {
                console.log("DONE");
            },
            next: null
        }
    };

    const runState = (currentState: AnimationState) => {
        const config = states[currentState];
        if (!config) return;

        config.action();

        const nextState = typeof config.next === 'function'
            ? config.next(lookUpResult)
            : config.next;

        if (nextState) {
            setTimeout(() => {
                if (currentState != 'DONE') {
                    runState(nextState);
                }
            }, 500);
        }
    };

    setTimeout(() => runState('INITIAL'), 0);
}