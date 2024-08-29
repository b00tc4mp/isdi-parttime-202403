import "./index.css"
import Button from "../../../components/Button"

export default function Alert({ message, onAccept }) {
    return (
        <div className="ContainerAlert">
            <div className="AlertBox">
                <p>{message}</p>
                <Button className="AlertButton" onClick={onAccept}>Accept</Button>
            </div>
        </div>
    )
}
