
// Gets a list of attributes for any given XML tag (allowed attributes)
// Also gets their documentation and allowed values
export function getReferencedAttributes(attrName) {
  let attributeList = {};
  let childRefs = $(xmlDoc).find(`define[name="${attrName}"] > ref`)
  // If there are any further child refs
  attributeList[attrName] = {};
  if($(childRefs).length) {
    $(childRefs).each(function() {
      let subAttributeName = $(this).attr('name')
      attributeList[subAttributeName] = getReferencedAttributes(subAttributeName);
    });
  } else {
    return $(this).attr('name');
  }
  return attributeList;
}

// Remove the prefix on the tags
export function getReadableTag(attributeName) {
  let attrTag = attributeName.replace('tei_', '')
  return `${attrTag}`;
}



// const getElements = (refNames) => {
//   let elementObject = {};
//   refNames.forEach(thisRefName => {
//     let elementTagName = thisDefinitionElement.find('element').attr('name');
//     let thisDefinitionElement = $(epidocXML).find(`define[name="${thisRefName}"]`);
//     let rootElements = thisDefinitionElement.find('element > group > ref');
//     if(rootElements.length > 0) {
//       let elementRefNames = [];
//       rootElements.each(function() {
//         elementRefNames.push({
//           tagName : $(this).attr('name'),
//
//         });
//       })
//       elementObject[elementTagName] = getElements(elementRefNames);
//     } else {
//       elementObject[elementTagName] = {};
//     }
//   })
//   return elementObject;
// }
