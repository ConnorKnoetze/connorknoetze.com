export default function setAsWallpaper(wallpaperFileName) {
    const backgroundUrl = `url('/images/wallpapers/${wallpaperFileName}')`;
    document.documentElement.style.setProperty('--background', backgroundUrl);
}