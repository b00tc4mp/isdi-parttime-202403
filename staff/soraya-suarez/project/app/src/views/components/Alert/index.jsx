import './index.css'

export default ({ message, onAccept, level = 'warn' }) => <div className="Alert">
    <div className={`AlertBox AlertBox-${level}`}>
        <p>{message}</p>
        <button className="Button" onClick={onAccept}>Accept</button>
    </div>
</div>