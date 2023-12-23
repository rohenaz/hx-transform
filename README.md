# hx-transform

To install via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/hx-transform/index.js" defer></script>
```

or via npm if you prefer:

```
npm i htmx-filter
```

Then add the following to your HTML:

```html
<script src="/path/to/htmx.js"></script>
<script src="/node_modules/hx-transform/index.js"></script>
```

# Example Usage

Lets say we have an endpoint that returns JSON like this:

```json
{
  "success": true,
  "message": "Profile saved successfully"
}
```

```html
<div id="save-profile-status" hx-ext="remove-me" class="flex mb-2"></div>

<button
  type="submit"
  class="btn btn-primary bg-primary text-primary-content"
  hx-post="/profile"
  hx-target="#save-profile-status"
  hx-ext="transform-response"
  hx-transform="(response) => response.success ? <div remove-me='3s'>success</div> : error"
>
  Save
</button>
```
