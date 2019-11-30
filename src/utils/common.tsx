import React from 'react';
import FlowerIcon from '../components/icons/Flower';
import CodeIcon from '../components/icons/Code';
import FolderIcon from '../components/icons/Folder';

import createHash from 'create-hash';
import {Category} from '../types/Category';

export function renderCategory(category: Category) {
  switch (category) {
    case Category.LIFE: return <span><FlowerIcon />生活</span>;
    case Category.TECH: return <span><CodeIcon />技术</span>;
    case Category.OTHER: return <span><FolderIcon />其他</span>;
    default: return '';
  }
}

export function md5(x: string) {
  return createHash('md5').update(x).digest('hex');
}
