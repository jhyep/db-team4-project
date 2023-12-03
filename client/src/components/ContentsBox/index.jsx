function ContentsBox({ children, width, height }) {
  const style = {
    width: width || '300px',
    height: height,
    backgroundColor: '#fff',
    border: '1px solid rgba(172, 168, 155, 0.3)',
    boxSizing: 'border-box',
    minHeight: '200px',
    padding: '30px',
  };

  return <div style={style}>{children}</div>;
}

export default ContentsBox;
