// Saves options to chrome.storage
function save_options() {
    const client = document.getElementById('client').value;
    const hideZoomColumn = document.getElementById('hideZoomColumn').checked;
    const hideTimeCodeColumn = document.getElementById('hideTimeCodeColumn').checked;
    const hideProjectColumn = document.getElementById('hideProjectColumn').checked;
    const hideTimeUnitColumn = document.getElementById('hideTimeUnitColumn').checked;
    const preventAutomaticLogout = document.getElementById('preventAutomaticLogout').checked;

    chrome.storage.sync.set({
        client,
        hideCells: {
            "Zoom": hideZoomColumn,
            "Time code": hideTimeCodeColumn,
            "Project": hideProjectColumn,
            "Time unit": hideTimeUnitColumn
        },
        preventAutomaticLogout
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 1500);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        client: '',
        hideCells: {
            "Zoom": false,
            "Time code": false,
            "Project": false,
            "Time unit": false
        },
        preventAutomaticLogout: ''
    }, function(items) {
        document.getElementById('client').value = items.client;
        document.getElementById('hideZoomColumn').checked = items.hideCells["Zoom"];
        document.getElementById('hideTimeCodeColumn').checked = items.hideCells["Time code"];
        document.getElementById('hideProjectColumn').checked = items.hideCells["Project"];
        document.getElementById('hideTimeUnitColumn').checked = items.hideCells["Time unit"];
        document.getElementById('preventAutomaticLogout').checked = items.preventAutomaticLogout;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);