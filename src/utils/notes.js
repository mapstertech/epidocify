
  // Grabs all elements
  // Now has to keep all the rules about them
  // Whether it's optional, oneOrMore, zeroOrMore, optional,
  // I do want to basically "give them everything", in the sense that
  // I want them to be able to organize tabs, fill in inputs,
  // Press buttons to add things, etc,
  // And want them to basically be able to completely ignore the Epidoc format itself
  // So I can't just "look for it" as they add elements, otherwise, it's still basically restricted to them adding weird things and then more weird things
  // Want to make sure I understand what a "group", "choice", "zeroOrMore", "oneOrMore", "optional", what all these are
  // How they can be in just about any nested format (choice inside a zero, etc etc)
  // And create a kind of format that's going to be easy to pull apart for a front end


  // Try doing 3-4 randoms
  // Don't need to include the description -- that can be fetched easily on demand from the <define> element

  /*


  {
    tagName : listChange,
    canBeEmpty : true,
    canbeText : false,
    children : [{
      group : true,
      choice : false,
      refs : [{
        choice : false,
        group : false,
        zeroOrMore : true,
        oneOrMore : false,
        requiredRefNames : [],
        refNames : ["tei_desc"]
      },{
        oneOrMore : true,
        choice : true,
        group : false,
        zeroOrMore : false,
        requiredRefNames : [],
        refNames : ["tei_listChange", "tei_change"]
      }]
    }],
    attributes : ['tei_att.global.attributes', 'tei_att.sortable.attributes', 'tei_att.typed.attributes'],
    optionalAttributes : [{
      attName : "ordered",
      defaultValue : "true",
      documentation : "",
      data_type : "boolean"
    }]
  }

    tagName : editionStmt,
    canBeEmpty : true,
    canbeText : false,
    children : [{
      group : false,
      choice : true,
      refs : [{
        choice : false,
        group : false,
        zeroOrMore : false,
        oneOrMore : true,
        requiredRefNames : [],
        refNames : ["tei_model.pLike"]
      },{
        oneOrMore : true,
        choice : false,
        group : true,
        zeroOrMore : false,
        requiredRefNames : ["tei_edition"],
        refNames : ["tei_model.respLike"]
      }]
    }],
    attributes : ['tei_att.global.attributes'],
    additionalAttributes : []


    tagName : body,
    canBeEmpty : true,
    canbeText : false,
    children : [{
      group : true,
      choice : false,
      refs : [{
        choice : false,
        group : false,
        zeroOrMore : true,
        oneOrMore : false,
        optional : false,
        requiredRefNames : [],
        refNames : ["tei_model.global"]
      },{
        oneOrMore : false,
        choice : false,
        group : true,
        optional : true,
        zeroOrMore : false,
        requiredRefNames : [],
        refNames : ["tei_model.divTop"],
        children : [{
          oneOrMore : false,
          choice : true,
          group : false,
          optional : true,
          zeroOrMore : true,
          requiredRefNames : [],
          refNames : ["tei_model.global", "tei_model.divTop"],
        }]
      }]
    }],
    attributes : ['tei_att.global.attributes', 'tei_att.declaring.attributes'],
    additionalAttributes : []
  */


  /*

    Sections of an Epidoc document:

    - Metadata (title, etc)
    - The epigraphic text itself
    - Description of the text
    - History of the text
    - Translation of the text
    - Commentary on the text
    - Bibliography relevant to the text

    Each section will have a series of elements inside it as defined by epidoc creators


  */
