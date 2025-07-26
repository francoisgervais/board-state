
/**
 * @file export.js
 * Handles exporting the board state as a PNG image using html2canvas.
 */

/**
 * Sets up the export button to export the board as a PNG image when clicked.
 * Uses html2canvas to capture the DOM and triggers a download.
 */
export function setupExportButton() {
    const exportBtn = document.getElementById('export-png-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            document.body.classList.add('hide-on-export');
            setTimeout(() => {
                html2canvas(document.body, { backgroundColor: null, useCORS: true }).then(function(canvas) {
                    document.body.classList.remove('hide-on-export');
                    canvas.toBlob(function(blob) {
                        const link = document.createElement('a');
                        const now = new Date();
                        const pad = n => n.toString().padStart(2, '0');
                        const timestamp = now.getFullYear().toString()
                            + pad(now.getMonth() + 1)
                            + pad(now.getDate())
                            + '-' + pad(now.getHours())
                            + pad(now.getMinutes())
                            + pad(now.getSeconds());
                        link.download = `board-${timestamp}.png`;
                        link.href = URL.createObjectURL(blob);
                        link.click();
                        URL.revokeObjectURL(link.href);
                    }, 'image/png');
                });
            }, 100);
        });
    }
}
