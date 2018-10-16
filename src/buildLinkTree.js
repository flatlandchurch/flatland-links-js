const cx = require('classnames');

const generateLink = ({ url, featured, label, displayUntil }) => {
  const className = cx('cta', { primary: featured, expires: Boolean(displayUntil) });
  if (displayUntil) {
    return `<a href="${url}" class="${className}" data-display-until="${displayUntil}">${label}</a>`;
  }
  return `<a href="${url}" class="${className}">${label}</a>`;
};

const linkIsValid = (link) => link.url && link.label;

module.exports = (links) => {
  const baseLinks = links
    .filter(linkIsValid);

  const featuredLinks = baseLinks.filter((link) => link.featured);
  const standardLinks = baseLinks.filter((link) => !link.featured);
  return ([
    ...featuredLinks,
    ...standardLinks,
  ]).map(generateLink);
};
