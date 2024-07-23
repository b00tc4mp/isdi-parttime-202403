import Container from "./Container.jsx";

function Field({ fieldClassName, inputClassName, id, type, name, children, placeholder }) {
   return (
      <Container className={fieldClassName}>
         <label htmlFor={id}>{children}</label>
         <input className={inputClassName} id={id} name={name} type={type} placeholder={placeholder} />
      </Container>
   );
}

export default Field;
