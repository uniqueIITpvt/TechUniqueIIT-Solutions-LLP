module.exports = {
  extends: [
    'next/core-web-vitals'
  ],
  rules: {
    '@next/next/no-html-link-for-pages': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/no-unescaped-entities': 'off'
  }
}; 