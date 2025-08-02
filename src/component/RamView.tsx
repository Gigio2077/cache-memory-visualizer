import { hexString } from "../util/util";
import { useContext, useState } from "preact/hooks";
import { AnimationContext } from "../context/AnimationContext";
import { useEffect } from "preact/hooks";


type RamViewLineProps = {    
    address: number;
    data: number;
}

function RamViewLine( {address, data} : RamViewLineProps) {

const { searchedAddress, lastLookupResult, keyframe } = useContext(AnimationContext);
const [bgColor, setBgColor] = useState("");

    useEffect(() => {
        if (searchedAddress === address) {
            if (keyframe == 3 && lastLookupResult === 'miss') {
                setBgColor("bg-zinc-100");
            } else {
                setBgColor("");
            }
        } else {
            setBgColor("");
        }
    }, [searchedAddress, lastLookupResult, keyframe, address]);

    return (
        <tr class={`${bgColor} hover:bg-zinc-100 transition-colors`}>
            <td class="border border-white-400 px-4 py-2 text-center">
                {hexString(address)}
            </td>
            <td class="border border-white-400 px-4 py-2 text-center">{data}</td>
        </tr>
    );
}

export default function RamView() {
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
                        RAM.map((data, addr) => <RamViewLine address={addr} data={data} />)
                    }
                </tbody>
            </table>
        </div>
    );
}