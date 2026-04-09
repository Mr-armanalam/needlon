import { individualProduct } from '@/types/product'
import ProductShowcase from '../sections/product-showcase'
import ProductDetails from '../sections/product-details'

const ProductPage = ({productData}:{productData: individualProduct}) => {  

  return (
    <div className='px-8'>
      <ProductShowcase productData={productData} />
      <ProductDetails productData={productData} />
    </div>
  )
}

export default ProductPage