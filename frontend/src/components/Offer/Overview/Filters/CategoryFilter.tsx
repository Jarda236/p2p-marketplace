import React, {FC} from "react";

interface CategoryFilterProps {
    categoriesToFilter: string[],
    changeCategoriesToFilter: React.Dispatch<React.SetStateAction<string[]>>,
    categories: string[] | undefined,

}

const CategoryFilter:FC<CategoryFilterProps> = ({categoriesToFilter, changeCategoriesToFilter, categories}) => {
    const toggleCategory = (category: string) => {
        const index = categoriesToFilter.findIndex(c => c === category);
        if (index === -1) {
            changeCategoriesToFilter([...categoriesToFilter, category]);
        } else {
            changeCategoriesToFilter(categoriesToFilter.filter(c => c !== category));
        }
    }

    return <div style={{
        display: "inline",
        position: "absolute",
        background: "whitesmoke"
    }}>
        <ul>
            {categories ? categories.map(category => <li key={category}>
                <p onClick={() => toggleCategory(category)}>{category}</p>
            </li>) : "Loading..."}
        </ul>
    </div>
}

export default CategoryFilter;