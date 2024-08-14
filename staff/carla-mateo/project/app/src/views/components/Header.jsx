import Heading from "../../components/core/Heading"
function Header({ children }) {
    return (
        <header className="p-5 top-0 w-full flex justify-between border-color-footer border-8">
            <Heading className="text-2xl" level={1}>
                FAMILY SYNC
            </Heading>
            {children}


        </header>
    )
}

export default Header