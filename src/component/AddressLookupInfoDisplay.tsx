import { AddressDecoder } from "../cache/AddressDecoder";
import { ADDRESS_NUM_BITS } from "../cache/Ram";
import { BinString } from "../util/util";

type AddressLookupInfoDisplayProps = {
    decoder: AddressDecoder
    address: number;
}

export default function AddressLookupInfoDisplay({ decoder, address }: AddressLookupInfoDisplayProps) {
    const setIndex = decoder.setIndex(address);
    const byteOffset = decoder.byteOffset(address);
    const tag = decoder.tag(address);

    return (
        <div className="flex items-center justify-center gap-2 font-mono font-bold text-2xl">
            <span className="bg-zinc-700 text-white px-3 py-1 rounded-lg shadow-sm border">
                {BinString(tag, "", ADDRESS_NUM_BITS - decoder.byteOffsetNumBits - decoder.setIndexNumBits)}
            </span>
            <span className="bg-yellow-500 text-black px-3 py-1 rounded-lg shadow-sm border">
                {BinString(setIndex, "", decoder.setIndexNumBits)}
            </span>
            <span className="bg-red-600 text-white px-3 py-1 rounded-lg shadow-sm border">
                {BinString(byteOffset, "", decoder.byteOffsetNumBits)}
            </span>
        </div>
    );
}
