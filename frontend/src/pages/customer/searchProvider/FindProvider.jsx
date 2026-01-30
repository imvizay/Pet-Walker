
import ProviderCard from '../../../components/cards/customer_dash/providerCard/ProviderCard';

import '../../../assets/css/customer_dashboard/searchProvider.css'

const providers = [
  {
    id: 1,
    name: "Sarah Jenkins",
    price: 28,
    rating: 4.9,
    reviews: 142,
    desc: "Certified trainer with over 5 years of experience walking dogs.",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    pro: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    price: 22,
    rating: 4.7,
    reviews: 89,
    desc: "Reliable and energetic. I treat every dog as my own.",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    pro: false,
  },
  {
    id: 3,
    name: "Emma Watson",
    price: 35,
    rating: 5.0,
    reviews: 215,
    desc: "Specialized in high-energy dogs and training sessions.",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    pro: true,
  },
];

function FindProviders() {
  return (
    <div className="findProvidersPage">
      
      {/* Left Filters */}
      <div className="filterPanel">
        <h4>Filters</h4>

        <div className="filterGroup">
          <label>Location</label>
          <input placeholder="City or Zip Code" />
        </div>

        <div className="filterGroup">
          <label>Service Type</label>
          <div className="checkbox">
            <span className='checkMint'><input type="checkbox" /></span>
            <span>Dog Walking</span>
          </div>
          <div className="checkbox">
           <span className='checkMint'> <input type="checkbox" /></span>
            <span>Pet Sitting</span>
          </div>
          <div className="checkbox">
            <span className='checkMint'><input type="checkbox" /></span>
            <span>Grooming</span>
          </div>
        </div>

        <button className="resetBtn">Reset All Filters</button>
      </div>

      {/* Right Content */}
      <div className="providerSection">
        <div className="providerHeader">
          <h3>124 Providers Found</h3>
          <select>
            <option>Recommended</option>
            <option>Price Low to High</option>
            <option>Top Rated</option>
          </select>
        </div>

        <div className="providerGrid">
          {providers.map((p) => (
            <ProviderCard key={p.id} provider={p} />
          ))}
        </div>
      </div>

    </div>
  );
}

export default FindProviders;
