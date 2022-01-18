const fontFace = `
  @font-face{
      font-family: 'Hellix';
      font-style: normal;
      font-weight: normal;
      src: url('./fonts/Hellix-Medium.otf') format("opentype");
  }
  
  @font-face{
      font-family: 'Hellix';
      font-style: normal;
      font-weight: bold;
      src: url('./fonts/Hellix-SemiBold.otf') format("opentype");
  }
`;

export default (): void => {
  const style = document.createElement('style');
  style.innerHTML = fontFace;
  document.head.appendChild(style);
};
