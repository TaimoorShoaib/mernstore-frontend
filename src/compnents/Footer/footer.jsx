import style from './footer.module.css';
import { FaInstagram, FaFacebook ,FaTwitter  } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.content}>
        <p>&copy; 2023 HyperBounce. All rights reserved.</p>
        <a href='https://www.instagram.com'>
            <FaInstagram className={style.icon} />
          </a>
          <a href='https://www.facebook.com'>
            <FaFacebook className={style.icon} />
          </a>
          <a href='https://www.twitter.com'>
            <FaTwitter className={style.icon} />
          </a>
      </div>
    </footer>
  );
}
