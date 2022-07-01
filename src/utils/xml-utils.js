const formatAvailabilities = (availabilities) => {
  return availabilities.map((availability) => {
    let regExp = /(https?:\/\/.*?)[.!?;,]?(\s+|\)|"|$)/;
    let matches = availability.match(regExp);
    let url = matches ? matches[1] : false;
    return `<p>${availability.replace(url, `<ref>${url}</ref>`)}</p>`;
  }).join('\n');
}

export const formatTag = (html) => {
  return html.replace(/ xmlns="http:\/\/www.tei-c.org\/ns\/1.0"/g, "").replace(/\s+/g,' ');
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
