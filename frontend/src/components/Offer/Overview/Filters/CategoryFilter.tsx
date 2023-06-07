import React, {FC} from "react";

interface CategoryFilterProps {
    toggleCategory: (category: string) => boolean
    categories: string[] | undefined,

}

const CategoryFilter:FC<CategoryFilterProps> = ({toggleCategory, categories}) => {

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