import React from 'react';
import FlowerIcon from '../components/icons/Flower';
import CodeIcon from '../components/icons/Code';
import FolderIcon from '../components/icons/Folder';

export function renderCategory(category) {
  switch (category) {
    case 'LIFE': return <span><FlowerIcon />生活</span>;
    case 'TECH': return <span><CodeIcon />技术</span>;
    case 'OTHER': return <span><FolderIcon />其他</span>;
    default: return '';
  }
}
