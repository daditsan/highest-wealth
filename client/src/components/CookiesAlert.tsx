"use client"

import { useEffect, useState } from 'react';
import styles from './CookieAlert.module.css';

const CookieAlert: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const cookieAccepted = document.cookie.includes('cookieAccepted=true');
        if (!cookieAccepted) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        document.cookie = "cookieAccepted=true; path=/; max-age=" + 365 * 24 * 60 * 60;
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className={styles.cookieAlert}>
            We use cookie for no reason. Be a good girl and accept the cookie will ya.
            <button onClick={acceptCookies} className="btn btn-sm btn-primary">Accept</button>
        </div>
    );
};

export default CookieAlert;
