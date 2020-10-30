const createTextInlineBox = {
  // Internal id of the component
  id: 'Fact Box',
  // Visible label
  label: 'Fact Box',
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    {
      name: 'title',
      label: 'Title',
      widget: 'string',
      required: true,
      default: 'Interesting fact...',
    },
    {
      name: 'text',
      label: 'Text',
      widget: 'markdown',
      required: true,
      default: 'Text Box content here',
    },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^<div className="interesting"> ([\s\S]*?) <\/div><\/div>$/,
  // Function to extract data elements from the regexp match
  fromBlock: function (match) {
    return {
      title: match[1],
      text: match[2],
    }
  },
  // Function to create a text block from an instance of this component
  toBlock: function (obj) {
    return (
      '<div class="interesting"><h4><img src="logo/palette.png" alt="palette logo" />' +
      obj.title +
      '</h4><div><p>' +
      obj.text +
      '</p></div></div>'
    )
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function (obj) {
    return (
      '<div class="interesting"><h4><img src="logo/palette.png" alt="palette logo" />' +
      obj.title +
      '</h4><div><p>' +
      obj.text +
      '</p></div></div>'
    )
  },
}

export default createTextInlineBox
