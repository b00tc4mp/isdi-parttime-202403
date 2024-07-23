import Text from "./atomic/Text.jsx";

function FeedbackForm({
   formClassName,
   level,
   onSubmit,
   successClassName,
   successMessage,
   errorClassName,
   errorMessage,
   children
}) {
   const paintMessage = () => {
      switch (level) {
         case "error":
            return errorMessage ? <Text className={errorClassName}>{errorMessage}</Text> : null;
         case "success":
            return successMessage ? <Text className={successClassName}>{successMessage}</Text> : null;
         case "both":
            return (
               <>
                  {errorMessage && <Text className={errorClassName}>{errorMessage}</Text>}
                  {successMessage && <Text className={successClassName}>{successMessage}</Text>}
               </>
            );
         default:
            return null;
      }
   };

   return (
      <>
         <form className={formClassName} onSubmit={onSubmit}>
            {children}
         </form>
         {paintMessage()}
      </>
   );
}

export default FeedbackForm;
