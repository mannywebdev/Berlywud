import React, { useEffect,useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams , useHistory, Link} from 'react-router-dom';
import { allProductsLoad } from './redux/actions/allProductsActions';
import Product from './Product';
import Loadingmsg from './Loadingmsg'
import Errormsg from './Errormsg'
import Rating from './Rating'
import { prices,ratings } from './utils'
import './Searchscreen.css'
import { AiOutlinePlus } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";

export default function Searchscreen(props) {
  const { name = 'all' , category = 'all' , min = 0, max = 0,rating = 0 , order = 'newest', pageNumber = 1 } = useParams();
  const dispatch = useDispatch();
  const  AllProducts= useSelector(state => state.AllProducts)
  const {loading,error,allProducts,pages,page} = AllProducts
  const history = useHistory()

  const [brands,setBrands] = useState([])
  const [isFilterOpen,setIsFilterOpen] = useState(false)
  console.log(`isFilterOpen`, isFilterOpen)

 
  const getFilterUrl = (filter) =>{
      console.log(`pageNumber`, pageNumber)
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category
    const filterName = filter.name || name
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    const sortOrder = filter.order || order;
    const filterRating = filter.rating || rating
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`
  }

  const productCategoryList = useSelector((state) => state.ProductCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

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
//    const filteredProducts = allProducts.filter((item)=>{
//         if(item.brand === brands.map(item=>item)){
//             return item
//         }
//    })
//     console.log("fdsg",filteredProducts)
  
  useEffect(() => {
    dispatch(allProductsLoad({ pageNumber, name: name !== 'all' ? name : '' , category: category !== 'all' ? category : '' , min, max ,rating,order }))
  }, [dispatch,name,category,min,max,rating,order,pageNumber])

  return (
    <div className="home">
            {
                loading ? (
                    <Loadingmsg/>  
                ): error ? (
                    <Errormsg>{error}</Errormsg>
                ):(
                    <>
                    <div className="sort__filter">
                        <div>
                            <p className="searchscreen__productcount">{allProducts.length} RESULTS</p>
                            <div className="hamburger__cancel" >
                                <button className="color__button" onClick={()=>setIsFilterOpen(true)}>Filters</button>
                            </div>
                        </div>
                        <div className="sort__filter__sortby">
                            Sort by{' '}
                            <select
                                value={order}
                                onChange={(e) => {
                                    history.push(getFilterUrl({order : e.target.value}))
                                }}
                            >
                                <option value="newest">Newest Arrivals</option>
                                <option value="lowest">Price: Low to High</option>
                                <option value="highest">Price: High to Low</option>
                                <option value="toprated">Avg. Customer Reviews</option>
                            </select>        
                        </div>
                    </div>
                    <div className="home__page">
                        <div className="home__sidebar">
                            <div className="sidebar">
                                <h4>FILTERS</h4>
                                    {loadingCategories ? (
                                    <Loadingmsg/>  
                                    ) : errorCategories ? (
                                        <Errormsg>{errorCategories}</Errormsg>
                                    ) : (
                                        <div className="sidebar__gender">
                                            <p>
                                                <Link className={"all" === category ? "active link capitalize" : "link capitalize"} to={getFilterUrl({category: 'all'})}>Any</Link>
                                            </p>
                                            {
                                                categories.map(c =>(
                                                    <p key={c}>
                                                        <Link className={c === category ? "active link capitalize" : "link capitalize"} to={getFilterUrl({category: c})}>{c}</Link>
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
                                        className={`${p.min}-${p.max}` === `${min}-${max}` ? 'active link capitalize' : 'link capitalize'}
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
                                        className={`${r.rating}` === `${rating}` ? 'active' : ''}
                                    >
                                        <Rating caption ={" & Up"} rating={r.rating}/>
                                    </Link>
                                    </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="home__container">
                            {allProducts.map((item)=> {
                                return <Product key={item._id} prop={item}/>
                            })}
                        </div>
                    </div>
                    <div className="pagination">
                        {[...Array(pages).keys()].map((x) => (
                            <Link
                                className={x + 1 === page ? 'link active' : 'link'}
                                key={x + 1}
                                to={getFilterUrl({page : x+1})}
                            >
                            {x + 1}
                            </Link>    
                        ))}
                    </div>
                    <aside className={isFilterOpen ? 'search__screen__asidefilter open' : 'search__screen__asidefilter'}>
                            <div className="sort__by">
                                <h4>Shop By</h4>
                                <ImCancelCircle onClick={()=>setIsFilterOpen(false)}/>
                            </div>
                            <div className="sidebar">
                                <h4>FILTERS</h4>
                                    {loadingCategories ? (
                                    <Loadingmsg/>  
                                    ) : errorCategories ? (
                                        <Errormsg>{errorCategories}</Errormsg>
                                    ) : (
                                        <div className="sidebar__gender">
                                            <p>
                                                <Link className={"all" === category ? "active link capitalize" : "link capitalize"} to={getFilterUrl({category: 'all'})} onClick={()=>setIsFilterOpen(false)}>Any</Link>
                                            </p>
                                            {
                                                categories.map(c =>(
                                                    <p key={c}>
                                                        <Link className={c === category ? "active link capitalize" : "link capitalize"} to={getFilterUrl({category: c})}  onClick={()=>setIsFilterOpen(false)}>{c}</Link>
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
                                        onClick={()=>setIsFilterOpen(false)}
                                        className={`${p.min}-${p.max}` === `${min}-${max}` ? 'active link capitalize' : 'link capitalize'}
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
                                        onClick={()=>setIsFilterOpen(false)}
                                        className={`${r.rating}` === `${rating}` ? 'active' : ''}
                                    >
                                        <Rating caption ={" & Up"} rating={r.rating}/>
                                    </Link>
                                    </p>
                                    ))}
                                </div>
                            </div>
                    </aside>
                    </>
                )
            }
            
    </div>
  );
}