const utils = {}


utils.toRandomCase = function (string) {
  return string
    .split("")
    .map((char) => (Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()))
    .join("");
}

module.exports = utils.toRandomCase 