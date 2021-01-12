export function addToBasket(item){
    return{
        type:"ADD_TO_BASKET",
        payload: item
    }
}

export function removeFromBasket(item){
    return{
        type:"REMOVE_FROM_BASKET",
        payload: item
    }
}

export const getBasketDiscTotal = Basket => Basket.reduce((accumulator,item)=> item.decantprice + accumulator,0)
export const getBasketOrigTotal = Basket => Basket.reduce((accumulator,item)=> item.origprice + accumulator,0)

export default function addToBasketReducer(Basket=[],action){
    switch(action.type){
        case "ADD_TO_BASKET":
            return [...Basket,action.payload]

        case "REMOVE_FROM_BASKET":
            const index = Basket.findIndex((item)=>item.id === action.payload.id)
            const newBasket =[...Basket]
            if(index>=0){
                newBasket.splice(index,1)
            }
            else{
                console.warn("can't remove product as it is not in basket")
            }
            return newBasket
        default:
            return Basket
    }
}
