import Button from "../../components/core/Button"

function Alert({ message, onAccept, level = "warn" }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className={`flex w-[18rem] flex-col items-center rounded-lg bg-green-200 p-4 border border-black shadow-custom-shadow AlertBox-${level}`}>
                <p className="text-center text-xl font-extrabold">{message}</p>
                <Button className="w-[7rem]" onClick={onAccept}>
                    Aceptar
                </Button>
            </div>
        </div>
    )
}

export default Alert