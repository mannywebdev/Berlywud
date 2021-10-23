import React, { useEffect } from 'react';
import './ProductList.css'
import { useDispatch, useSelector } from 'react-redux';
import { allProductsLoad, createProduct, deleteProduct } from './redux/actions/allProductsActions';
import Errormsg from './Errormsg'
import Loadingmsg from './Loadingmsg'
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from './redux/constants/allProductConstants';
import Button from '@material-ui/core/Button'
import { useParams,useHistory, Link } from 'react-router-dom';

export default function ProductList() {

  const { pageNumber = 1 } = useParams();

  const productList = useSelector((state) => state.AllProducts);
  const { loading, error, allProducts , page ,pages} = productList;
  console.log(`page`, page)
  console.log(`pages`, pages)

  const productCreate = useSelector((state) => state.ProductCreate);
  const {loading: loadingCreate,error: errorCreate,success: successCreate,product: createdProduct} = productCreate; 

  const UserSignin = useSelector(state=> state.UserSignin)
    const { userInfo } = UserSignin

  const productDelete = useSelector((state) => state.ProductDelete);
  const {loading: loadingDelete,error: errorDelete,success: successDelete} = productDelete;

  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      history.push(`/productpage/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(allProductsLoad({userInfo,pageNumber}));
  }, [createdProduct, dispatch, history, successCreate, successDelete ,pageNumber]);
  
  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
    }
  };
  const createHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div className="productlist">
      <div className="productlist__header">
        <h1>Products</h1>
        <div className="pink__button">
          <Button className="pink__button" onClick={createHandler}>
            Create Product
          </Button>
        </div>
      </div>
      {loadingDelete && <Loadingmsg/>}
      {errorDelete && <Errormsg variant="danger">{errorCreate}</Errormsg>}
      {loadingCreate && <Loadingmsg/>}
      {errorCreate && <Errormsg variant="danger">{errorCreate}</Errormsg>}
      {loading ? (
        <Loadingmsg/>
      ) : error ? (
        <Errormsg variant="danger">{error}</Errormsg>
      ) : (
        <>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>BRAND</th>
              <th>TITLE</th>
              <th>GENDER</th>
              <th>PRICE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.brand}</td>
                <td>{product.title}</td>
                <td>{product.gender}</td>
                <td>{product.origprice}</td>
                
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      history.push(`/productpage/${product._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
        {[...Array(pages).keys()].map((x) => (
              <Link
                  className={x + 1 === page ? 'link active' : 'link'}
                  key={x + 1}
                  to={`/productlist/pageNumber/${x + 1}`}
              >
              {x + 1}
              </Link>    
        ))}
        </div>                
        </>
      )}
    </div>
  );
}