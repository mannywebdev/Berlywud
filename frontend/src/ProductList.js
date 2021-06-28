import React, { useEffect } from 'react';
import './ProductList.css'
import { useDispatch, useSelector } from 'react-redux';
import { allProductsLoad, createProduct } from './redux/actions/allProductsActions';
import Errormsg from './Errormsg'
import Loadingmsg from './Loadingmsg'
import { PRODUCT_CREATE_RESET } from './redux/constants/allProductConstants';
import Button from '@material-ui/core/Button'

export default function ProductList(props) {
  const productList = useSelector((state) => state.AllProducts);
  const { loading, error, allProducts } = productList;

  const productCreate = useSelector((state) => state.ProductCreate);
  const {loading: loadingCreate,error: errorCreate,success: successCreate,product: createdProduct} = productCreate; 

  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    dispatch(allProductsLoad());
  }, [createdProduct, dispatch, props.history, successCreate]);
  
  const deleteHandler = () => {
    /// TODO: dispatch delete action
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
      {loadingCreate && <Loadingmsg/>}
      {errorCreate && <Errormsg variant="danger">{errorCreate}</Errormsg>}
      {loading ? (
        <Loadingmsg/>
      ) : error ? (
        <Errormsg variant="danger">{error}</Errormsg>
      ) : (
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
                      props.history.push(`/productpage/${product._id}/edit`)
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
      )}
    </div>
  );
}