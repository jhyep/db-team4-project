import palette from '../../styles/palette';

function Button({
  children,
  color,
  width,
  backgroundColor,
  onClick,
  ...restProps
}) {
  const style = {
    color: color || '#fff',
    width: width || '80px',
    backgroundColor: backgroundColor || `${palette.mainYellow}`,
    height: '34px',
    fontSize: '14px',
  };

  return (
    <button style={style} onClick={onClick} {...restProps}>
      {children}
    </button>
  );
}

export default Button;
