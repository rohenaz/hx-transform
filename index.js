window.htmx.defineExtension("transform-response", {
  transformResponse: function (text, xhr, request) {
    // get the hx-transform attribute from the request element
    const transform = request.getAttribute("hx-transform");
    if (transform) {
      const transformJs = transform.trim();
      let parsed;

      // if the response type is JSON, parse it
      if (
        xhr.getResponseHeader("Content-Type").startsWith("application/json")
      ) {
        try {
          // try to parse as JSON
          parsed = JSON.parse(text);
        } catch (e) {
          // if not JSON, just return the text
          return text;
        }
      } else if (
        xhr.getResponseHeader("Content-Type").startsWith("text/html")
      ) {
        return text;
      } else if (
        xhr.getResponseHeader("Content-Type").startsWith("text/plain")
      ) {
        return text;
      }

      // execute inline function
      if (transformJs.startsWith("function") || transformJs.startsWith("(")) {
        const transformFunction = eval(transformJs);
        return transformFunction(parsed);
      }

      // execute function by name
      const transformFunction = eval(transformJs);
      return transformFunction(parsed);
    }

    return text;
  },
});
