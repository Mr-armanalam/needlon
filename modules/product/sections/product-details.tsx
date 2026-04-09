import { individualProduct } from '@/types/product'
import React from 'react'

const ProductDetails = ({productData}:{productData: individualProduct}) => {
  return (
    <section className='h-130 grid grid-cols-2 gap-0 items-center rounded p-8'>
      <div className="">
        <h1 className='text-3xl font-garamond font-semibold mb-8 text-gray-900'>About this {productData.product_category?.SubCatType}</h1>
        <p className='font-roboto-sans text-sm text-stone-500'>{productData.product_category?.descriptiveContent}</p>
      </div>
      <div className='flex flex-col gap-y-8 items-center'>
        <p className='font-semibold  ml-auto border-b'>Available</p>
        <p className='text-xs'>
          {productData.productFilterData.length > 0 &&
          productData.productFilterData.map((data, i) => (
            <p key={i}>
              <span className="font-semibold capitalize  text-gray-600">
                {Object.keys(data)}:{" "}
              </span>
              {Object.values(data)}
              {}
            </p>
          ))}
          </p>

      </div>
    </section>
  )
}

export default ProductDetails