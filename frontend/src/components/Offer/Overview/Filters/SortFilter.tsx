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

    const getColumnsSortOrder = (column: string): string => {
        const index = columnsToSort.findIndex(o => o.column === column);
        if (index === -1) {
            return " ☒"; // OFF
        }
        return columnsToSort[index].order ? " ▼" : " ▲"; // DESC : ASC
    }

    const getSortsOrder = (column: string): string => {
        const index = columnsToSort.findIndex(c => c.column === column);
        return index === -1 ? " " : (index + 1).toString();
    }

    return ( 
    <div className=" inline absolute bg-slate-200 z-10 mt-6 rounded-md shadow-lg">
        <ul>
            {COLUMNS.map(item =>
            <li key={item.name}
            className=" px-1 py-1 flex justify-between">
                <span onClick={() => changeSortingDirection(item.name)}
                className=" hover:cursor-pointer mr-1">
                    {item.display}{getColumnsSortOrder(item.name)}
                </span>
                <span>
                    {getSortsOrder(item.name)}
                </span>
                <span onClick={() => deleteSorting(item.name)}
                className=" hover:cursor-pointer">
                    ✖
                </span>
            </li>)}
            <li>
                <span onClick={() => changeColumnsToSort([])}
                      className=" hover:cursor-pointer">
                    ✖
                </span>
            </li>
        </ul>
    </div>
    );
}

export default SortFilter;