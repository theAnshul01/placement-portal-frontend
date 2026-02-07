import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className='w-full mt-2 rounded-tl-md rounded-tr-md bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-500'>

        {/* Inner container */}
        <div className="px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4" >

            {/* Left section */}
            <p className="text-sm text-gray-600 dark:text-gray-50">
                &copy; {new Date().getFullYear()} Placement Portal. All rights reserved.
            </p>

            {/* Right section */}
            <div className='flex gap-6 text-sm text-gray-600 dark:text-gray-200'>
                  <Link to="" className="hover:text-gray-900 hover:underline transition dark:hover:text-white">
                      Privacy Policy
                  </Link>

                  {/* Footer link */}
                  <Link to="" className="hover:text-gray-900 hover:underline transition dark:hover:text-white">
                      Terms of Service
                  </Link>

                  {/* Footer link */}
                  <Link to="" className="hover:text-gray-900 hover:underline transition dark:hover:text-white">
                      Contact
                  </Link>
            </div>
        </div>

    </footer>
  )
}

export default Footer