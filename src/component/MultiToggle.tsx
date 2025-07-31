import React from "preact/compat";

type MultiToggleProps = {
    title?: string;
    children: React.ReactNode;
}

export default function MultiToggle({ title, children }: MultiToggleProps) {
    return (
        <div className="flex flex-col gap-2 items-center p-1">
            <div className="text-sm font-medium text-zinc-500 text-center">
                {title}
            </div>
            <div className="flex flex-row gap-2 p-2 w-fit border rounded-xl bg-zinc-100">
                {children}
            </div>
        </div>
    );
}


type MultiToggleOptionsProps = {
    value: number;
    selected?: boolean;
    onSelect?: () => void;
};

export function MultiToggleOption({ value, selected, onSelect }: MultiToggleOptionsProps) {
    return (
        <button
            onClick={() => { if (!selected) onSelect(); }}
            className={`
                px-4 py-2 rounded-lg text-sm font-medium
                transition-all duration-300
                cursor-pointer
                ${selected
                    ? "bg-zinc-800 text-white shadow-md scale-105"
                    : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300 hover:scale-105"
                }
            `}
        >
            {value}
        </button>
    );
}
