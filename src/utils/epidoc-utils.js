import $ from 'jquery';

// Gets a list of attributes for any given XML tag (allowed attributes)
// Also gets their documentation and allowed values
// export function getReferencedAttributes(attrName) {
//   let attributeList = {};
//   let childRefs = $(xmlDoc).find(`define[name="${attrName}"] > ref`)
//   // If there are any further child refs
//   attributeList[attrName] = {};
//   if($(childRefs).length) {
//     $(childRefs).each(function() {
//       let subAttributeName = $(this).attr('name')
//       attributeList[subAttributeName] = getReferencedAttributes(subAttributeName);
//     });
//   } else {
//     return $(this).attr('name');
//   }
//   return attributeList;
// }

// Remove the prefix on the tags
export function getReadableTag(attributeName) {
  let attrTag = attributeName.replace('tei_', '')
  return `${attrTag}`;
}



export const getElements = (epidocXML, refNames) => {
  let elementObject = {};
  refNames.forEach(thisRefName => {
    let thisDefinitionElement = $(epidocXML).find(`define[name="${thisRefName}"]`);
    let elementTagName = thisDefinitionElement.find('element').attr('name');
    let rootElements = thisDefinitionElement.find('element > group > ref');
    if(rootElements.length > 0) {
      let elementRefNames = [];
      rootElements.each(function() {
        elementRefNames.push({
          tagName : $(this).attr('name'),
          canBeEmpty : $('element > empty').length > 0 ? true : false,
          canBeText : $('element > text').length > 0 ? true : false,
        });
      })
      elementObject[elementTagName] = getElements(elementRefNames);
    } else {
      elementObject[elementTagName] = {};
    }
  })
  return elementObject;
}

export const getDefinition = (epidocXML, refName) => {
  let thisDefinitionElement = $(epidocXML).find(`define[name="${refName}"]`);
  console.log(thisDefinitionElement.children())
  const thisDefinition = {
    element : thisDefinitionElement.find('element').attr('name'),
    documentation : thisDefinitionElement.find(`a\\:documentation`).text(),
  };
  console.log(thisDefinitionElement.find('element >').children())
  thisDefinitionElement.find('element').children().each(function() {
    if(!$(this).is(`a\\:documentation`)) {
      let nodeName = $(this).prop('nodeName');
      thisDefinition[nodeName] = {};
      loopChildren(thisDefinition[nodeName], $(this));

      function loopChildren(defObject, node) {
        if(node.children().length > 0) {
          node.children().each(function() {
            let childName = $(this).prop('nodeName');
            defObject[childName] = {};
            loopChildren(defObject[childName], $(this));
          })
        }
      }
    }
  })
  return thisDefinition
  // let elementTagName = thisDefinitionElement.find('element').attr('name');
  // let elementTagName = thisDefinitionElement.find('element').attr('name');
  // let rootElements = thisDefinitionElement.find('element > group > ref');
}

const getDefinitionChildren = (node) => {
  // console.log(node)
  let child = {
    element : $(this).prop('nodeName')
  }
  console.log($(this).attr('name'))
  if(typeof $(this).attr('name') !== 'undefined') {
    child.atts = $(this).attr('name')
  }
  if(node.children().length > 0) {
    node.children().each(function() {
      child.children = getDefinitionChildren($(this));
    })
  }
  return child;
}
