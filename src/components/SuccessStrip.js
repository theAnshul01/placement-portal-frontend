
const SuccessStrip = ({ message, onClose}) => {
    if(!message) return null

  return (
      <div className="mt-2 mb-4 bg-green-100 border border-green-300 rounded-lg px-4 py-3 text-green-700 flex items-start justify-between gap-4 animate-fade-in sticky top-2 z-50">
        <p className="text-sm leading-relaxed">{message}</p>
        <button 
        className="text-green-500 hover:text-green-700 text-sm font-semibold"
        onClick={onClose}
        aria-label="Close Success Message"
        >
            &#10005;
        </button>
    </div>
  )
}

export default SuccessStrip