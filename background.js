// Background script to initialize the extension
const DEFAULT_URL = 'old.reddit.com';

// Initialize extension on install
chrome.runtime.onInstalled.addListener(async () => {
    // Disable static rule resource to prevent conflicts
    await chrome.declarativeNetRequest.updateEnabledRulesets({
        disableRulesetIds: ['reddit_redirect_rules']
    });
    
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
        // Remove all existing dynamic rules first
        const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
        const ruleIds = existingRules.map(rule => rule.id);
        
        // Create new rule with updated URL
        const newRule = {
            id: 1,
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
            removeRuleIds: ruleIds,
            addRules: [newRule]
        });
        
        console.log(`Redirect rule updated to: ${customUrl}`);
    } catch (error) {
        console.error('Error updating redirect rule:', error);
    }
}