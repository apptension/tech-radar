// @ts-ignore
import hellixMediumOtf from './fonts/Hellix-Medium.otf';
// @ts-ignore
import hellixSemiBoldOtf from './fonts/Hellix-SemiBold.otf';

import '@fontsource/space-grotesk/500.css';

const fontFace = `
  @font-face{
      font-family: 'Hellix';
      font-style: normal;
      font-weight: 500;
      src: url(${hellixMediumOtf}) format("opentype");
  }
  
  @font-face{
      font-family: 'Hellix';
      font-style: normal;
      font-weight: 600;
      src: url(${hellixSemiBoldOtf}) format("opentype");
  }
`;

export default (): void => {
  const style = document.createElement('style');
  style.innerHTML = fontFace;
  document.head.appendChild(style);
};
