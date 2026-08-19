import TrackingPanel from './TrackingPanel';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">National &amp; International Courier</p>
          <h1>
            Fast, Reliable &amp; Global <span className="text-accent">Delivery Solutions</span>
          </h1>
          <p className="hero-sub">
            From urgent same-day deliveries within Nepal to large-scale international freight, Swift Nepal moves your
            cargo across 190+ countries with real-time tracking at every step.
          </p>

          <ul className="hero-stats" role="list">
            <li>
              <strong>190+</strong>
              <span>Countries Served</span>
            </li>
            <li>
              <strong>2.4M</strong>
              <span>Parcels / Year</span>
            </li>
            <li>
              <strong>98.7%</strong>
              <span>On-Time Rate</span>
            </li>
          </ul>
        </div>

        <div className="hero-panel">
          <figure className="hero-media">
            <img
              src="/assets/63D1A052-9A39-453B-A705-D768369597E8.JPG"
              alt="Swift Nepal courier handing over a parcel"
              width="896"
              height="1200"
              loading="eager"
            />
            <span className="hero-stamp" aria-hidden="true">
              <img src="/assets/stamp.png" alt="" width="578" height="578" loading="lazy" />
            </span>
          </figure>

          <TrackingPanel />
        </div>
      </div>

      <div className="hero-glow hero-glow-1" aria-hidden="true"></div>
      <div className="hero-glow hero-glow-2" aria-hidden="true"></div>
    </section>
  );
}
