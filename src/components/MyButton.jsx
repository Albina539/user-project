const MyButton = ({ type, onClick = null, children, className = null }) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default MyButton;
