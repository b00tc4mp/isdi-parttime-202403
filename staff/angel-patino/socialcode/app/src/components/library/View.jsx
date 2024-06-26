    import './View.css'
    
    function View({ tag: Tag = 'div', className, children }) {
        return <Tag className={`View ${className ? className : " "}`}>{children}</Tag>
    }
    export default View