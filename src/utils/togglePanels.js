const togglePanels = (panelName) => {
    // open selected panel
    const panel = document.querySelector(`.${panelName}-panel-active`) || document.querySelector(`.${panelName}-panel`);
    const musicPlayer = document.querySelector('.music-player-container.minimized') || document.querySelector('.music-player-container.expanded');

    // Close panel if already open
    if (panel.className === `${panelName}-panel-active`) {
        panel.className = `${panelName}-panel`;
        musicPlayer.classList.remove('hidden');
        return;
    }
    console.log(panel.className);

    closeAllPanels();
    panel.className = panel.className === `${panelName}-panel-active` ? `${panelName}-panel` : `${panelName}-panel-active`;

    const panelContent =
        document.querySelector(`.${panelName}-panel-content`) ||
        document.querySelector(`.${panelName}-panel-content.maximized`);

    if (panelContent && !panelContent.classList.contains('maximized') && window.innerWidth < 600) {
        panelContent.classList.add('maximized');
    }

    if (panelContent && panelContent.classList.contains('maximized')) {
        musicPlayer.classList.add('hidden');
    }

}

const closeAllPanels = () => {
    const activePanels = document.querySelectorAll('[class$="-panel-active"]');
    const musicPlayer = document.querySelector('.music-player-container.minimized') || document.querySelector('.music-player-container.expanded');
    musicPlayer.classList.remove('hidden');
    activePanels.forEach(panel => {
        panel.className = panel.className.replace('-active', '');
    });
}

export { togglePanels, closeAllPanels };