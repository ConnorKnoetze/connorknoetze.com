export function getCurrentWallpaper() {
        const bodyStyles = window.getComputedStyle(document.body);
        const backgroundImage = bodyStyles.getPropertyValue('background-image');
        const match = backgroundImage.match(/wallpapers\/(.*?)"/);
        return match ? match[1] : 'default.jpg';
    }