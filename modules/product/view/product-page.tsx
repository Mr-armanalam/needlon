import { individualProduct } from '@/types/product'
import ProductShowcase from '../sections/product-showcase'

const ProductPage = ({productData}:{productData: individualProduct}) => {  

  return (
    <div className='px-8'>
      <ProductShowcase productData={productData} />
    </div>
  )
}

export default ProductPage