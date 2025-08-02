import { Dispatch, StateUpdater, useState } from "preact/hooks";

type MemLoadsUIProps = {
    onButtonClick: () => void,
    setA: (s: number[]) => void
}

export default function MemLoadsUI({ onButtonClick, setA }: MemLoadsUIProps) {
    const [text, setText] = useState("");
    const [error, setError] = useState("");

    const handleChange = (event: Event) => {
        const value = (event.target as HTMLInputElement).value;
        setText(value);

        // Verifica se só contém números e espaços
        if (!/^[\d\s]*$/.test(value)) {
            setError("Use apenas números e espaços");
            return;
        }

        const numbers = value
            .trim()
            .split(/\s+/)
            .map(Number)
            .filter((n) => !isNaN(n));

        // Verifica se todos estão no intervalo válido
        if (numbers.some(n => n < 0 || n > 255)) {
            setError("Todos os números devem estar entre 0 e 255");
            return;
        }

        setError("");
        setA(numbers); // Passa a lista para o componente pai
    };

    return (
        <>
            <div class="flex items-center justify-center mt-4 relative">
                <label htmlFor="addrInput" class="mr-5 text-white">
                    Addresses
                </label>

                <input
                    class="border border-white-400 w-80 p-1"
                    id="addrInput"
                    value={text}
                    onChange={handleChange}
                    placeholder={"Write addresses such as 1 2 4 6 . . ."}
                />

                {error && (
                    <div class="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-red-500 text-white text-sm rounded px-3 py-1 shadow-lg">
                        {error}
                        <div class="absolute left-1/2 -top-2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-red-500" />
                    </div>)
                }
                <button class="border border-white-400 ml-2 px-4 py-1"
                    onClick={() => {
                        if (!error) {
                            onButtonClick();
                        }
                    }}>
                    RUN
                </button>
            </div>
        </>
    );
}
