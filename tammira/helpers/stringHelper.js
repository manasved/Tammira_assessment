

function validateTags(tagString) {
    tagString.toLowerCase();
    let tags = tagString.split(',')
    for (let i =0 ; i < tags.length; i++) {
      tags[i] = new RegExp(["^", tags[i], "$"].join(""), "i");
    }
    return tags
}
  
module.exports = {
    validateTags
}