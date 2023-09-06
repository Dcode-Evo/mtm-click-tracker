# MTM CLICK TRACKER integration with Angular demo

This app demonstrates integration of the MatomoClickTracker vanilla JS library into an Angular App.

## Get started

- Install `@dcode-evo/mtm-click-tracker` package into the project
  - via GitHub package npm repository
  ```shell
    npm install @dcode-evo/mtm-click-tracker
  ``` 
  - via local package file
  ```shell
    npm install file://./dcode-evo-mtm-tracker-1.0.0.tgz
  ```
  - Add script "node_modules/@dcode-evo/mtm-click-tracker/dist/mtm-ct-auto.js" into angular.json config
    `projects/PROJECT_NAME/architect/build/options/scripts`
    ```json
    {
      "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
      "projects": {
        "PROJECT_NAME": {
          "architect": {
            "build": {
              ...
              "options": {
                ...
                "scripts": [
                  ...
                  "node_modules/@dcode-evo/mtm-click-tracker/dist/mtm-ct-auto.js"
                ]
              }
    ...
    ```

## Track clicks on elements

Add specific attributes on element you want to track

```html

<element
  data-mtm-click
  data-mtm-category="my-click-category"
  data-mtm-action="click-on-link"
  data-mtm-name="link-with-tracking"
  data-mtm-value="1"
></element>
```

or

```html

<element
  data-mtm-click="my-click-category, click-on-link, link-with-tracking, 1"
></element>
```

## Debug click data

Every click on "tracked" elements will log provided data into console.

- Add script non-auto JS instead of `"node_modules/@dcode-evo/mtm-click-racker/dist/mtm-ct-auto.js"`
  ```json
  {
    ...
    scripts: [
      ...
      {
        "input": "node_modules/@dcode-evo/mtm-click-tracker/dist/mtm-click-tracker.js",
        "inject": false,
        "bundleName": "mtm"
      }
    ]
  ...
  ```
- Include script into main `index.html` file
  ```angular2html
  <head>
    ...
    <script src="mtm.js"></script>
    <script>var tracker = new MatomoClickTracker(true);</script>
  </head>
  ```
