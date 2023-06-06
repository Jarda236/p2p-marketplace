import React, {FC} from "react";

interface ColumnToSort {
    column: string;
    // true = descending
    order: boolean;
}

interface SortFilterProps {
    columnsToSort: ColumnToSort[],
    changeColumnsToSort: React.Dispatch<React.SetStateAction<ColumnToSort[]>>
}

const COLUMNS = [{name: "name", display: "Name"}, {name: "sellerName", display: "Seller"}, {name: "createdAt", display: "Created at"}, {name: "price", display: "Price"}, {name: "buyerId", display: "Sold"}];

const SortFilter:FC<SortFilterProps> = ({columnsToSort, changeColumnsToSort}) => {
    const changeSortingDirection = (column: string) => {
        const wantedColumn = columnsToSort.findIndex(e => e.column === column);
        if (wantedColumn !== -1) {
            handleOrderChange(column, columnsToSort[wantedColumn].order)
        } else {
            changeColumnsToSort([...columnsToSort, { column: column, order: true }]);
        }
    }
    const deleteSorting = (column: string) => {
        changeColumnsToSort(p => p.filter(item => item.column !== column));
    }

    const handleOrderChange = (column: string, order: boolean) => {
        const updatedSortCriteria: ColumnToSort[] = columnsToSort.map(item => {
            if (item.column === column) {
                return {...item, order: !order};
            }
            return item;
        });
        changeColumnsToSort(updatedSortCriteria);
    }

    const getFilterIndex = (column: string): string => {
        const index = columnsToSort.findIndex(o => o.column === column);
        if (index === -1) {
            return " OFF";
        }
        return columnsToSort[index].order ? " DESC" : " ASC";
    }

    return <div style={{
        display: "inline",
        position: "absolute",
        background: "whitesmoke"
    }}>
        <ul>
            {COLUMNS.map(item => <li key={item.name}>
                <span onClick={() => changeSortingDirection(item.name)}>{item.display}{getFilterIndex(item.name)} </span><span onClick={() => deleteSorting(item.name)}>X</span>
            </li>)}
        </ul>
    </div>
}

export default SortFilter;