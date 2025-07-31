import { useContext, useEffect, useState } from "preact/hooks";
import { IBlock, ICache } from "../cache/Interfaces";
import { hexString } from "../util/util";
import { AnimationContext } from "../context/animationContext";

type CacheViewLineProps = {
    blocks: IBlock[];
    line: number;
};

function CacheViewLine({ blocks, line }: CacheViewLineProps) {
    const animationContext = useContext(AnimationContext);

    return (
        <tr className={`${animationContext.isRunning && animationContext.highLightLine == line ? "bg-white" : ""} hover:bg-zinc-100 transition-colors`}>
            {blocks.map((block, index) => (
                <>
                    <td className="px-4 py-2 text-center font-mono">
                        {block.valid ? (
                            <span className="text-green-600 font-bold">🟩</span>
                        ) : (
                            <span className="text-red-600 font-bold">🟥</span>
                        )}
                    </td>
                    <td className="px-4 py-2 text-center font-mono">
                        {hexString(block.tag)}
                    </td>
                    <td className="border-zinc-300 px-4 py-2">
                        <div className="flex flex-wrap gap-1 justify-center">
                            {block.data.map((b, i) => (
                                <span
                                    key={i}
                                    className="bg-zinc-700 text-white text-xs font-mono px-2 py-1 rounded-md shadow-sm"
                                >
                                    {hexString(b)}
                                </span>
                            ))}
                        </div>
                    </td>
                </>
            ))}
        </tr>
    );
}

type CacheViewProps = {
    cache: ICache
}

export default function CacheView({ cache }: CacheViewProps) {
    const [cacheSize, setCacheSize] = useState(0);
    const [blocks, setBlocks] = useState(cache.getBlocks());


    useEffect(() => {
        const updatedBlocks = cache.getBlocks();
        setBlocks(updatedBlocks);

        const lines = updatedBlocks.length;
        const sets = updatedBlocks[0].length;
        const bytesPerSet = updatedBlocks[0][0].data.length;

        setCacheSize(lines * sets * bytesPerSet);
    }, [cache]);

    return (
        <div className="overflow-x-auto ">
            <div className="text-sm text-zinc-600 mb-2">
                Cache size: <span className="font-mono font-bold">{cacheSize} bytes</span>
            </div>

            <table className="table-auto text-sm text-sm font-medium">
                <thead className="text-sm font-medium text-white bg-slate-700">
                    <tr>
                        {blocks[0].map((_, i) => (
                            <>
                                <th className="first:rounded-l-lg px-4 py-2">Valid</th>
                                <th className="px-4 py-2">Tag</th>
                                <th className="last:rounded-r-lg px-4 py-2 bg-slate-800">Data</th>
                            </>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {blocks.map((block, i) => (
                        <CacheViewLine key={i} line={i} blocks={block} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
