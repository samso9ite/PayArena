import React from 'react'
import './search.css'
import { SearchIcon } from '../../../assets'

const Search = ({
    onSearchFunc,
}: {
    onSearchFunc: React.ChangeEventHandler<HTMLInputElement> | undefined
}) => {
    return (
        <div className="position-relative">
            <input
                onChange={onSearchFunc}
                className="app-form-search-input pr-2 pl-2 mr-sm-2"
                type="search"
                placeholder="Search for a brand/product/category"
                aria-label="Search"
            />
            <div className="app-form-input-container position-absolute">
                <SearchIcon />
            </div>
            {/* </form> */}
            {/* </nav> */}
        </div>
    )
}

export default Search
