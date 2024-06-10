

function View ({tag: Tag ='div',className, children}){
    return <Tag className={`view ${className?className :''}`}>{children}</Tag>
}

export default View