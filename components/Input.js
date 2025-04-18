const Input = ({ disabled = false, className, ...props }) => (
    <input
        disabled={disabled}
        className={`${className} rounded-md shadow-sm border-gray-300focus:ring-opacity-50`}
        {...props}
    />
)

export default Input
