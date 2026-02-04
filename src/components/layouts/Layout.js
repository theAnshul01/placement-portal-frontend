
const Layout = ({ children }) => {

    return (
        <div className="min-h-screen bg-gray-100">
            
            <main className="w-full mx-auto px-2 py-4">
                {children}
            </main>

        </div>
    )
}

export default Layout