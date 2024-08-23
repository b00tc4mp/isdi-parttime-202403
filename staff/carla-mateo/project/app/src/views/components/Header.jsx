import Heading from "../../components/core/Heading"
function Header({ children }) {
    return (
        <header className="p-5 top-0 w-full flex items-start justify-between border-color-footer border-8 fixed">
            <div className="flex flex-col items-start">
                <Heading className="text-sm leading-tight" level={1}>
                    FAMILY
                </Heading>
                <Heading className="text-sm leading-tight" level={1}>
                    SYNC
                </Heading>
            </div>
            {children}
        </header>
    )
}

export default Header