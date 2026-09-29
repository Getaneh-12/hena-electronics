import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";


function Promotions() {

    const { products } = useProducts();


    const promotedProducts =
        products.filter(
            (product) =>
                product.promotion === "active"
        );


    return (
        <section
            className="promotions"
            id="promotions"
        >

            <div className="section-heading">

                <p>
                    SPECIAL OFFERS
                </p>

                <h2>
                    Latest Promotions
                </h2>

                <span>
                    Discover our latest special offers
                    and limited-time deals.
                </span>

            </div>


            {promotedProducts.length === 0 ? (

                <div className="promotion-empty">

                    <div className="promotion-empty-icon">
                        🔥
                    </div>

                    <h3>
                        No Active Promotions
                    </h3>

                    <p>
                        New special offers will appear here
                        when products are added to our promotions.
                    </p>

                </div>

            ) : (

                <div className="promotion-grid">

                    {promotedProducts.map(
                        (product) => {

                            const originalPrice =
                                Number(
                                    product.price || 0
                                );


                            const discount =
                                Number(
                                    product.discount || 0
                                );


                            const discountedPrice =
                                originalPrice -
                                (
                                    originalPrice *
                                    discount /
                                    100
                                );


                            const amountSaved =
                                originalPrice -
                                discountedPrice;


                            const productImage =
                                product.images &&
                                    product.images.length > 0
                                    ? product.images[0]
                                    : product.image;


                            return (

                                <div
                                    className="promotion-card"
                                    key={product.id}
                                >

                                    {/* IMAGE */}

                                    <div className="promotion-image">

                                        {productImage ? (

                                            <img
                                                src={productImage}
                                                alt={product.productName}
                                            />

                                        ) : (

                                            <span>
                                                🔥
                                            </span>

                                        )}


                                        <span className="promotion-discount-badge">
                                            🔥 {discount}% OFF
                                        </span>

                                    </div>


                                    {/* CONTENT */}

                                    <div className="promotion-content">

                                        <span className="promotion-category">
                                            {product.category}
                                        </span>


                                        <h3>
                                            {product.productName}
                                        </h3>


                                        <div className="promotion-prices">

                                            <span className="promotion-original-price">
                                                {originalPrice.toLocaleString()} ETB
                                            </span>

                                            <strong className="promotion-sale-price">
                                                {discountedPrice.toLocaleString()} ETB
                                            </strong>

                                        </div>


                                        <p className="promotion-saving">
                                            Save {amountSaved.toLocaleString()} ETB
                                        </p>


                                        <Link
                                            to={`/product/${product.id}`}
                                            className="deal-button"
                                        >
                                            View Details →
                                        </Link>

                                    </div>

                                </div>

                            );

                        }
                    )}

                </div>

            )}

        </section>
    );
}


export default Promotions;