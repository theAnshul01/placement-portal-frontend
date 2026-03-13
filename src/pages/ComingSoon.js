import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const ComingSoon = () => {
  return (
    <>
    <Navbar/>
        <div className='min-h-screen flex items-center justify-center'>
            <div className='border border-gray-400 dark:border-gray-500 bg-gray-300 dark:bg-gray-700 rounded-md px-4 py-6 flex items-center justify-center'>
                <h1 className='text-gray-800 dark:text-gray-100 xs:text-2xl md:text-xl'>Coming soon!</h1>
            </div>
        </div>
    <Footer/>
    </>
  )
}

export default ComingSoon