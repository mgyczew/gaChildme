window.splitImage = async (imageDataUrl, rows, columns) => {
    const img = new Image();
    const imageSource = imageDataUrl.startsWith('data:')
        ? imageDataUrl
        : new URL(imageDataUrl, document.baseURI).href;

    await new Promise((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Przegl¹darka nie mog³a odczytaæ obrazu przeznaczonego do puzzli.'));
        img.src = imageSource;
    });

    if (img.naturalWidth === 0 || img.naturalHeight === 0) {
        throw new Error('Obraz ma nieprawid³owe wymiary.');
    }

    const imageWidth = img.naturalWidth;
    const imageHeight = img.naturalHeight;
    if (imageWidth < columns || imageHeight < rows) {
        throw new Error(`Obraz jest za ma³y dla planszy ${rows}x${columns}.`);
    }
    const pieces = [];

    // Use offscreen canvas for better performance
    const offscreenCanvas = document.createElement('canvas');
    const ctx = offscreenCanvas.getContext('2d', { alpha: true });

    if (!ctx) {
        throw new Error('Failed to get canvas context');
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            // Granice s¹ wyliczane osobno dla ka¿dego fragmentu, dziêki czemu
            // nie tracimy pikseli przy obrazach, których rozmiar nie dzieli siê równo.
            const sourceX = Math.floor(col * imageWidth / columns);
            const sourceY = Math.floor(row * imageHeight / rows);
            const sourceWidth = Math.floor((col + 1) * imageWidth / columns) - sourceX;
            const sourceHeight = Math.floor((row + 1) * imageHeight / rows) - sourceY;

            offscreenCanvas.width = sourceWidth;
            offscreenCanvas.height = sourceHeight;
            ctx.clearRect(0, 0, sourceWidth, sourceHeight);
            ctx.drawImage(img, 
                sourceX, sourceY, sourceWidth, sourceHeight,
                0, 0, sourceWidth, sourceHeight
            );

            // Use PNG for better compression by default
            const dataUrl = offscreenCanvas.toDataURL('image/png');
            pieces.push(dataUrl);
        }
    }

    return pieces;
};

window.getImageAspectRatio = async (imagePath) => {
    const img = new Image();
    const imageSource = imagePath.startsWith('data:')
        ? imagePath
        : new URL(imagePath, document.baseURI).href;

    await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error('Nie uda³o siê odczytaæ proporcji obrazu.'));
        img.src = imageSource;
    });

    return img.naturalWidth / img.naturalHeight;
};

// Store drag data for Blazor drag-drop
window.dragData = null;

window.setDragData = (data) => {
    window.dragData = data;
};

window.getDragData = () => {
    const data = window.dragData;
    window.dragData = null;
    return data;
};

window.clearDragData = () => {
    window.dragData = null;
};
