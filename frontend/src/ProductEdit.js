import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProductEdit.css'
import { productDetails } from './redux/actions/allProductsActions';
import TextField from '@material-ui/core/TextField';
import Errormsg from './Errormsg'
import Loadingmsg from './Loadingmsg'
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


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
  const [midddlenote1, setMiddlenote1] = useState('');
  const [midddlenote2, setMiddlenote2] = useState('');
  const [midddlenote3, setMiddlenote3] = useState('');
  const [basenote1, setBasenote1] = useState('');
  const [basenote2, setBasenote2] = useState('');
  const [basenote3, setBasenote3] = useState('');

  const ProductDetails = useSelector((state) => state.ProductDetails);
  const { loading, error, product } = productDetails;
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
  };
  return (
    <div className="productedit">
      <div>
        <h2 style={{color:"black"}}>Edit Product {productId}</h2>
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
                label="Image Url"
                color="secondary"
                variant="outlined"
                fullWidth
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <TextField 
                id="outlined-basic"
                label="Retail disconted price"
                color="secondary"
                variant="outlined"
                required
                value={origprice}
                onChange={(e) => setOrigprice(e.target.value)}
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
          </>
        )}
      </form>
    </div>
  );
}