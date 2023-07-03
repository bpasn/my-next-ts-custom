import React from "react";

export default function useEffectHook(_effect: React.EffectCallback, deps?: React.DependencyList | undefined) {
    const effect = React.useRef<React.EffectCallback>(_effect);
    const destroy = React.useRef<any>();
    const effectCalled = React.useRef<boolean>(false);
    const rendered = React.useRef<boolean>(false);
    if (effectCalled.current) {
        rendered.current = true;
    }
    React.useEffect(() => {
        if (!effectCalled.current) {
            destroy.current = effect.current();
            effectCalled.current = true;
        }
        return () => {
            if (rendered.current === false) return;
            if (destroy.current) destroy.current();
        }
    }, [deps])
}