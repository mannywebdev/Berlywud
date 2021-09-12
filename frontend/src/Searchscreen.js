import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { allProductsLoad } from './redux/actions/allProductsActions';
import Product from './Product';
import Sidebar from "./Sidebar"
import Loadingmsg from './Loadingmsg'
import Errormsg from './Errormsg'

export default function Searchscreen(props) {
  const { name = 'all' , category = 'all' , min = 0, max = 0 } = useParams();
  const dispatch = useDispatch();
  const  AllProducts= useSelector(state => state.AllProducts)
  const {loading,error,allProducts} = AllProducts

  const productCategoryList = useSelector((state) => state.ProductCategoryList);
  
  useEffect(() => {
    dispatch(allProductsLoad({ name: name !== 'all' ? name : '' , category: category !== 'all' ? category : '' , min, max }))
  }, [dispatch,name,category,min,max])

  return (
    <div className="home">
            {
                loading ? (
                    <Loadingmsg/>  
                ): error ? (
                    <Errormsg>{error}</Errormsg>
                ):(
                    <>
                    <p>{allProducts.length} RESULTS</p>
                    <div className="home__page">
                        <div className="home__sidebar">
                            <Sidebar filters={category,name,min,max} productCategoryList={productCategoryList} />
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
  );
}