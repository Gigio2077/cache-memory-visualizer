function RamViewLine( {address, data} : { address: number, data: number }) {
    return (
        <tr>
            <td class="border border-gray-400 px-4 py-2 text-center">{address}</td>
            <td class="border border-gray-400 px-4 py-2 text-center">{data}</td>
        </tr>
    );
}

export default function RamView() {
    const RAM: number[] = Array.from({ length: 4 }, (_, i) => i);

    return (
        <div class="overflow-x-auto">
            <table class="table-auto border-collapse border border-gray-400 text-sm">
                <thead class="bg-gray-200">
                    <tr>
                        <th class="border border-gray-400 px-4 py-2">Address</th>
                        <th class="border border-gray-400 px-4 py-2">Data</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        RAM.map((data, addr) => <RamViewLine address={addr} data={data} />)
                    }
                </tbody>
            </table>
        </div>
    );
}