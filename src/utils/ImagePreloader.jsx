import { useEffect, useRef, useState } from "react";
import operatorData from "../assets/data/OperatorData.json";
import maps from "../assets/data/maps.json";
import staticImages from "../assets/data/staticImages.json";
import "./ImagePreloader.scss";

const getImageUrlsFromOperatorData = (data) => {
    const urls = [];

    data.forEach((operator) => {
        const collect = (value) => {
            if (typeof value === "string" && value.includes("http")) {
                urls.push(value);
            } else if (typeof value === "object" && value !== null) {
                Object.values(value).forEach(collect);
            }
        };

        collect(operator.img);
        collect(operator.icon);
        collect(operator.BioImg);
        collect(operator.extra?.img);
        collect(operator.biography?.img);
        collect(operator.loadout);
    });

    return urls;
};

const getImageUrlsFromMaps = (maps) => {
    return maps.map((map) => `/maps/${map.img}`);
};

const ImagePreloader = ({ onComplete }) => {
    const [loadedCount, setLoadedCount] = useState(0);
    const [totalImages, setTotalImages] = useState(0);
    const loadedRef = useRef(0);

    useEffect(() => {
        const operatorUrls = getImageUrlsFromOperatorData(operatorData);
        const mapUrls = getImageUrlsFromMaps(maps);
        const allUrls = [...operatorUrls, ...mapUrls, ...staticImages];

        const normalizedUrls = allUrls.map((url) => url.trim().toLowerCase());
        const uniqueUrls = Array.from(new Set(normalizedUrls));
        setTotalImages(uniqueUrls.length);

        uniqueUrls.forEach((src) => {
            const img = new Image();
            img.src = src;
            const onLoadOrError = () => {
                if (loadedRef.current < uniqueUrls.length) {
                    loadedRef.current += 1;
                    setLoadedCount(loadedRef.current);
                }
            };
            img.onload = onLoadOrError;
            img.onerror = onLoadOrError;
        });
    }, []);

    useEffect(() => {
        if (totalImages > 0 && loadedCount >= totalImages) {
            onComplete();
            console.log(`Loaded all: ${loadedCount} of: ${totalImages} `);
        } else {
            console.log(`Loading: ${totalImages} On: ${loadedCount}`);
        }
    }, [loadedCount, totalImages]);

    const progress = Math.min(100, Math.round((loadedCount / totalImages) * 100));

    return (
        <div className="loader">
            <p>Loading {progress}%</p>
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    );
};

export default ImagePreloader;
