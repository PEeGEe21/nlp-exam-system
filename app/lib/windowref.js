// windowRef.js
let testWindow = null;

export const openTestWindow = (id) => {
    if (testWindow) {
        testWindow.focus(); // Focus the window if it's already open
    } else {
        testWindow = window.open(`/take-test/${id}`, '_blank');
    }
};

export const closeTestWindow = () => {
    if (testWindow) {
        testWindow.close();
        testWindow = null; // Reset the reference
    }
};
