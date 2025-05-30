const AuthCard = ({ logo, children }) => (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-green-800">
        <div>{logo}</div>

        <div className="w-full sm:max-w-md mt-16 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
            {children}
        </div>
    </div>
)

export default AuthCard
