import { DetailedProductResponse, individualProduct } from '@/types/product'
import ProductShowcase from '../sections/product-showcase'
import ProductDetails from '../sections/product-details'
import { Suspense } from 'react'
import Loading from '../components/loading'

const ProductPage = ({productData}:{productData: DetailedProductResponse}) => {  

  return (
    <div className='px-8'>
      <Suspense fallback={<Loading />} >
        <ProductShowcase productData={productData} />
        <ProductDetails productData={productData} />
      </Suspense>
    </div>
  )
}

export default ProductPage