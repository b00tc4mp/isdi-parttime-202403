function View({ tag: Tag = 'div', className, children }) {

    return <Tag className={`View ${className ? className : ''}`}>{children}</Tag>
}

export default View


// function View({ tag: Tag = 'div', children }) {
//     return <Tag className='View'>{children}</Tag>
// }

// export default View

// function View({ tag: Tag = 'div', className, children, direction = 'column', align = 'center' }) {
//     return (
//         <Tag
//             className={`View ${direction === 'column' ? 'View column' : 'View row'} ${align === 'center' ? 'View center' : ''
//                 } ${className || ''}`}
//         >
//             {children}
//         </Tag>
//     );
// }

// export default View;


// function View({ tag: Tag = 'div', className, children, direction = 'column', align = 'center' }) {

//     return <Tag className={`View ${className ? className : ''} ${direction === 'column' ? 'View column' : 'View row'} ${align === 'center' ? 'View center' : ''}`}>{children}</Tag>
// }

// export default View