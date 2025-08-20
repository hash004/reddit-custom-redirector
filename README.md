# Reddit Custom Redirector

A Chrome extension that automatically redirects Reddit links to your preferred custom domain or alternative Reddit frontend.

## Features

- ✅ Automatically redirect reddit.com to your custom domain
- ✅ **Easy toggle to enable/disable redirects** with visual feedback
- ✅ Configurable redirect URL through popup interface
- ✅ Works with alternative Reddit frontends (old.reddit.com, libreddit instances, etc.)
- ✅ Preserves all URL paths and parameters
- ✅ **Extension badge shows enabled/disabled status**
- ✅ Simple and clean interface with modern toggle switch

## Installation

### From Chrome Web Store
1. Visit the Chrome Web Store (coming soon)
2. Click "Add to Chrome"
3. Configure your preferred Reddit domain

### Manual Installation (Development)
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension directory
5. Click on the extension icon to configure your redirect URL

## Usage

1. Click the extension icon in your Chrome toolbar
2. **Toggle the "Enable Redirects" switch** to turn redirects on/off
3. Enter your preferred Reddit domain (e.g., `old.reddit.com`, `libreddit.example.com`)
4. Click "Save"
5. All reddit.com links will now redirect to your custom domain

### Quick Controls
- **Extension Badge**: Shows "OFF" when disabled, no badge when active
- **Toggle Switch**: Instantly enable/disable redirects without changing your URL
- **Visual Status**: Clear "Active" or "Disabled" status in the popup

## Supported Use Cases

- Redirect to old Reddit interface (`old.reddit.com`)
- Use privacy-focused Reddit frontends (Libreddit, Teddit)
- Custom Reddit instances or mirrors
- Any domain that maintains Reddit's URL structure

## Privacy

This extension:
- Only processes reddit.com URLs
- Stores your preferences locally in Chrome
- Does not collect or transmit any personal data
- Works entirely offline after configuration

## Permissions

- `declarativeNetRequest`: Required to redirect reddit.com URLs
- `storage`: Required to save your redirect preferences
- `host_permissions`: Limited to reddit.com domains only

## Development

Built with Manifest V3 for modern Chrome extensions.

## License

MIT License - see LICENSE file for details.