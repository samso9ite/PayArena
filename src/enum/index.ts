export interface ElementProps {
    userRights: any
    permissionKey: string
    changeLoadingState: (e: boolean) => void
}

export interface PerksDiscountCardParams {
    product_name: string
    image_url: string
    discount_price: string | number
    description: string
    is_favorite: boolean
    id: string
}
