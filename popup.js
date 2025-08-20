// Default configuration
const DEFAULT_URL = 'old.reddit.com';

// DOM elements
const customUrlInput = document.getElementById('customUrl');
const currentUrlSpan = document.getElementById('currentUrl');
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');
const messageDiv = document.getElementById('message');

// Load current configuration on popup open
document.addEventListener('DOMContentLoaded', async () => {
    const config = await loadConfig();
    customUrlInput.value = config.customUrl;
    currentUrlSpan.textContent = config.customUrl;
});

// Save button handler
saveBtn.addEventListener('click', async () => {
    const customUrl = customUrlInput.value.trim();
    
    if (!customUrl) {
        showMessage('Please enter a valid URL', 'error');
        return;
    }
    
    // Validate URL format (basic check)
    if (!isValidUrl(customUrl)) {
        showMessage('Please enter a valid domain (e.g., reddit.mysite.com)', 'error');
        return;
    }
    
    try {
        await saveConfig({ customUrl });
        currentUrlSpan.textContent = customUrl;
        showMessage('Settings saved successfully!', 'success');
    } catch (error) {
        console.error('Error saving config:', error);
        showMessage('Error saving settings', 'error');
    }
});

// Reset button handler
resetBtn.addEventListener('click', async () => {
    try {
        await saveConfig({ customUrl: DEFAULT_URL });
        customUrlInput.value = DEFAULT_URL;
        currentUrlSpan.textContent = DEFAULT_URL;
        showMessage('Settings reset to default', 'success');
    } catch (error) {
        console.error('Error resetting config:', error);
        showMessage('Error resetting settings', 'error');
    }
});

// Load configuration from storage
async function loadConfig() {
    try {
        const result = await chrome.storage.sync.get({ customUrl: DEFAULT_URL });
        return result;
    } catch (error) {
        console.error('Error loading config:', error);
        return { customUrl: DEFAULT_URL };
    }
}

// Save configuration to storage
async function saveConfig(config) {
    return chrome.storage.sync.set(config);
}


// Basic URL validation
function isValidUrl(url) {
    // Remove protocol if present
    url = url.replace(/^https?:\/\//, '');
    // Basic domain pattern check
    const domainPattern = /^[a-zA-Z0-9][a-zA-Z0-9-_.]*[a-zA-Z0-9]$/;
    return domainPattern.test(url) && url.includes('.');
}

// Show message to user
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    // Hide message after 3 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}