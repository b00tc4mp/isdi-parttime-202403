function DisableableButton({ className, onClick, condition, children }) {
  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      disabled={condition}
    >
      {children}
    </button>
  );
}

export default DisableableButton;
