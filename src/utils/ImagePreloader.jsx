import { useEffect, useState } from "react";
import { getAllImageUrls } from "./getAllImageUrls";
import "./ImagePreloader.scss";

const ImagePreloader = ({ operatorData, extraImages = [], onComplete }) => {
    const [loadedCount, setLoadedCount] = useState(0);
    const [totalImages, setTotalImages] = useState(0);

    useEffect(() => {
        const operatorUrls = getAllImageUrls(operatorData);
        const uniqueUrls = Array.from(
            new Set([...operatorUrls, ...extraImages].map(url => url.trim()))
        );

        setTotalImages(uniqueUrls.length);

        uniqueUrls.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = () => setLoadedCount((prev) => prev + 1);
            img.onerror = () => setLoadedCount((prev) => prev + 1);
        });
    }, [operatorData, extraImages]);

    useEffect(() => {
        if (totalImages > 0 && loadedCount / 2 >= totalImages) {
            onComplete();
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