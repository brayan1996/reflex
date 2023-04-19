import './loading.css'

const Loading = ({ text }) => {
  return (
    <div className='contain-loader'>
        <span className="loader"></span>
        <p className='text-loader'>{ text }</p>
    </div>
  )
}

export default Loading