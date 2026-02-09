function ServiceItem({ title, price, active }) {
  return (
    <div className="serviceItem">
      <div className="serviceInfo">
        <h4 className="serviceTitle">{title}</h4>
        <span className="servicePrice">{price}/hour</span>
      </div>

      <div className={`toggleSwitch ${active ? "toggleOn":""}`}/>
    </div>
  );
}
export default ServiceItem;
