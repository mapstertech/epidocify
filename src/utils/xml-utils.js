const formatAvailabilities = (availabilities) => {
  return availabilities.map((availability) => {
    let regExp = /\(([^)]+)\)/;
    let matches = availability.match(regExp);
    let url = matches ? matches[1] : false;
    return `<p>${availability.split('(')[0]} ${url ? `(<ref>${url}</ref>)` : ''}</p>`;
  }).join('\n');
}

export const dataAndTags = [{
  data : 'general.title',
  tag : 'title',
  parent : 'titleStmt'
},{
  data : 'general.authority',
  tag : 'authority',
  parent : 'publicationStmt'
},{
  data : 'general.idNumber',
  tag : 'idno',
  parent : 'publicationStmt',
  atts : ["type|filename"]
},{
  data : 'general.availabilities',
  tag : 'availability',
  parent : 'publicationStmt',
  formatting : formatAvailabilities
},{
  data : 'description.sourceData',
  tag : 'support',
  parent : 'supportDesc'
}]
