import { hexString } from "../util/util";

function RamViewLine( {address, data, onAddressClick} : { address: number, data: number, onAddressClick?: (addr: number) => void }) {
    return (
        <tr>
            <td 
                class="border border-white-400 px-4 py-2 text-center"
                onClick={() => onAddressClick?.(address)}>
                {hexString(address)}
            </td>
            <td class="border border-white-400 px-4 py-2 text-center">{data}</td>
        </tr>
    );
}

export default function RamView({ onAddressClick }: { onAddressClick?: (addr: number) => void }) {
    const RAM: number[] = Array.from({ length: 16 }, (_, i) => i);

    return (
        <div class="overflow-x-auto">
            <table class="table-auto border-collapse border border-gray-500 text-sm">
                <thead class="bg-gray-500">
                    <tr>
                        <th class="border border-white-400 px-4 py-2">Address</th>
                        <th class="border border-white-400 px-4 py-2">Data</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        RAM.map((data, addr) => <RamViewLine address={addr} data={data} onAddressClick={onAddressClick} />)
                    }
                </tbody>
            </table>
        </div>
    );
}