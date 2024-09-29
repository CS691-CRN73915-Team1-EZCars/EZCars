// Catalog.jsx
import React, { useEffect, useState } from 'react';
import styles from './styles'; // Import the styles from styles.js
import carBrands from '../../data/brandData.json';

const Catalog = () => {
    const [loadedImages, setLoadedImages] = useState({});

    useEffect(() => {
        const importAll = (r) => {
            let images = {};
            r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
            return images;
        }

        const images = importAll(require.context('../../assets/images', false, /\.(png|jpe?g|svg|webp|avif)$/));

        const loadedImgs = {};
        carBrands.forEach(car => {
            const imageName = car.logo.split('/').pop();
            loadedImgs[car.name] = images[imageName];
        });

        setLoadedImages(loadedImgs);
    }, []);

    return (
        <div style={styles.catalog}>
            <h2 style={styles.heading}>Our Catalog</h2>
            <div style={styles.brandContainer}>
                {carBrands.map((brand, index) => (
                    <div key={index} style={styles.brand}>
                        <img src={loadedImages[brand.name]} alt={brand.name} style={styles.brandImage} />
                        <p style={styles.brandName}>{brand.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Catalog;
