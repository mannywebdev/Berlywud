import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProductEdit.css'
import { productDetails, updateProduct } from './redux/actions/allProductsActions';
import TextField from '@material-ui/core/TextField';
import Errormsg from './Errormsg'
import Loadingmsg from './Loadingmsg'
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { PRODUCT_UPDATE_RESET } from './redux/constants/allProductConstants';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


export default function ProductEdit(props) {
  
  const {productId} = useParams() 
  const history = useHistory()
  const classes = useStyles();

  const [brand, setBrand] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [url3, setUrl3] = useState('');
  const [url4, setUrl4] = useState('');
  const [url5, setUrl5] = useState('');
  const [url6, setUrl6] = useState('');
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

  const productUpdate = useSelector((state) => state.ProductUpdate);
  const {loading: loadingUpdate,error: errorUpdate,success: successUpdate,} = productUpdate;

  console.log(`product`, product)
  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
        history.push('/productlist');
    }
    if (!product || product._id !== productId || successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET });
        dispatch(productDetails(productId));
    } else {
        setBrand(product.brand);
        setTitle(product.title);
        setUrl(product.url[0]);
        setUrl1(product.url[1]);
        setUrl2(product.url[2]);
        setUrl3(product.url[3]);
        setUrl4(product.url[4]);
        setUrl5(product.url[5]);
        setUrl6(product.url[6]);
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
  }, [product, dispatch, productId, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(updateProduct({_id:productId, brand, title, url, url1, url2 ,url3,url4 ,url5 ,url6 ,description, origprice, gender, launch, concentration, rating, reviews, stockcount, twoml, fiveml, tenml, thirtyml, retail, topnote1, topnote2, topnote3, middlenote1, middlenote2, middlenote3, basenote1, basenote2, basenote3}))
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');
  const [loadingUpload1, setLoadingUpload1] = useState(false);
  const [errorUpload1, setErrorUpload1] = useState('');
  const [loadingUpload2, setLoadingUpload2] = useState(false);
  const [errorUpload2, setErrorUpload2] = useState('');
  const [loadingUpload3, setLoadingUpload3] = useState(false);
  const [errorUpload3, setErrorUpload3] = useState('');
  const [loadingUpload4, setLoadingUpload4] = useState(false);
  const [errorUpload4, setErrorUpload4] = useState('');
  const [loadingUpload5, setLoadingUpload5] = useState(false);
  const [errorUpload5, setErrorUpload5] = useState('');
  const [loadingUpload6, setLoadingUpload6] = useState(false);
  const [errorUpload6, setErrorUpload6] = useState('');

  const userSignin = useSelector((state) => state.UserSignin);
  const { userInfo } = userSignin;

  // const uploadFileHandler = async (e) => {
  //   const file = e.target.files[0];
  //   const bodyFormData = new FormData();
  //   bodyFormData.append('image', file);
  //   setLoadingUpload(true);
  //   try {
  //     const { data } = await axios.post('https://api.berlywud.com/api/uploads/s3', bodyFormData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         Authorization: `Bearer ${userInfo.token}`,
  //       },
  //     });
  //     setUrl(data);
  //     setLoadingUpload(false);
  //   } catch (error) {
  //     setErrorUpload(error.message);
  //     setLoadingUpload(false);
  //   }
  // };
  return (
    <div className="productedit">
      <div className="productlist__header">
        <h2 style={{color:"black"}}>Edit Product {productId}</h2>
      </div>
      <form className={classes.root} noValidate autoComplete="off"  onSubmit={submitHandler}>
        <div className="pink__button">
          <button className="pink__button" type="submit">
            Update Product
          </button>
        </div>
        {loadingUpdate &&  <Loadingmsg/>}
        {errorUpdate && <Errormsg variant="danger">{error}</Errormsg>}
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

            {/* Main Image */}
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
            <div>
              <input
                className="inputfieldtext"
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={
                   async (e) => {
                    const file = e.target.files[0];
                    const bodyFormData = new FormData();
                    bodyFormData.append('image', file);
                    setLoadingUpload(true);
                    try {
                      const { data } = await axios.post('https://api.berlywud.com/api/uploads/s3', bodyFormData, {
                        headers: {
                          'Content-Type': 'multipart/form-data',
                          Authorization: `Bearer ${userInfo.token}`,
                        },
                      });
                      setUrl(data);
                      setLoadingUpload(false);
                    } catch (error) {
                      setErrorUpload(error.message);
                      setLoadingUpload(false);
                    }
                  }
                }
              ></input>
              {loadingUpload && <Loadingmsg/>}
              {errorUpload && (
                <Errormsg variant="danger">{errorUpload}</Errormsg>
              )}
            </div>

            {/* Image 1 */}
            <TextField 
                id="outlined-basic" 
                label="Image Url"
                color="secondary"
                variant="outlined"
                fullWidth
                required
                value={url1}
                onChange={(e) => setUrl1(e.target.value)}
            />
            <div>
              <input
                className="inputfieldtext"
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={
                  async (e) => {
                    const file = e.target.files[0];
                    const bodyFormData = new FormData();
                    bodyFormData.append('image', file);
                    setLoadingUpload1(true);
                    try {
                      const { data } = await axios.post('https://api.berlywud.com/api/uploads/s3', bodyFormData, {
                        headers: {
                          'Content-Type': 'multipart/form-data',
                          Authorization: `Bearer ${userInfo.token}`,
                        },
                      });
                      setUrl1(data);
                      setLoadingUpload1(false);
                    } catch (error) {
                      setErrorUpload1(error.message);
                      setLoadingUpload1(false);
                    }
                  }
                }
              ></input>
              {loadingUpload1 && <Loadingmsg/>}
              {errorUpload1 && (
                <Errormsg variant="danger">{errorUpload1}</Errormsg>
              )}
            </div>

            {/* Image 2 */}
            <TextField 
                id="outlined-basic" 
                label="Image Url"
                color="secondary"
                variant="outlined"
                fullWidth
                required
                value={url2}
                onChange={(e) => setUrl2(e.target.value)}
            />
            <div>
              <input
                className="inputfieldtext"
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={
                  async (e) => {
                    const file = e.target.files[0];
                    const bodyFormData = new FormData();
                    bodyFormData.append('image', file);
                    setLoadingUpload2(true);
                    try {
                      const { data } = await axios.post('https://api.berlywud.com/api/uploads/s3', bodyFormData, {
                        headers: {
                          'Content-Type': 'multipart/form-data',
                          Authorization: `Bearer ${userInfo.token}`,
                        },
                      });
                      setUrl2(data);
                      setLoadingUpload2(false);
                    } catch (error) {
                      setErrorUpload2(error.message);
                      setLoadingUpload2(false);
                    }
                  }
                }
              ></input>
              {loadingUpload2 && <Loadingmsg/>}
              {errorUpload2 && (
                <Errormsg variant="danger">{errorUpload2}</Errormsg>
              )}
            </div>

            {/* Image 3 */}
            <TextField 
                id="outlined-basic" 
                label="Image Url"
                color="secondary"
                variant="outlined"
                fullWidth
                required
                value={url3}
                onChange={(e) => setUrl3(e.target.value)}
            />
            <div>
              <input
                className="inputfieldtext"
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={
                  async (e) => {
                    const file = e.target.files[0];
                    const bodyFormData = new FormData();
                    bodyFormData.append('image', file);
                    setLoadingUpload3(true);
                    try {
                      const { data } = await axios.post('https://api.berlywud.com/api/uploads/s3', bodyFormData, {
                        headers: {
                          'Content-Type': 'multipart/form-data',
                          Authorization: `Bearer ${userInfo.token}`,
                        },
                      });
                      setUrl3(data);
                      setLoadingUpload3(false);
                    } catch (error) {
                      setErrorUpload3(error.message);
                      setLoadingUpload3(false);
                    }
                  }
                }
              ></input>
              {loadingUpload3 && <Loadingmsg/>}
              {errorUpload3 && (
                <Errormsg variant="danger">{errorUpload3}</Errormsg>
              )}
            </div>

            {/* Image 4 */}
            <TextField 
                id="outlined-basic" 
                label="Image Url"
                color="secondary"
                variant="outlined"
                fullWidth
                required
                value={url4}
                onChange={(e) => setUrl4(e.target.value)}
            />
            <div>
              <input
                className="inputfieldtext"
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={
                  async (e) => {
                    const file = e.target.files[0];
                    const bodyFormData = new FormData();
                    bodyFormData.append('image', file);
                    setLoadingUpload4(true);
                    try {
                      const { data } = await axios.post('https://api.berlywud.com/api/uploads/s3', bodyFormData, {
                        headers: {
                          'Content-Type': 'multipart/form-data',
                          Authorization: `Bearer ${userInfo.token}`,
                        },
                      });
                      setUrl4(data);
                      setLoadingUpload4(false);
                    } catch (error) {
                      setErrorUpload4(error.message);
                      setLoadingUpload4(false);
                    }
                  }
                }
              ></input>
              {loadingUpload4 && <Loadingmsg/>}
              {errorUpload4 && (
                <Errormsg variant="danger">{errorUpload4}</Errormsg>
              )}
            </div>

            {/* Image 5 */}
            <TextField 
                id="outlined-basic" 
                label="Image Url"
                color="secondary"
                variant="outlined"
                fullWidth
                required
                value={url5}
                onChange={(e) => setUrl5(e.target.value)}
            />
            <div>
              <input
                className="inputfieldtext"
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={
                  async (e) => {
                    const file = e.target.files[0];
                    const bodyFormData = new FormData();
                    bodyFormData.append('image', file);
                    setLoadingUpload5(true);
                    try {
                      const { data } = await axios.post('https://api.berlywud.com/api/uploads/s3', bodyFormData, {
                        headers: {
                          'Content-Type': 'multipart/form-data',
                          Authorization: `Bearer ${userInfo.token}`,
                        },
                      });
                      setUrl5(data);
                      setLoadingUpload5(false);
                    } catch (error) {
                      setErrorUpload5(error.message);
                      setLoadingUpload5(false);
                    }
                  }
                }
              ></input>
              {loadingUpload5 && <Loadingmsg/>}
              {errorUpload5 && (
                <Errormsg variant="danger">{errorUpload5}</Errormsg>
              )}
            </div>

            {/* Image 6 */}
            <TextField 
                id="outlined-basic" 
                label="Image Url"
                color="secondary"
                variant="outlined"
                fullWidth
                required
                value={url6}
                onChange={(e) => setUrl6(e.target.value)}
            />
            <div>
              <input
                className="inputfieldtext"
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={
                  async (e) => {
                    const file = e.target.files[0];
                    const bodyFormData = new FormData();
                    bodyFormData.append('image', file);
                    setLoadingUpload6(true);
                    try {
                      const { data } = await axios.post('https://api.berlywud.com/api/uploads/s3', bodyFormData, {
                        headers: {
                          'Content-Type': 'multipart/form-data',
                          Authorization: `Bearer ${userInfo.token}`,
                        },
                      });
                      setUrl(data);
                      setLoadingUpload6(false);
                    } catch (error) {
                      setErrorUpload6(error.message);
                      setLoadingUpload6(false);
                    }
                  }
                }
              ></input>
              {loadingUpload6 && <Loadingmsg/>}
              {errorUpload6 && (
                <Errormsg variant="danger">{errorUpload6}</Errormsg>
              )}
            </div>
            
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
            {/* <div>
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
            /> */}
          </>
        )}
      </form>
    </div>
  );
}