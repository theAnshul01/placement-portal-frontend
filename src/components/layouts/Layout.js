
const Layout = ({ children }) => {
    const today = new Date()
    const year = today.getFullYear()

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-500 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <h1 className="text-xl font-semibold text-white">
                        PlaceMe
                    </h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-6">
                {children}
            </main>

            <footer className="bg-blue-500 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center items-center">
                    <p className="text-white max-w-7xl mx-auto">&copy;{year} PlaceMe. All Rights Reserved.</p>
                </div>
            </footer>

        </div>
    )
}

export default Layout