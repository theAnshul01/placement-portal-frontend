

const NotFound = () => {
  return (
    <div className="text-center my-auto py-3 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600 mb-2">
            404 - Page Not Found
        </h2>
        <p className="text-gray-700 dark:text-gray-100">
            The page you are looking for does not exist.
        </p>
    </div>
  )
}

export default NotFound