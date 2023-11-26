import palette from '../../styles/palette';

function Button({
  children,
  color,
  width,
  height,
  backgroundColor,
  onClick,
  ...restProps
}) {
  const style = {
    color: color || '#fff',
    width: width || '80px',
    height: height || '34px',
    backgroundColor: backgroundColor || `${palette.mainYellow}`,
    fontSize: '14px',
  };

  return (
    <button style={style} onClick={onClick} {...restProps}>
      {children}
    </button>
  );
}

export default Button;
