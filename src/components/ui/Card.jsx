const Card = ({ children, className = '' }) => {
  return <div className={`glass-panel overflow-hidden ${className}`}>{children}</div>
}

export default Card
