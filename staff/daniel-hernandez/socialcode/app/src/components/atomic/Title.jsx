import Heading from './Heading';

function Title({ className, children }) {
   return (
      <Heading level="1" className={className}>
         {children}
      </Heading>
   );
}

export default Title;
