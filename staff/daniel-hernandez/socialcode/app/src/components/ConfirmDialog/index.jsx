import { useRef, useEffect } from 'react';
import './index.css';
import Button from '../atomic/Button';
import Text from '../atomic/Text';

function ConfirmDialog({ dialog, onConfirm, onCancel }) {
   const dialogRef = useRef(null);

   useEffect(() => {
      const dialogNode = dialogRef.current;
      if (dialogNode) {
         dialogNode.showModal();
      }

      return () => {
         if (dialogNode) {
            dialogNode.close();
         }
      };
   }, []);

   return (
      <div className="dialogOverlay">
         <dialog className="confirmDialog" ref={dialogRef}>
            <Text className="dialogParagraph">{dialog}</Text>
            <Button className="cancelButton" onClick={onCancel}>
               Cancel
            </Button>
            <Button className="okButton" onClick={onConfirm}>
               OK
            </Button>
         </dialog>
      </div>
   );
}

export default ConfirmDialog;
