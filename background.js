// Background script to initialize the extension
const DEFAULT_URL = 'old.reddit.com';

// Initialize extension on install
chrome.runtime.onInstalled.addListener(async () => {
    // Disable static rule resource to prevent conflicts
    await chrome.declarativeNetRequest.updateEnabledRulesets({
        disableRulesetIds: ['reddit_redirect_rules']
    });
    
    // Set default configuration
    await chrome.storage.sync.set({ 
        customUrl: DEFAULT_URL, 
        enabled: true 
    });
    
    // Set up initial redirect rule
    await updateRedirectRules(DEFAULT_URL, true);
    
    // Set initial badge
    await updateBadge(true);
});

// Listen for storage changes to update rules
chrome.storage.onChanged.addListener(async (changes, namespace) => {
    if (namespace === 'sync') {
        // Get current config to have all values
        const config = await chrome.storage.sync.get({ 
            customUrl: DEFAULT_URL, 
            enabled: true 
        });
        
        // Update rules if URL or enabled state changed
        if (changes.customUrl || changes.enabled) {
            await updateRedirectRules(config.customUrl, config.enabled);
        }
        
        // Update badge if enabled state changed
        if (changes.enabled) {
            await updateBadge(config.enabled);
        }
    }
});

// Update the declarative net request rules
async function updateRedirectRules(customUrl, enabled) {
    try {
        // Remove all existing dynamic rules first
        const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
        const ruleIds = existingRules.map(rule => rule.id);
        
        if (enabled) {
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
        } else {
            // Just remove all rules when disabled
            if (ruleIds.length > 0) {
                await chrome.declarativeNetRequest.updateDynamicRules({
                    removeRuleIds: ruleIds
                });
            }
            
            console.log('Redirect rules disabled');
        }
    } catch (error) {
        console.error('Error updating redirect rules:', error);
    }
}

// Update badge to show enabled/disabled state
async function updateBadge(enabled) {
    try {
        await chrome.action.setBadgeText({
            text: enabled ? '' : 'OFF'
        });
        
        await chrome.action.setBadgeBackgroundColor({
            color: enabled ? '#4CAF50' : '#dc3545'
        });
        
        await chrome.action.setTitle({
            title: `Reddit Custom Redirector - ${enabled ? 'Active' : 'Disabled'}`
        });
    } catch (error) {
        console.error('Error updating badge:', error);
    }
}