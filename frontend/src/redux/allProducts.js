export function allProducts(item){
    return{
        type:"ALL_PRODUCTS",
        payload:item,
    }
}
export default function allProductsReducer(AllProducts=[],action){
    switch(action.type){
        case "ALL_PRODUCTS":
            return [...action.payload]
        default:
            return AllProducts
    }
}
