

import { useState, useEffect } from 'react';	
import style from './home.module.css';
import {getAll} from '../../api/internal'
import { useNavigate } from 'react-router-dom';
import Loader from '../../compnents/Loader/loader';
const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    'https://images.unsplash.com/photo-1656464868371-602be27fd4c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1657586640569-4a3d4577328c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=801',
    'https://images.unsplash.com/photo-1656077217715-bdaeb06bd01f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };
  
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async function getAllProductCallApi() {
      try {
        const response = await getAll();
        if (response.status === 200) {
          setProducts(response.data.product);
        } else if (response.code === "ERR_BAD_REQUEST") {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (products.length === 0) {
    return <Loader text="homepage" />;
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
    <div className={style.homeContainer}>
      <div className={style.slider}>
        <button className={style.sliderArrow} onClick={goToPrevSlide}>
          &lt;
        </button>
        <img className={style.sliderImage} src={slides[currentSlide]} alt="Slider" />
        <button className={style.sliderArrow} onClick={goToNextSlide}>
          &gt;
        </button>
      </div>
      <div className={style.imgContainer}>
        <div className={style.img1} onClick={() => navigate(`/product/smartPhone`)}></div>
        <div className={style.img2} onClick={() => navigate(`/product/speakers`)}></div>
        <div className={style.img3} onClick={() => navigate(`/product/kitchenItem`)}></div>
      </div>
      {/*////////////////////////////////////////////////////*/}
      <div className={style.productContainer}>
        <h2 className={style.sectionTitle}>Featured Products</h2>
        <div className={style.productGrid}>
          {/* Render your product components or placeholders here */}
        </div>
      </div>

      <div className={style.bottomSection}>
        {/* Add your custom content for the bottom section here */}
      </div>
    </div>
    <div className={style.grid}>
  {products
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6)
    .map((product) => (
      <div key={product._id} className={style.card} onClick={() => navigate(`/product/${product._id}`)}>
        <img src={product.photoPath} alt={product.productName} width={1000} />
        <h2 className={style.productName}>{product.productName}</h2>
        <h3>{product.price} Rs</h3>
        <p>{product.ownerCompanyName}</p>
        <p>{truncateContent(product.decs, 10)}</p>
      </div>
    ))}
</div>
	

	</body>
  );
};

export default Home;
