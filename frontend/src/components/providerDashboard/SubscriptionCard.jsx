import React from 'react'

function SubscriptionProviderCard() {
  return (
    <div className='subscriptionCard'>
        <span className='subscriptionTitle'>SUBSCRIPTION STATUS</span>
        <h4 className='subscriptionPlan'>Free Plan</h4>
        <p className='subscriptionText'>Pro members earn 20% more on avaerage and get featured in search result</p>

        <button className='upgradeButton'>Upgrade to Pro</button>
    </div>
  )
}

export default SubscriptionProviderCard