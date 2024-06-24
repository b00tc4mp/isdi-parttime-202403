function SubmitButton({ className, onClick, children }) {
  return (
    <button type="submit" className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default SubmitButton;
