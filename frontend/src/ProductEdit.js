import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProductEdit.css'
import { productDetails, updateProduct } from './redux/actions/allProductsActions';
import TextField from '@material-ui/core/TextField';
import Errormsg from './Errormsg'
import Loadingmsg from './Loadingmsg'
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


export default function ProductEdit(props) {
  
  const {productId} = useParams() 
  const classes = useStyles();

  const [brand, setBrand] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [origprice, setOrigprice] = useState('');
  const [gender, setGender] = useState('');
  const [launch, setLaunch] = useState('');
  const [concentration, setConcentration] = useState('');
  const [rating, setRating] = useState('');
  const [reviews, setReviews] = useState('');
  const [stockcount, setStockcount] = useState('');
  const [twoml,setTwoml] = useState('');
  const [fiveml,setFiveml] = useState('');
  const [tenml,setTenml] = useState('');
  const [thirtyml,setThirtyml] = useState('');
  const [retail,setRetail] = useState('');
  const [topnote1, setTopnote1] = useState('');
  const [topnote2, setTopnote2] = useState('');
  const [topnote3, setTopnote3] = useState('');
  const [middlenote1, setMiddlenote1] = useState('');
  const [middlenote2, setMiddlenote2] = useState('');
  const [middlenote3, setMiddlenote3] = useState('');
  const [basenote1, setBasenote1] = useState('');
  const [basenote2, setBasenote2] = useState('');
  const [basenote3, setBasenote3] = useState('');

  const ProductDetails = useSelector((state) => state.ProductDetails);
  const { loading, error, product } = ProductDetails;
  console.log(`product`, product)
  const dispatch = useDispatch();
  useEffect(() => {
    if (!product || product._id !== productId) {
      dispatch(productDetails(productId));
    } else {
        setBrand(product.brand);
        setTitle(product.title);
        setUrl(product.url);
        setDescription(product.description);
        setOrigprice(product.origprice);
        setGender(product.gender);
        setLaunch(product.launch);
        setConcentration(product.concentration);
        setRating(product.rating);
        setReviews(product.reviews);
        setStockcount(product.stockcount);
        setTwoml(product.decantprice["2ml"])
        setFiveml(product.decantprice["5ml"])
        setTenml(product.decantprice["10ml"])
        setThirtyml(product.decantprice["30ml"])
        setRetail(product.decantprice["Retail"])
        setTopnote1(product.notes.Topnotes[0])
        setTopnote2(product.notes.Topnotes[1])
        setTopnote3(product.notes.Topnotes[2])
        setMiddlenote1(product.notes.Middlenotes[0])
        setMiddlenote2(product.notes.Middlenotes[1])
        setMiddlenote3(product.notes.Middlenotes[2])
        setBasenote1(product.notes.Basenotes[0])
        setBasenote2(product.notes.Basenotes[1])
        setBasenote3(product.notes.Basenotes[2])
    }
  }, [product, dispatch, productId]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(updateProduct({_id:productId, brand, title, url, description, origprice, gender, launch, concentration, rating, reviews, stockcount, twoml, fiveml, tenml, thirtyml, retail, topnote1, topnote2, topnote3, middlenote1, middlenote2, middlenote3, basenote1, basenote2, basenote3}))
  };
  return (
    <div className="productedit">
      <div className="productlist__header">
        <h2 style={{color:"black"}}>Edit Product {productId}</h2>
        <div className="pink__button">
          <Button className="pink__button" >
            Update Product
          </Button>
        </div>
      </div>
      <form className={classes.root} noValidate autoComplete="off"  onSubmit={submitHandler}>
        {loading ? (
        <Loadingmsg/>
      ) : error ? (
        <Errormsg variant="danger">{error}</Errormsg>
      ) : (
          <>
            <TextField 
                id="outlined-basic"
                label="Brand"
                color="secondary"
                variant="outlined"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
            />
            <TextField 
                id="outlined-basic"
                label="Title"
                color="secondary"
                variant="outlined"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
                id="outlined-basic"
                required
                variant="outlined"
                label="Gender"
                value={gender}
                color="secondary"
                onChange={(e) => setGender(e.target.value)}
            />
            <TextField
                id="outlined-basic"
                required
                variant="outlined"
                label="Launch Date"
                value={launch}
                color="secondary"
                onChange={(e) => setLaunch(e.target.value)}
            />
            <TextField
                id="outlined-basic"
                required
                variant="outlined"
                label="Concentration"
                value={concentration}
                color="secondary"
                onChange={(e) => setConcentration(e.target.value)}
            />
            <TextField
                id="outlined-basic"
                required
                variant="outlined"
                label="Stock Count"
                value={stockcount}
                color="secondary"
                onChange={(e) => setStockcount(e.target.value)}
            />
            <TextField 
                id="outlined-basic" 
                label="Image Url"
                color="secondary"
                variant="outlined"
                fullWidth
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            
            <TextField 
                id="outlined-multiline-static"
                label="Description"
                color="secondary"
                multiline
                fullWidth
                rows={4}
                variant="outlined"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <div>
                <h3>Notes</h3>
            </div>
            <TextField 
                id="outlined-basic"
                label="Topnote1"
                color="secondary"
                variant="outlined"
                required
                value={topnote1}
                onChange={(e) => setTopnote1(e.target.value)}
            />
            <TextField 
                id="outlined-basic"
                label="Topnote2"
                color="secondary"
                variant="outlined"
                required
                value={topnote2}
                onChange={(e) => setTopnote2(e.target.value)}
            />
            <TextField 
                id="outlined-basic"
                label="Topnote3"
                color="secondary"
                variant="outlined"
                required
                value={topnote3}
                onChange={(e) => setTopnote3(e.target.value)}
            />
            <br/>
            <TextField 
                id="outlined-basic"
                label="Middlenote 1"
                color="secondary"
                variant="outlined"
                required
                value={middlenote1}
                onChange={(e) => setMiddlenote1(e.target.value)}
            />
            <TextField 
                id="outlined-basic"
                label="Middlenote2"
                color="secondary"
                variant="outlined"
                required
                value={middlenote2}
                onChange={(e) => setMiddlenote2(e.target.value)}
            />
            <TextField 
                id="outlined-basic"
                label="Middlenote3"
                color="secondary"
                variant="outlined"
                required
                value={middlenote3}
                onChange={(e) => setMiddlenote3(e.target.value)}
            />
            <br/>
            <TextField 
                id="outlined-basic"
                label="Basenote 1"
                color="secondary"
                variant="outlined"
                required
                value={basenote1}
                onChange={(e) => setBasenote1(e.target.value)}
            />
            <TextField 
                id="outlined-basic"
                label="Basenote2"
                color="secondary"
                variant="outlined"
                required
                value={basenote2}
                onChange={(e) => setBasenote2(e.target.value)}
            />
            <TextField 
                id="outlined-basic"
                label="Basenote3"
                color="secondary"
                variant="outlined"
                required
                value={basenote3}
                onChange={(e) => setBasenote3(e.target.value)}
            />
            <div>
                <h3>Price</h3>
            </div>
            <TextField 
                id="outlined-basic"
                label="Retail disconted price"
                color="secondary"
                variant="outlined"
                required
                value={retail}
                onChange={(e) => setRetail(e.target.value)}
            />
            <TextField 
                id="outlined-basic"
                label="2ml price"
                color="secondary"
                variant="outlined"
                required
                value={twoml}
                onChange={(e) => setTwoml(e.target.value)}
            />
            <TextField 
                id="outlined-basic"
                label="5ml Price"
                color="secondary"
                variant="outlined"
                required
                value={fiveml}
                onChange={(e) => setFiveml(e.target.value)}
            />
            <TextField 
                id="outlined-basic"
                label="10ml price"
                color="secondary"
                variant="outlined"
                required
                value={tenml}
                onChange={(e) => setTenml(e.target.value)}
            />
            <TextField 
                id="outlined-basic"
                label="30ml price"
                color="secondary"
                variant="outlined"
                required
                value={thirtyml}
                onChange={(e) => setThirtyml(e.target.value)}
            />
            <TextField 
                id="outlined-basic"
                label="Retail Price"
                color="secondary"
                variant="outlined"
                required
                value={origprice}
                onChange={(e) => setOrigprice(e.target.value)}
            />
            <div>
                <h3>Rating</h3>
            </div>
            <TextField 
                id="outlined-basic"
                label="Rating"
                color="secondary"
                variant="outlined"
                required
                value={rating}
                onChange={(e) => setRating(e.target.value)}
            />
            <div>
                <h3>Reviews</h3>
            </div>
            <TextField 
                id="outlined-basic"
                label="Retail Price"
                color="secondary"
                variant="outlined"
                required
                value={reviews}
                onChange={(e) => setReviews(e.target.value)}
            />
          </>
        )}
      </form>
    </div>
  );
}