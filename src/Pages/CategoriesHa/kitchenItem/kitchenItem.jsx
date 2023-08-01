import { getAll } from "../../../api/internal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from './kitchenItem.module.css'
import Loader from "../../../compnents/Loader/loader";
import SubNavbar from "../../../compnents/subNavbar/subNavbar";

export default function KitchenItem() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function getAllProductCallApi() {
      try {
        const response = await getAll();
        if (response.status === 200) {
          const filteredProducts = response.data.product.filter(product => product.type === "kitchenItem");
          setProducts(filteredProducts);
        } else if (response.code === "ERR_BAD_REQUEST") {
          window.location.reload();
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <Loader text="products" />;
  }

  if (products.length === 0) {
    return <h1>No kitchen items found.</h1>;
  }

  const truncateContent = (content, wordLimit) => {
    const words = content.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return content;
  };

  return (
    <body className={style.orderBody}>
      <SubNavbar/>
      <div className={style.grid}>
        {products.map((product) => (
           <div key={product._id} className={style.card} onClick={() => navigate(`/product/${product._id}`)}>
            <img src={product.photoPath} alt={product.productName} width={1000} />
            <h2 className={style.productName}>{product.productName}</h2>
            <h3>{product.price} Rs</h3>
            <p>{product.ownerCompanyName}</p>
            <p>{product.type}</p>
            <p>{truncateContent(product.decs, 10)}</p>
          </div> 
        ))}
      </div>
    </body>
  );
}