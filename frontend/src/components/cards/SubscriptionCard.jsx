import "../../assets/css/layout/subscriptioncard.css";
import { Check } from "lucide-react";
import { useUserContext } from "../../contexts/UserContext";
import { useEffect } from "react";
import { boundSubscription } from "../../api/subscription/subscription";
import { useNavigate } from "react-router-dom";

const SUBSCRIPTION_PACKS = [
  {
    id: 1,
    title: "Starter",
    heading: "Free",
    price: "₹0",
    perks: [
      "Basic walker search",
      "Can send request only.",
      "Can activate 01 service at max to publish",
      "No membership badges.",
      "Services featurance is 40% less than members."
    ]
  },
  {
    id: 2,
    title: "Premium Care",
    heading: "Pro",
    price: "₹500",
    is_popular: true,
    perks: [
      "Have access of free plan perks.",
      "Priority walker matching",
      "Have access to contact details for contacting pet owners.",
      "Membership Badges.",
      "Activate all (04) services.",
    ]
  }
];

function SubscriptionCard() {

  const { user } = useUserContext() 
  const navigate = useNavigate()

  // Check if user have subscription or not 
  useEffect(()=>{
    
  },[])


  const handleSubscription = async (plan,id) => {

    let res = await boundSubscription( plan,id )

    if(!res.error){
      console.log(res.error)
      return false
    }

    alert('subscription made.')

    if (user.role.includes("provider") && user.role.includes("customer")) {
      navigate("/customer-dashboard");
    }
    else if (user.role.includes("provider")) {
      navigate("/provider-dashboard");
    }
    else {
      navigate("/customer-dashboard");
    }
  
  }


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
              onClick={()=>handleSubscription( plan.heading , plan.id )}
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
