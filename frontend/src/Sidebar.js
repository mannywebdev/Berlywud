import React,{useState} from 'react'
import './Sidebar.css'
import {useSelector} from 'react-redux'


function Sidebar() {
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

    return (
        <div className="sidebar">
            <h4>FILTERS</h4>
            <div className="sidebar__gender">
                <label><input type="radio" id="male" name="gender" value="male"/>Men</label>
                <label><input type="radio" id="female" name="gender" value="female"/>Female</label>
            </div>
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
                <label><input type="checkbox"/> Rs. 99 to Rs. 2499</label>
                <label><input type="checkbox"/> Rs. 2500 to Rs. 4999</label>
                <label><input type="checkbox"/> Rs. 5000 to Rs. 7499</label>
                <label><input type="checkbox"/> Rs. 7500 to Rs. 9999</label>
            </div>
        </div>
    )
}

export default Sidebar
