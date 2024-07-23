import './index.css'

export default ({ message, onAccept, level = 'warn' }) => <div class="Alert">
    <div class={`AlertBox AlertBox-${level}`}>
        <p>{message}</p>
        <button class="Button" onClick={onAccept}>Accept</button>
    </div>
</div>