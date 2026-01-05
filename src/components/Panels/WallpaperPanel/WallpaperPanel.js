'use client';

import WindowControls from "../../WindowControls/WindowControls";
import setAsWallpaper from "@/utils/setAsWallpaper";
import "@/styles/Panels/WallpaperPanel/WallpaperPanel.css";

const wallpaperFiles = [
    ["Screenshot 2026-01-04 154925.png", "2f88vbbi9kue195.png"],
    ["Screenshot 2026-01-04 154936.png", "9inv0o6ek0qd1.png"],
    ["Screenshot 2026-01-04 154959.png", "788rircudz0c1.png"],
    ["Screenshot 2026-01-04 155015.png", "9213o4hips3d1.jpg"],
    ["Screenshot 2026-01-04 155025.png", "20250827224255_1.jpg"],
    ["Screenshot 2026-01-04 155041.png", "ai8l9hbf6tkd1.png"],
    ["Screenshot 2026-01-04 155051.png", "DnDGo1.png"],
    ["Screenshot 2026-01-04 155104.png", "kjm887zhqjie1.png"],
    ["Screenshot 2026-01-04 155118.png", "van-Gogh-Almond-Blossom-1890.jpg"],
    ["Screenshot 2026-01-04 155131.png", "yo33qdyyfozc1.jpeg"],
    ["Screenshot 2026-01-04 155142.png", "z7t5x3p9olud1.png"]
];

export default function WallpaperPanel(){
    return (
        <div className="wallpaper-panel-content" onClick={(e) => e.stopPropagation()}>
            <div className="wallpaper-panel-header">
                <WindowControls panelName="wallpaper"/>
            </div>
            <div className="wallpaper-panel-body">
                <div className="wallpaper-panel-grid">
                    {wallpaperFiles.map(([thumbnail, wallpaper]) => (
                        <div key={wallpaper} className="wallpaper-item" onClick={() => setAsWallpaper(wallpaper)}>
                            <img src={`/images/wallpaper_thumbnails/${thumbnail}`} alt={`Wallpaper ${wallpaper}`} className="wallpaper-image" loading="lazy" decoding="async"/>
                            <p>Set As Wallpaper</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}