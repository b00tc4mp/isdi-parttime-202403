export default ({ message, onAccept, level = 'warn' }) => <div className="Alert">
    <div className={`AlertBox AlertBox-${level}`}>
        <p>{message}</p>
        <Button className="Button" onClick={onAccept}>Accept</Button>
    </div>
</div>