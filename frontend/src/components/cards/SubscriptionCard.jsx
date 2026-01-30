import "../../assets/css/layout/subscriptioncard.css";
import { Check } from "lucide-react";



const SUBSCRIPTION_PACKS = [
  {
    id: 1,
    title: "Starter",
    heading: "Free",
    price: "₹0",
    perks: [
      "Basic walker search",
      "Manual booking",
      "Standard email support"
    ]
  },
  {
    id: 2,
    title: "Premium Care",
    heading: "Pro",
    price: "₹500",
    is_popular: true,
    perks: [
      "Priority walker matching",
      "Premium insurance coverage",
      "GPS live tracking",
      "24/7 priority support"
    ]
  }
];

function SubscriptionCard() {
  return (
    <section className="pricingSection">
      <h1>Flexible Plans</h1>
      <p className="pricingSubtitle">
        Choose the right plan for your furry friend.
      </p>

      <div className="pricingGrid">
        {SUBSCRIPTION_PACKS.map((plan) => (
          <div
            key={plan.id}
            className={`pricingCard ${
              plan.is_popular ? "popularCard" : ""
            }`}
          >
            {plan.is_popular && (
              <span className="popularBadge">Most Popular</span>
            )}

            <p className="planTitle">{plan.title}</p>
            <h2>{plan.heading}</h2>
            <div className="priceRow">
              <span className="price">{plan.price}</span>
              <span className="perMonth">/month</span>
            </div>

            <button
              className={`planBtn ${
                plan.is_popular ? "primaryPlanBtn" : "secondaryPlanBtn"
              }`}
            >
              {plan.is_popular ? "Go Pro" : "Get Started"}
            </button>

            <ul className="perkList">
              {plan.perks.map((perk, idx) => (
                <li key={idx}>
                  <Check size={18} />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SubscriptionCard;
