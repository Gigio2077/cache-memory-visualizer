import { IBlock, ICache } from "../cache/Interfaces";
import { hexString } from "../util/util";

function CacheViewLine({ block }: { block: IBlock }) {
    const valid = block.valid ? 1 : 0;
    const tag = block.tag;
    const data = block.data;
    return (
        <tr>
            <td class="border border-gray-400 px-4 py-2 text-center">{valid}</td>
            <td class="border border-gray-400 px-4 py-2 text-center">{tag}</td>
            <td class="border border-gray-400 px-4 py-2 text-center">
                <div class="flex space-x-2">
                    {
                        data.map((b, i) =>
                            <span key={i} class="bg-slate-600 px-2 py-1 rounded">{hexString(b)}</span>
                        )
                    }
                </div>
            </td>
        </tr>
    );
}

export default function CacheView({ cache }: { cache: ICache }) {
    const blocks = cache.getBlocks();
    return (
        <div class="overflow-x-auto">
            <table class="table-auto text-sm">
                <thead class="bg-slate-600">
                    <tr>
                        <th class="border border-gray-400 px-4 py-2">Valid</th>
                        <th class="border border-gray-400 px-4 py-2">Tag</th>
                        <th class="border border-gray-400 px-4 py-2">Data</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        blocks.map((block) => <CacheViewLine block={block} />)
                    }
                </tbody>
            </table>
        </div>
    );
}