import React from 'react';

const style = {
  padding: '16px 16px',
  marginTop: 64,
  background: '#666666',
  color: 'white',
};

export default function Footer({ author }) {
  return (
    <div style={style}>
      {`© - ${new Date().getFullYear()} ${author}  (^_^)/`}
    </div>
  );
}
