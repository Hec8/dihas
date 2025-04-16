import Image from 'next/image'

const ApplicationLogo = props => (
    <Image
        src="/assets/logo.png"
        alt="Application Logo"
        width={100}
        height={40}
        className="mr-4"
        {...props}
    />
)

export default ApplicationLogo
