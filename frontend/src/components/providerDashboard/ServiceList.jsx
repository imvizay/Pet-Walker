import ServiceItem from "./ServiceItem";

function ServiceList(){
  return (
    <div className="serviceCardContainer">
      <h3>Active Services</h3>

      <ServiceItem title="Dog Walking" price="$25/hr" active />
      <ServiceItem title="Pet Grooming" price="$45/session" active />
      <ServiceItem title="Pet Sitting" price="$60/day" />

    </div>
  );
}
export default ServiceList;
