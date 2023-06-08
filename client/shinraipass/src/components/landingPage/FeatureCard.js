import React from 'react'

const FeatureCard = ({image,title,description,direction}) => {
  return (
    <div className='w-full flex px-10 justify-between items-center'>

    <div className={`relative flex flex-col ${direction === 'justify-start' ? '' : 'justify-end' } space-y-5`}>

        <div className=' bg-black opacity-80'>
            <img src={image} alt={title} className=' w-[600px] h-[550px] '/>
        </div>

        <h3 className={`text-white text-5xl absolute bottom-[100px] ${direction === 'left' ? '-right-10' : 'left-5' }`}>{title}</h3>

        <p className='text-xl text-slate-500 text-justify'>{description}</p>

    </div>

    <button className='button-style w-[250px]'>
        Go to panel!
    </button>

    </div>
  )
}

export default FeatureCard