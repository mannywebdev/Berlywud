import React,{useState} from 'react'
import './Sidebar.css'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import Loadingmsg from './Loadingmsg'
import Errormsg from './Errormsg'
import { prices,ratings } from './utils'
import Rating from './Rating'


const Sidebar = React.forwardRef((props, ref) => {
    console.log(`props.filters`, props.category)
    console.log(`props.productCategoryList`, props.productCategoryList)

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
        console.log(`filter.page`, filter.page)
        const filterPage = filter.page || props.pageNumber;
        const filterCategory = filter.category || props.category
        const filterName = filter.name || props.name
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : props.min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : props.max;
        // const sortOrder = filter.order || props.order;
        const filterRating = filter.rating || props.rating
        return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/pageNumber/${filterPage}`
    }

    React.useImperativeHandle(ref, () => ({
        getFilterUrl
    }))

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
                        <p>
                            <Link className={"all" === props.category ? "active link capitalize" : "link capitalize"} to={getFilterUrl({category: 'all'})}>Any</Link>
                        </p>
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
                {prices.map((p) => (
                <p key={p.name}>
                  <Link
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    className={`${p.min}-${p.max}` === `${props.min}-${props.max}` ? 'active link capitalize' : 'link capitalize'}
                  >
                    {p.name}
                  </Link>
                </p>
              ))}
            </div>
            <h5>Avg. Customer Rating</h5>
            <div className="sidebar__rating">
                {ratings.map((r) => (
                <p key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${props.rating}` ? 'active' : ''}
                  >
                    <Rating caption ={" & Up"} rating={r.rating}/>
                  </Link>
                </p>
                ))}
            </div>
        </div>
    )
})

export default Sidebar