import React, {FC} from "react";

interface CategoryFilterProps {
    toggleCategory: (category: string) => boolean
    categories: string[] | undefined,
    selectedCategories: string[]
}

const CategoryFilter:FC<CategoryFilterProps> = ({toggleCategory, categories, selectedCategories}) => {

    return (
    <div className=" inline absolute bg-slate-200 z-10 mt-6 rounded-md shadow-lg">
        <ul>
            {categories ? categories.map(category =>
            <li key={category}
            className={" px-1 py-1 cursor-pointer".concat((selectedCategories.findIndex(c => c === category) === -1) ? "" : " bg-amber-300 rounded-md")}>
                <p onClick={() => toggleCategory(category)}>{category}</p>
            </li>) : "Loading..."}
        </ul>
    </div>
    );
}

export default CategoryFilter;