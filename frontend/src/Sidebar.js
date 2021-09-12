import React,{useState} from 'react'
import './Sidebar.css'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import Loadingmsg from './Loadingmsg'
import Errormsg from './Errormsg'
import { prices } from './utils'


function Sidebar(props) {
    console.log(`props.min`, props.min)
    console.log(`props.max`, props.max)

    const {loading: loadingCategories,error: errorCategories,categories} = props.productCategoryList;
    
    const AllProducts = useSelector(state => state.AllProducts) 
    const {allProducts} = AllProducts
   
   const [brands,setBrands] = useState([])
    
   function handleChange(event){
    const {checked,value} = event.target
    if(checked === true){
        setBrands(prevarr=> [...prevarr,value])
    }
    else if(checked === false){
        setBrands(prevarr => prevarr.filter((item)=> item !== value))
    }
   }
   
   console.log(brands)
   const filteredProducts = allProducts.filter((item)=>{
       if(item.brand === brands.map(item=>item)){
           return item
       }
   })
     console.log("fdsg",filteredProducts)

    const getFilterUrl = (filter) =>{
        const filterCategory = filter.category || props.category
        const filterName = filter.name || props.name
        return `/search/category/${filterCategory}/name/${filterName}`
    }

    return (
        <div className="sidebar">
            <h4>FILTERS</h4>
                {/* <label><input type="radio" id="male" name="gender" value="male"/>Men</label>
                <label><input type="radio" id="female" name="gender" value="female"/>Female</label> */}
                {loadingCategories ? (
                <Loadingmsg/>  
                ) : errorCategories ? (
                    <Errormsg>{errorCategories}</Errormsg>
                ) : (
                    <div className="sidebar__gender">
                    {
                        categories.map(c =>(
                            <p key={c}>
                                <Link className={c === props.category ? "active link capitalize" : "link capitalize"} to={getFilterUrl({category: c})}>{c}</Link>
                            </p>
                        ))
                    }
                    </div>
                )}
            <h5>BRANDS</h5>
            <div className="sidebar__brands">
                <label><input type="checkbox" value="Ajmal"  onChange={handleChange}/> Ajmal</label>
                <label><input type="checkbox" value="Bentley" onChange={handleChange}/> Bentley</label>
                <label><input type="checkbox" value="Bvlgari" onChange={handleChange}/> Bvlgari</label>
                <label><input type="checkbox" value="Giorgio Armani" onChange={handleChange}/> Giorgio Armani</label>
                <label><input type="checkbox" value="Ormonde Jayne" onChange={handleChange}/> Ormonde Jayne</label>
                <label><input type="checkbox" value="Prada" onChange={handleChange}/> Prada</label>
                <label><input type="checkbox" value="Versace" onChange={handleChange}/> Versace</label>
            </div>
            <h5>PRICE</h5>
            <div className="sidebar__price">
                {/* <label><input type="checkbox"/> Rs. 99 to Rs. 2499</label>
                <label><input type="checkbox"/> Rs. 2500 to Rs. 4999</label>
                <label><input type="checkbox"/> Rs. 5000 to Rs. 7499</label>
                <label><input type="checkbox"/> Rs. 7500 to Rs. 9999</label> */}
                {prices.map((p) => (
                <p key={p.name}>
                  {/* <Link
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    className={
                      `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''
                    }
                  >
                    {p.name}
                  </Link> */}
                </p>
              ))}
            </div>
        </div>
    )
}

export default Sidebar
