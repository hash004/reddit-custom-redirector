# Reddit Custom Redirector

A Chrome extension that automatically redirects Reddit links to your preferred custom domain or alternative Reddit frontend.

## Features

- ✅ Automatically redirect reddit.com to your custom domain
- ✅ Configurable redirect URL through popup interface
- ✅ Works with alternative Reddit frontends (old.reddit.com, libreddit instances, etc.)
- ✅ Preserves all URL paths and parameters
- ✅ Simple and clean interface

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
2. Enter your preferred Reddit domain (e.g., `old.reddit.com`, `libreddit.example.com`)
3. Click "Save"
4. All reddit.com links will now redirect to your custom domain

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