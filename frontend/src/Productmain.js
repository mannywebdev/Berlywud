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
import { RiStarSmileLine } from "react-icons/ri";
import { PRODUCT_REVIEW_CREATE_RESET } from './redux/constants/allProductConstants';
import { BsPencil } from "react-icons/bs";

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
    let filteredArray
    function removeNull(array) {
        filteredArray = array.filter(x => x !== null)
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (comment && rating) {
          dispatch(
            createReview(productId, { rating, comment, name: userInfo.name ,  email: userInfo.email})
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
                            {product.url.map((item)=> {
                                if( item!== null){
                                return <img src={item} key={item} alt={product.title}/>
                                }
                            })}
                            {/* <img src={product.url} alt={product.title}/>
                            <img src={product.url} alt={product.title}/>
                            <img src={product.url} alt={product.title}/>
                            <img src={product.url} alt={product.title}/> */}
                        </div>
                        <div className="productmain__img__mob">
                            {
                                removeNull(product.url)
                            }
                            <Carousel>
                                {
                                    filteredArray.map((item)=>{
                                        return <CarouselItem><img src={item} className="carouselitem__img_mob" key={item} alt={product.title}/></CarouselItem>
                                    })
                                }
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
                                <span>Status:&nbsp; </span>
                                {product.stockcount > 0 ? <span className="success">Instock</span> : <span className="error">Out of stock</span>}
                            </div>
                            <div className="productmain__productdetails">
                                <h3>PRODUCT DETAILS <CgDetailsMore/></h3>
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
                                <h3 className="reviews">RATINGS <RiStarSmileLine/></h3>
                                {_.isEmpty(product.userreviews) && (
                                <Errormsg>Be the first to review.</Errormsg>
                                )}
                                <div>
                                { product.userreviews.map((review) => (
                                    <div className="reviews__userreview" key={review._id}>
                                        <Rating className="reviews__stars" rating={review.ratings} caption= " "></Rating>
                                        <p className="reviews__comment">{review.comment}</p>
                                        <div className="reviews__details">
                                            <p>{review.name}&nbsp; |</p>
                                            <p>&nbsp;{review.createdAt.substring(0, 10)}</p>
                                        </div>
                                    </div>
                                ))}
                                <div>
                                    {userInfo ? (
                                    <form className="productmain__form" onSubmit={submitHandler}>
                                        <div>
                                        <h4>Write a customer review  &nbsp;<BsPencil className="reviews__pencil"/></h4>
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
