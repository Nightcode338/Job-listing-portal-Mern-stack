import React from 'react'

const PageHeader = () => {
  return (
    <div className='py-24 mt-4 bg-[#f3f2f2] rounded flex items-center justify-center'>
      <div>
        <h2 className='text-3xl text-blue font-medium mb-1 text-center '>Estimate Salary</h2>
        <p className='text-sm text-center'><a href='/'>Home</a> / salary</p>
      </div>
    </div>
  )
}

export default PageHeader