import React, { Fragment, useEffect } from "react";
import { withSelect } from "store";
import { compose } from "./components/compose";
import Docker from "./components/Docker";
import Canvas from "./Canvas";
import { generatFontLink } from "./style-blocks/add-style-rules";

const Builder = (props) => {
  const { fonts = [] } = props;

  // Load fonts and other assets
  useEffect(() => {
    // generatFontLink(fonts);
  }, []);

  return (
    <Fragment>
      <Canvas />
      <Docker />
    </Fragment>
  );
};

export default compose([
  withSelect((select) => {
    const { getFonts } = select();
    return {
      fonts: getFonts(),
    };
  }),
])(Builder);
