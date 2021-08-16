import React,{useEffect} from 'react'
import "./Home.css"
import Product from "./Product"
import {useDispatch,useSelector} from 'react-redux'
import Sidebar from "./Sidebar"
import Loadingmsg from './Loadingmsg'
import Errormsg from './Errormsg'
import {allProductsLoad} from './redux/actions/allProductsActions'

function Home() {

    const dispatch = useDispatch()
    const  AllProducts= useSelector(state => state.AllProducts)
    const {loading,error,allProducts} = AllProducts
   
    useEffect(()=>{
        dispatch(allProductsLoad({}))
    },[dispatch])

    

    return (
        <div className="home">
            {
                loading ? (
                    <Loadingmsg/> 
                ): error ? (
                    <Errormsg>{error}</Errormsg>
                ):(
                    <>
                    <h3>OUR PRODUCTS</h3>
                    <div className="home__page">
                        <div className="home__sidebar">
                            <Sidebar/>
                        </div>
                        <div className="home__container">
                            {allProducts.map((item)=> {
                                return <Product key={item._id} prop={item}/>
                            })}
                        </div>
                    </div>
                    </>
                )
            }
            
        </div>
    )
}

export default Home
