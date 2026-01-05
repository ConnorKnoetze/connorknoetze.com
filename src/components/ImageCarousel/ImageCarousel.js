'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import '@/styles/ImageCarousel/ImageCarousel.css';
import { fetchRepoImages } from "@/utils/fetchRepoImages";


export default function ImageCarousel({repoName}){
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRepoImages({
        owner: "ConnorKnoetze",
        repo: repoName,
        path: `${repoName}-images`,
        })
        .then(setImages)
        .catch((err) => setError(err.message));
    }, [repoName]);

    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!images.length) return <p>Loading images…</p>;

    return (
        <div className="images-area">
            {images.map((img) => (
                <img key={img.name} src={img.url} alt={img.name} />
            ))}
        </div>
    );
}