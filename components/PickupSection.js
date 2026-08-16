import Pickup from './Pickup';

export default function PickupSection() {
  return (
    <section className="section pickup" id="pickup">
      <div className="container pickup-layout">
        <div className="pickup-copy">
          <p className="eyebrow">Doorstep Pickup</p>
          <h2>Schedule a Pickup in Minutes</h2>
          <p>
            Tell us where you are and when works for you — our rider collects your parcel, and you can follow every step
            from your phone. Free pickup in the Kathmandu Valley and Chitwan area.
          </p>

          <figure className="pickup-media">
            <img
              src="/assets/A2B69967-87B8-44C7-A186-FFB577912E3F.JPG"
              alt="Swift Nepal package ready for pickup"
              width="1254"
              height="1254"
              loading="lazy"
            />
          </figure>

          <ul className="pickup-perks" role="list">
            <li>Same-day pickup before 4:00 PM</li>
            <li>Confirmation call within 15 minutes</li>
            <li>Just pay the shipping rate</li>
          </ul>
        </div>

        <Pickup />
      </div>
    </section>
  );
}
