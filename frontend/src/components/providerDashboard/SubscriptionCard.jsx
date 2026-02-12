import '../../assets/css/service_provider/subscriptionCard.css'
import { useOutletContext } from 'react-router-dom'

function SubscriptionProviderCard() {

  const  { hasSubscription = {} } = useOutletContext()

   const {
    subscription_plan,
    duration,
    is_active,
    max_service,
    start_date,
    end_date,
  } = hasSubscription;

  console.log("Subscription Card context:" , hasSubscription)

    const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString() : "-";


  const freePlanCard = hasSubscription.subscription_pane == "FREE" && (

          <div className='subscriptionCard'>
                <span className='subscriptionTitle'>SUBSCRIPTION STATUS</span>
                <h4 className='subscriptionPlan'>Free Plan</h4>
                <p className='subscriptionText'>Pro members earn 20% more on avaerage and get featured in search result</p>

                <button className='upgradeButton'>Upgrade to Pro</button>
            </div>

      ) 


  return (
     <div className="subscriptionCard">

      {/* Header */}
      <div className="subHeader">
        <span className="subTitle">Membership</span>

        <span
          className={`statusChip ${
            is_active ? "active" : "inactive"
          }`}
        >
          {is_active ? "ACTIVE" : "INACTIVE"}
        </span>
      </div>

      {/* Plan */}
      <div className="planBlock">
        <h2>{subscription_plan}</h2>
        <span className="duration">{duration}</span>
      </div>

      {/* Stats */}
      <div className="subStats">
        <div>
          <span className="label">Max Services</span>
          <span className="value">{max_service}</span>
        </div>

        <div>
          <span className="label">Start</span>
          <span className="value">{formatDate(start_date)}</span>
        </div>

        <div>
          <span className="label">Ends</span>
          <span className="value">{formatDate(end_date)}</span>
        </div>
      </div>

      {/* CTA */}
      <button className="managePlanBtn">
        Manage Subscription
      </button>

    </div>
  )
}

export default SubscriptionProviderCard