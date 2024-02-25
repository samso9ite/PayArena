import React from 'react'
import './perks-search.css'
import Search from '../../form/search/Search'
import Favourite from '../favourite/Favourite'
import { useNavigate } from 'react-router-dom'

const PerksSearch = ({
    onSearchFunc,
}: {
    onSearchFunc?: React.ChangeEventHandler<HTMLInputElement> | undefined
}) => {
    const navigate = useNavigate()
    const handleFavourite = () => {
        navigate('/Perks-And-Discount-Favorite')
    }
    return (
        <div className="d-flex border-bottom border-dark justify-content-between align-items-center mt-4 pt-2 perks-discount-search-container">
            <div className="align-self-start">
                <div className="search-perks-title">Perks & Discount</div>
                <p className="search-perks-sub-title mt-2">
                    Enjoy discounts on products by purchasing on Prembly
                </p>
            </div>

            <div className="perks-search-search-fav-container d-flex align-items-center">
                <Search onSearchFunc={onSearchFunc} />
                <Favourite onClick={handleFavourite} />
            </div>
        </div>
    )
}

export default PerksSearch
