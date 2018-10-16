# Flatland Links

A simple link generator for Instagram that can be quickly be updated by pushing a change to the links.json file.

## Getting Started
Clone the repository and run `yarn` to install dev dependencies.

```
git clone https://github.com/flatlandchurch/flatland-links-js.git
cd flatland-links-js
yarn
```

To develop locally you can run `yarn start` to start a watcher so your changes will be hot-reloaded.

To build run `yarn build`. This will create all necessary files in the `build` directory.

## Deploying
Flatland Links is setup with CircleCI which will build the app then push the build files to [flatland-links-js-public](https://github.com/flatlandchurch/flatland-links-js-public).
From there Docker HUB will pick up the changes and rebuild the `flatland-links` container. On the Flatland server a services watches for changes to this container and pulls and restarts the container accordingly.

All you have to do is merge a commit into master and CI will do the rest.

## Updating Links
Links live in `links.json`, which is just an array of link objects.

### Links
| Property | Description | Required |
| --- | --- | --- |
| `url` | The url of the link will point to. If this property is not present, the link will not be included on the page. | `true` |
| `label` | The label of the link button. If this property is not present, the link will not be included on the page. | `true` |
| `featured` | Whether the label should be a featured link, using our primary button color and moved to the top of the list. If more than one `featured` links exist, they will be sorted in the order they exist in the array. | `false` |
| `displayUntil` | An IS0 8601 timestamp (in seconds) indicating when the link should no longer be displayed. This is useful for event links that will be useful to expire without needing a pull request immediately following the event. If this property is not provided link will stay until removed from links.json | `false` |
