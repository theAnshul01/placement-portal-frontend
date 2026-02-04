
const ErrorStrip = ({message, onClose}) => {
    if(!message) return null

  return (
      <div className="mt-2 mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-700 flex items-start justify-between gap-4 animate-fade-in sticky top-2 z-50">
        <p className="text-sm leading-relaxed">{message}</p>
        <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 text-sm font-semibold"
            aria-label="Close error"
        >
            &#10005;
        </button>
    </div>
  )
}

export default ErrorStrip