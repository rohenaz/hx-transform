window.htmx.defineExtension("filter-response", {
  handleSwap: function (swapStyle, target, fragment, settleInfo) {
    return false;
  },
  transformResponse: function (text, xhr, request) {
    // get the hx-filter attribute from the request element
    const filter = request.getAttribute("hx-filter");

    if (filter) {
      // check if the filter contains a space
      if (filter.indexOf(":") > -1 && filter.indexOf("?") > -1) {
        // if it does, split it into an array at the punctuation
        const filters = filter.split(/[:?]/);

        // and return the value of the property named by the first item in the array
        const parsed = JSON.parse(text);
        const filterValue = parsed[filters[0].trim()];
        return filterValue === "true" || filterValue === true
          ? filters[1]
          : filters[2];
      }
      throw new Error(
        "Invalid filter. Expecxting a turnary statement. ex: 'valid ? success : error'"
      );
    }
    return text;
  },
});
