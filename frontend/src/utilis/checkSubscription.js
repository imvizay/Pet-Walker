
import { getSubscribedPlan } from "../api/providerApi/manageServices"
export const loadSubscription = async () => {
        let res = await getSubscribedPlan()

        if(!res.data){
          return console.log(res.error)
        }
        
        setSubscription(res.data)
}