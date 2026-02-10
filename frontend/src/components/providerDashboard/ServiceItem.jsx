
const SERVICES = ["walking",'sitter','grooming','training']
function ServiceItem({hasSubscription=false,plan="free",isActive=false}) {

  if (!isActive) return (
  <div className="serviceItem">
    <span>No Services Actived Right Now.</span>
  </div>)

  return (
  <>
    
  </>
  );
}
export default ServiceItem;
