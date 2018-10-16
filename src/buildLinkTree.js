const cx = require('classnames');

const generateLink = ({ url, featured, label }) => {
  const className = cx('cta', { primary: featured });
  return `<a href="${url}" class="${className}">${label}</a>`;
};

const linkShouldStillDisplay = (link) => link.displayUntil ? new Date() < new Date(link.displayUntil) : true;
const linkIsValid = (link) => link.url && link.label;

module.exports = (links) => links
  .filter((link) => (
    linkIsValid(link) &&
    linkShouldStillDisplay(link)
  ))
  .map(generateLink);
