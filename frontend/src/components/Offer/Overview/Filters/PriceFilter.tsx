import React, {FC} from "react";

interface PriceFilterProps {
    priceToFilter: {from: number, to: number },
    changePriceToFilter: React.Dispatch<React.SetStateAction<{from: number, to: number }>>
}

const PriceFilter:FC<PriceFilterProps> = ({priceToFilter, changePriceToFilter}) => {
    return <div style={{
        display: "inline",
        position: "absolute",
        background: "whitesmoke"
    }}>
        <input type="number" placeholder="From" value={priceToFilter.from} onChange={(e) => changePriceToFilter({to: priceToFilter.to, from: Number(e.target.value) })}/>
        <input type="number" placeholder="To" value={priceToFilter.to} onChange={(e) => changePriceToFilter({from: priceToFilter.from, to: Number(e.target.value) })}/>
    </div>
}

export default PriceFilter;