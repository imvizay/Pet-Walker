import { Search,Book, Locate } from 'lucide-react'
import '../assets/css/layout/homepage.css'

const SITE_SERVICES = [
    {icon:Search,title:'Search local walkers',description:"Find qualified walkers in your neighbourhood based on verified reviews and real-time availability."},

    {icon:Book,title:'Book & Pay Securely',description:"schedule visit instantly and oay safely through our encrypted pet-owner protected platform"},

    {icon:Locate,title:'Track the walk',description:"Get real time updates,photos and live GPS tracking of your pet's jounery during every session"}

]

import displayImg from '../assets/images/Dog_Breeds.jpg'
import SubscriptionCard from '../components/cards/SubscriptionCard'

function HeroSection() {

  return (
    <>
      <section className="heroSection">
        <div className="heroContent">
          <div className="objectiveImage">
            <img src={displayImg} alt="dog" />
          </div>

          <div className="heroText">
            <h1>Care your pet deserves</h1>
            <p>
              The trusted marketplace connecting loving pet owners with
              professional, vetted walkers in your neighborhood.
            </p>

            <div className="heroActions">
              <button className="primaryBtn">Find a Pet Walker</button>
              <button className="secondaryBtn">Become a Provider</button>
            </div>
          </div>
        </div>
      </section>

      <section className="howItWorks">
        <h1>How it Works</h1>
        <p className="howSubtitle">
          Getting the best care for your pet is easy, secure, and stress-free.
        </p>

        <div className="servicesOptions">
          {SITE_SERVICES.map((el, idx) => (
            <div className="serviceCard" key={idx}>
              <span className="iconSpan">
                <el.icon size={28} />
              </span>
              <h2>{el.title}</h2>
              <p>{el.description}</p>
            </div>
          ))}
        </div>
      </section>

      <SubscriptionCard/>

     <section className="ctaSection">
      <h1 className="ctaTitle">
        Ready to give your pet the best experience?
      </h1>
          
      <p className="ctaSubtitle">
        Join thousands of happy pet owners and reliable walkers today.
        Your first walk is on us!
      </p>
          
      <div className="ctaActions">
        <button className="ctaPrimaryBtn">Join PetWalker Now</button>
        <button className="ctaSecondaryBtn">Learn More</button>
      </div>
    </section>
          
    </>
  )
}

export default HeroSection