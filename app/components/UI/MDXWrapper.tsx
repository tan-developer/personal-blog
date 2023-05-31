'use client'

import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { CodePen, Gist } from 'mdx-embed';

const components = {
  CodePen,
  Gist,
};

const MDXProviders = (props : any) => <MDXProvider components={components}>{props.children}</MDXProvider>;

export default MDXProviders