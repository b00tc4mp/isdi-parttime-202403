function Image({ source, alternative, className }) {
  return <img src={source} alt={alternative} className={className} />;
}

export default Image;
