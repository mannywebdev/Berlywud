import React,{useEffect} from 'react'
import "./Home.css"
import Product from "./Product"
import {useDispatch,useSelector} from 'react-redux'
import { allProducts } from './redux/allProducts'
import Sidebar from "./Sidebar"

function Home() {

    const dispatch = useDispatch()
    useEffect(() => {
        const url = "https://raw.githubusercontent.com/mannywebdev/Burlywud/master/src/product.json";
            fetch(url)
                .then(res => res.json())
                .then(data => dispatch(allProducts(data)))
                
    },[])
    const  {AllProducts}= useSelector(state => state)
    
    const productitem  = AllProducts.map((item)=> {
        return <Product key={item.id} prop={item}/>
    })
    console.log("ProductItems",productitem)
    
    return (
        <div className="home">
            <h3>OUR PRODUCTS</h3>
            <div className="home__page">
                <div className="home__sidebar">
                    <Sidebar/>
                </div>
                <div className="home__container">
                    {productitem}
                </div>
            </div>
        </div>
            
        
    )
}

export default Home
