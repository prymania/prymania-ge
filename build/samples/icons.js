const React=require('react'); const RDS=require('react-dom/server'); const sharp=require('sharp');
module.exports=async function icon(Comp,color,size=256){
  const svg=RDS.renderToStaticMarkup(React.createElement(Comp,{color:'#'+color,size:String(size)}));
  const buf=await sharp(Buffer.from(svg)).resize(size,size).png().toBuffer();
  return 'image/png;base64,'+buf.toString('base64');
};
