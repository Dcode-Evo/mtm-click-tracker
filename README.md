# Matomo click tracker vanilla JS

This script allows to track click events in Matomo by adding html attributes on elements to track.

Matomo must be already present in the page.

## Get started

- Install `@dcode-evo/mtm-click-tracker` package into the project
  - via GitHub package npm
    repository `@dcode-evo:registry=https://npm.pkg.github.com` ([Working with the npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry))
  ```shell
  npm install @dcode-evo/mtm-click-tracker
  ``` 
  - via local package file
  ```shell
  npm install file://./dcode-evo-mtm-tracker-1.0.0.tgz
  ```
- Add script `mtm-ct-auto.js` into your html file
  ```html
  <head>
    ...
    <script src="node_modules/@dcode-evo/mtm-click-tracker/dist/mtm-ct-auto.js"></script>
  </head>
  ```

## Run demos

- HTML/JS `npm run demo`
- Angular `npm run demo-ng`

## Track clicks on elements

Add specific attributes on element you want to track

```html

<a
  data-mtm-click
  data-mtm-category="my-click-category"
  data-mtm-action="click-on-link"
  data-mtm-name="link-with-tracking"
  data-mtm-value="1"
  href="#"
>Click me</a>
```

or

```html
<!-- order is important: "category, action, name, value" -->
<a
  data-mtm-click="my-click-category, click-on-link, link-with-tracking, 1"
  href="#"
>Click me</a>
```

## Non-auto init script + debug

- Add script `mtm-click-tracker.js`
  ```html
  <head>
    ...
    <script src="node_modules/@dcode-evo/mtm-click-tracker/dist/mtm-click-tracker.js"></script>
    <!-- Init MtmClickTracker with debug enabled -->
    <script>
      // passing `true` will enable debug and log tracking data on every click on "tracked" elements into console.
      var tracker = new MatomoClickTracker(true);
    </script>
  </head>
  ```

### Destroy click listener

You can destroy the click tracker event listener by calling `destroy()` method.

```html

<script src="node_modules/@dcode-evo/mtm-click-tracker/dist/mtm-click-tracker.js">;</script>
<script>
  var tracker = new MatomoClickTracker();

  function kill() {
    tracker.destroy();
  }
</script>
```

## Framework independent

This script is a Vanilla JS (written in TypeScript) and can run beside any framework.

[Checkout integration with Angular example](./demo/ng15/README.md)
