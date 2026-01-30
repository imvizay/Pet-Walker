function ProviderCard({ provider }) {
  return (
    <div className="providerCard">
      
      <div className="providerImage">
        {provider.pro && <span className="proBadge">PRO</span>}
        <img src={provider.image} alt={provider.name} />
      </div>

      <div className="providerBody">
        <div className="providerTop">
          <h4>{provider.name}</h4>
          <span className="price">${provider.price}/hr</span>
        </div>

        <div className="rating">
          ⭐ {provider.rating} ({provider.reviews} reviews)
        </div>

        <p className="providerDesc">{provider.desc}</p>

        <button className="viewProfileBtn">
          View Profile
        </button>
      </div>

    </div>
  );
}

export default ProviderCard;
