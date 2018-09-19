/* eslint no-unused-expressions: "off" */
import { injectGlobal } from 'styled-components';
import styledNormalize from 'styled-normalize';
import 'katex/dist/katex.min.css';

injectGlobal`
  ${styledNormalize};
`;
