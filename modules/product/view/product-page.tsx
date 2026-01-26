import ProductShowcase from '../sections/product-showcase'

const ProductPage = async({productId}:{productId: string}) => {
    
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products/${productId}`);
  const {productItem} = await response.json();

  return (
    <div className='px-8'>
      <ProductShowcase productItem={productItem} />
    </div>
  )
}

export default ProductPage