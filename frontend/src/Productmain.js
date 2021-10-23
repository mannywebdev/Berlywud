import React,{useEffect, useState} from 'react'
import './Productmain.css'
import NotesRoundedIcon from '@material-ui/icons/NotesRounded';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link, useHistory, useParams} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import Button from '@material-ui/core/Button';
import Loadingmsg from './Loadingmsg'
import Errormsg from './Errormsg'
import {createReview, productDetails} from './redux/actions/allProductsActions'
import Carousel ,{CarouselItem} from './Carousel'
import { CgDetailsMore } from "react-icons/cg";
import Rating from './Rating';
import _ from 'lodash';
import { PRODUCT_REVIEW_CREATE_RESET } from './redux/constants/allProductConstants';

function Productmain() {
    const dispatch = useDispatch()

    const [ml,setMl]= useState("Retail")  //State management for the size of perfume
    console.log(ml)

    const {productId} = useParams() 
    const history = useHistory()

    const ProductDetails = useSelector(state => state.ProductDetails)   
    const {loading,error,product} = ProductDetails

    const userSignin = useSelector((state) => state.UserSignin);
    const { userInfo } = userSignin;

    const productReviewCreate = useSelector((state) => state.ProductReviewCreate);
    const {
        loading: loadingReviewCreate,
        error: errorReviewCreate,
        success: successReviewCreate,
    } = productReviewCreate;

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(()=>{
        if (successReviewCreate) {
            window.alert('Review Submitted Successfully');
            setRating('');
            setComment('');
            dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
        }
        dispatch(productDetails(productId))
    },[dispatch,productId,successReviewCreate])


    function changePrice(e){
        const {value} = e.target
        setMl(value)
    }

    function addToCart(){
        history.push(`/cart/${productId}?price=${product.decantprice[ml]}&size=${ml}`)
    } 

    const submitHandler = (e) => {
        e.preventDefault();
        if (comment && rating) {
          dispatch(
            createReview(productId, { rating, comment, name: userInfo.name })
          );
        } else {
          alert('Please enter comment and rating');
        }
      };
    return (
        <div>
            {
                loading ? (
                    <Loadingmsg/> 
                ): error ? (
                    <Errormsg>{error}</Errormsg>
                ):(
                    <div className="productmain">
                        <div className="productmain__img">
                            <img src={product.url} alt={product.title}/>
                            <img src={product.url} alt={product.title}/>
                            <img src={product.url} alt={product.title}/>
                            <img src={product.url} alt={product.title}/>
                        </div>
                        <div className="productmain__img__mob">
                            <Carousel>
                                <CarouselItem><img className="carouselitem__img_mob" src={product.url} alt={product.title}/></CarouselItem>
                                <CarouselItem><img className="carouselitem__img_mob" src={product.url} alt={product.title}/></CarouselItem>
                                <CarouselItem><img className="carouselitem__img_mob" src={product.url} alt={product.title}/></CarouselItem>
                                <CarouselItem><img className="carouselitem__img_mob" src={product.url} alt={product.title}/></CarouselItem>
                            </Carousel>
                        </div>
                        <div className="productmain__info">
                            <div className="brandtitle">
                                <h3>{product.brand}</h3>
                                <p>{product.title}</p>
                            </div>

                            {(ml==="2ml" || ml==="5ml"|| ml==="10ml"|| ml==="30ml")?  
                                (<div className="productmain__pricing">
                                    <span>Rs.{product.decantprice[ml]}</span>
                                    <p>inclusive of all taxes</p>
                                </div>) : 
                                (<div className="productmain__pricing">
                                    <span>Rs.{product.decantprice.Retail}&nbsp;<del>Rs.{product.origprice}</del> </span>
                                    <span className="discount">({Math.floor(100-((product.decantprice.Retail/product.origprice)*100))}% off)</span>
                                    <p>inclusive of all taxes</p>
                                </div>  
                                )
                            }
                            <div className="productmain__button">
                                <p>Select Size</p>
                                <button value="2ml" onClick={changePrice}>2ml</button>
                                <button value="5ml" onClick={changePrice}>5ml</button>
                                <button value="10ml" onClick={changePrice}>10ml</button>
                                <button value="30ml" onClick={changePrice}>30ml</button>
                                <button value="Retail" onClick={changePrice}>Retail</button>
                            </div>
                            <div className="productmain__buttonwidth">
                            {
                                product.stockcount > 0 && (
                                    <div className="pink__button">
                                        <Button variant="contained" onClick={addToCart} size="large" startIcon={<ShoppingCartIcon/>}>Add to Cart</Button>
                                    </div>
                                )
                            }
                            </div>
                            <div className="productmain__status">
                                <span>Status: </span>
                                {product.stockcount > 0 ? <span className="success">Instock</span> : <span className="error">Out of stock</span>}
                            </div>
                            <div className="productmain__productdetails">
                                <h3>PRODUCT DETAILS<CgDetailsMore/></h3>
                                <h4>Notes</h4>
                                <p>Topnotes: {product.notes.Topnotes.join(', ')}</p>
                                <p>Middlenotes: {product.notes.Middlenotes.join(', ')}</p>
                                <p>Basenotes: {product.notes.Basenotes.join(', ')}</p>
                                <h4>Description</h4>
                                <p>{product.description}</p>
                                <h4>Launch year</h4>
                                <p>{product.launch}</p>
                                <h4>Concentration</h4>
                                <p>{product.concentration}</p>
                            </div>
                            <div>
                                <h3 className="reviews">Reviews</h3>
                                {_.isEmpty(product.userreviews) && (
                                <Errormsg>There is no review.</Errormsg>
                                )}
                                <div>
                                { product.userreviews.map((review) => (
                                    <div key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating rating={review.ratings} caption= " "></Rating>
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>
                                    </div>
                                ))}
                                <div>
                                    {userInfo ? (
                                    <form className="productmain__form" onSubmit={submitHandler}>
                                        <div>
                                        <h2>Write a customer review</h2>
                                        </div>
                                        <div>
                                        <label htmlFor="rating">Rating</label>
                                        <select
                                            id="rating"
                                            value={rating}
                                            onChange={(e) => setRating(e.target.value)}
                                        >
                                            <option value="">Select...</option>
                                            <option value="1">1- Poor</option>
                                            <option value="2">2- Fair</option>
                                            <option value="3">3- Good</option>
                                            <option value="4">4- Very Good</option>
                                            <option value="5">5- Excellent</option>
                                        </select>
                                        </div>
                                        <div>
                                        <label htmlFor="comment">Comment</label>
                                        <textarea
                                            id="comment"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        ></textarea>
                                        </div>
                                        <div>
                                        <label />
                                        <button className="pinkButton" type="submit">
                                            Submit
                                        </button>
                                        </div>
                                        <div>
                                        {loadingReviewCreate && <Loadingmsg/>}
                                        {errorReviewCreate && (
                                            <Errormsg variant="danger">
                                            {errorReviewCreate}
                                            </Errormsg>
                                        )}
                                        </div>
                                    </form>
                                    ) : (
                                    <Errormsg>
                                        Please <Link className="link" to="/signin" style={{"color":"#008000"}}>Sign In</Link> to write a review
                                    </Errormsg>
                                    )}
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } 
        </div>
    )
}
export default Productmain
