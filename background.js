// Background script to initialize the extension
const DEFAULT_URL = 'reddit.hashweb.dev';

// Initialize extension on install
chrome.runtime.onInstalled.addListener(async () => {
    // Set default configuration
    await chrome.storage.sync.set({ customUrl: DEFAULT_URL });
    
    // Set up initial redirect rule
    await updateRedirectRule(DEFAULT_URL);
});

// Listen for storage changes to update rules
chrome.storage.onChanged.addListener(async (changes, namespace) => {
    if (namespace === 'sync' && changes.customUrl) {
        const newUrl = changes.customUrl.newValue;
        await updateRedirectRule(newUrl);
    }
});

// Update the declarative net request rule
async function updateRedirectRule(customUrl) {
    try {
        // Add new rule with updated URL and unique ID
        const newRule = {
            id: Math.floor(Math.random() * 1000000) + 1,
            priority: 1,
            action: {
                type: 'redirect',
                redirect: {
                    regexSubstitution: `https://${customUrl}\\1`
                }
            },
            condition: {
                regexFilter: '^https?://(?:www\\.)?reddit\\.com(.*)',
                resourceTypes: ['main_frame']
            }
        };
        
        await chrome.declarativeNetRequest.updateDynamicRules({
            addRules: [newRule]
        });
        
        console.log(`Redirect rule updated to: ${customUrl}`);
    } catch (error) {
        console.error('Error updating redirect rule:', error);
    }
}