import React from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';

const defaultOptions = {
  allowedTags: ['h2', 'h1', 'blockquote', 'p', 'a', 'ul', 'ol',
    'nl', 'li', 'b', 'i', 'u', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre'],
  allowedAttributes: {
    a: ['href'],
  },
  allowedIframeHostnames: ['www.youtube.com'],
};

const sanitize = (dirty, options = defaultOptions) => ({
  __html: sanitizeHtml(dirty, options),
});

const SanitizeHTML = ({ children }) => (
  <div dangerouslySetInnerHTML={sanitize(children)} />
);
SanitizeHTML.propTypes = {
  children: PropTypes.string,
};
SanitizeHTML.defaultProps = {
  children: '',
};

export default SanitizeHTML;
