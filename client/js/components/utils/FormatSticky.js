module.exports = function (input) {
  if(!input) return input;
  let output = input
      //replace new lines
      .replace(/(\r\n|\r|\n)/g, '<br/>')
      //replace tabs
      .replace(/\t/g, '&nbsp;&nbsp;&nbsp;');
  return output;
 };