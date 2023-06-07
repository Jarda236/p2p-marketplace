import React, {FC} from "react";

interface PriceFilterProps {
    priceToFilter: {from: number, to: number },
    changePriceToFilter: React.Dispatch<React.SetStateAction<{from: number, to: number }>>
}

const PriceFilter:FC<PriceFilterProps> = ({priceToFilter, changePriceToFilter}) => {
    return (
    <div className="flex">
        <span className="mr-2 text-black">Price:</span>
        <input type="number"
        placeholder="From"
        value={priceToFilter.from}
        onChange={(e) => changePriceToFilter({to: priceToFilter.to, from: Number(e.target.value) })}
        className="mr-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-1"/>

        <input type="number"
        placeholder="To"
        value={priceToFilter.to}
        onChange={(e) => changePriceToFilter({from: priceToFilter.from, to: Number(e.target.value) })}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-1"/>
    </div>
    );
}

export default PriceFilter;