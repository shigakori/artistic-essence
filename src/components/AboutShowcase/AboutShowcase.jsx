import styles from './AboutShowcase.module.css';
import ParallaxImg from '../ParallaxImg/ParallaxImg';

export default function AboutShowcase() {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.left}>
        <h2 className={styles.title}>
        EVERY ARTIST DESERVES A CANVAS TO EXPRESS, INSPIRE, AND CONNECT. WE CELEBRATE CREATIVITY BY GIVING YOUR VISION A PLACE TO SHINE.
        </h2>
        <div className={styles.rows}>
          <div className={styles.row}>
            <div className={styles.label}>ARTISTIC SUPPORT</div>
            <div className={styles.desc}>
            From emerging talents to established creators, we provide the tools and space for every artist to share their unique perspective with the world.
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>VISUAL STORYTELLING</div>
            <div className={styles.desc}>
            We believe every artwork tells a story. Our platform helps your creations reach new audiences, sparking imagination and dialogue across borders.
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>CREATIVE COMMUNITY</div>
            <div className={styles.desc}>
            Join a vibrant community where inspiration flows freely, collaborations are born, and your art finds its true audience. Here, your creative journey is our shared passion.
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.imageWrapper}>
          <ParallaxImg
            src="/work/work-9.jpg"
            alt="Filmmaking"
            className={styles.image}
          />
          <span className={styles.overlayText}>CRAFTED WITH INTENTION</span>
        </div>
      </div>
    </section>
  );
}