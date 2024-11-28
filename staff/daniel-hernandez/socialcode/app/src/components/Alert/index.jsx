import './index.css';
import Container from '../atomic/Container';
import Text from '../atomic/Text';
import Button from '../atomic/Button';

// level = { 'warn', 'error', 'anything' = 'regular text'}
export default ({ message, onAccept, level = 'warn' }) => (
   <Container className="AlertOverlay">
      <Container className="AlertBox">
         <Text
            className={`AlertText ${level === 'error' ? 'AlertText-error' : level === 'warn' ? 'AlertText-warn' : 'AlertText-text'}`}
         >
            {`${message} !`}
         </Text>
         <Button className="AlertButton" onClick={onAccept}>
            OK
         </Button>
      </Container>
   </Container>
);
