(()=>{var g=class{constructor(e,t,i,r){this.r=e,this.g=t,this.b=i,this.a=r}},x=class{constructor(){this.scaleX=1,this.scaleY=1,this.offsetX=0,this.offsetY=0,this.loop=!1,this._vbuffer=0,this._coord=0,this.visible=!0,this.intensity=1,this.xy=new Float32Array([]),this.numPoints=0,this.color=new g(0,0,0,1),this.webglNumPoints=0}},m=class extends x{constructor(e,t){super(),this.currentIndex=0,this.webglNumPoints=t,this.numPoints=t,this.color=e,this.xy=new Float32Array(2*this.webglNumPoints)}setX(e,t){this.xy[e*2]=t}setY(e,t){this.xy[e*2+1]=t}getX(e){return this.xy[e*2]}getY(e){return this.xy[e*2+1]}lineSpaceX(e,t){for(let i=0;i<this.numPoints;i++)this.setX(i,e+t*i)}arrangeX(){this.lineSpaceX(-1,2/this.numPoints)}constY(e){for(let t=0;t<this.numPoints;t++)this.setY(t,e)}shiftAdd(e){let t=e.length;for(let i=0;i<this.numPoints-t;i++)this.setY(i,this.getY(i+t));for(let i=0;i<t;i++)this.setY(i+this.numPoints-t,e[i])}addArrayY(e){if(this.currentIndex+e.length<=this.numPoints)for(let t=0;t<e.length;t++)this.setY(this.currentIndex,e[t]),this.currentIndex++}replaceArrayY(e){if(e.length==this.numPoints)for(let t=0;t<this.numPoints;t++)this.setY(t,e[t])}};var L=(a,e,t)=>{let i={x:0,y:0};return i.x=a.x+e.x*t,i.y=a.y+e.y*t,i},v=a=>_(-a.y,a.x),b=(a,e)=>{let t=R(a,e);return t=A(t),t},Y=(a,e)=>{let t={x:0,y:0};return t.x=a.x+e.x,t.y=a.y+e.y,t},M=(a,e)=>a.x*e.x+a.y*e.y,A=a=>{let e={x:0,y:0},t=a.x*a.x+a.y*a.y;return t>0&&(t=1/Math.sqrt(t),e.x=a.x*t,e.y=a.y*t),e},_=(a,e)=>{let t={x:0,y:0};return t.x=a,t.y=e,t},R=(a,e)=>{let t={x:0,y:0};return t.x=a.x-e.x,t.y=a.y-e.y,t},S=a=>{let e,t={x:0,y:0},i={x:0,y:0},r=[],o=(l,h)=>{r.push({vec2:l,miterLength:h})},s=l=>({x:a[l*2],y:a[l*2+1]});t=b(s(1),s(0)),e=v(t),o(e,1);let n=a.length/2;for(let l=1;l<n-1;l++){let h=s(l-1),u=s(l),f=s(l+1);t=b(u,h),e=v(t),i=b(f,u);let d=T(t,i),y=X(t,d,1);o(d,y)}return t=b(s(n-1),s(n-2)),e=v(t),o(e,1),r},T=(a,e)=>{let t=Y(a,e);return t=A(t),_(-t.y,t.x)},X=(a,e,t)=>{let i=_(-a.y,a.x);return t/M(e,i)},w=class extends x{constructor(e,t,i){super(),this.currentIndex=0,this._thicknessRequested=0,this._actualThickness=0,this.webglNumPoints=t*2,this.numPoints=t,this.color=e,this._thicknessRequested=i,this._linePoints=new Float32Array(t*2),this.xy=new Float32Array(2*this.webglNumPoints)}convertToTriPoints(){let e=this._actualThickness/2,t=S(this._linePoints);for(let i=0;i<this.numPoints;i++){let r=this._linePoints[2*i],o=this._linePoints[2*i+1],s={x:r,y:o},n=L(s,t[i].vec2,t[i].miterLength*e),l=L(s,t[i].vec2,-t[i].miterLength*e);this.xy[i*4]=n.x,this.xy[i*4+1]=n.y,this.xy[i*4+2]=l.x,this.xy[i*4+3]=l.y}}setX(e,t){this._linePoints[e*2]=t}setY(e,t){this._linePoints[e*2+1]=t}lineSpaceX(e,t){for(let i=0;i<this.numPoints;i++)this.setX(i,e+t*i)}setThickness(e){this._thicknessRequested=e}getThickness(){return this._thicknessRequested}setActualThickness(e){this._actualThickness=e}},p=class{constructor(e,t){this.debug=!1,this.addLine=this.addDataLine,t==null?this.webgl=e.getContext("webgl",{antialias:!0,transparent:!1}):(this.webgl=e.getContext("webgl",{antialias:t.antialias,transparent:t.transparent,desynchronized:t.deSync,powerPerformance:t.powerPerformance,preserveDrawing:t.preserveDrawing}),this.debug=t.debug==null?!1:t.debug),this.log("canvas type is: "+e.constructor.name),this.log(`[webgl-plot]:width=${e.width}, height=${e.height}`),this._linesData=[],this._linesAux=[],this._thickLines=[],this._surfaces=[],this.gScaleX=1,this.gScaleY=1,this.gXYratio=1,this.gOffsetX=0,this.gOffsetY=0,this.gLog10X=!1,this.gLog10Y=!1,this.webgl.clear(this.webgl.COLOR_BUFFER_BIT),this.webgl.viewport(0,0,e.width,e.height),this._progLine=this.webgl.createProgram(),this.initThinLineProgram(),this.webgl.enable(this.webgl.BLEND),this.webgl.blendFunc(this.webgl.SRC_ALPHA,this.webgl.ONE_MINUS_SRC_ALPHA)}get linesData(){return this._linesData}get linesAux(){return this._linesAux}get thickLines(){return this._thickLines}get surfaces(){return this._surfaces}_drawLines(e){let t=this.webgl;e.forEach(i=>{if(i.visible){t.useProgram(this._progLine);let r=t.getUniformLocation(this._progLine,"uscale");t.uniformMatrix2fv(r,!1,new Float32Array([i.scaleX*this.gScaleX*(this.gLog10X?1/Math.log(10):1),0,0,i.scaleY*this.gScaleY*this.gXYratio*(this.gLog10Y?1/Math.log(10):1)]));let o=t.getUniformLocation(this._progLine,"uoffset");t.uniform2fv(o,new Float32Array([i.offsetX+this.gOffsetX,i.offsetY+this.gOffsetY]));let s=t.getUniformLocation(this._progLine,"is_log");t.uniform2iv(s,new Int32Array([this.gLog10X?1:0,this.gLog10Y?1:0]));let n=t.getUniformLocation(this._progLine,"uColor");t.uniform4fv(n,[i.color.r,i.color.g,i.color.b,i.color.a]),t.bufferData(t.ARRAY_BUFFER,i.xy,t.STREAM_DRAW),t.drawArrays(i.loop?t.LINE_LOOP:t.LINE_STRIP,0,i.webglNumPoints)}})}_drawSurfaces(e){let t=this.webgl;e.forEach(i=>{if(i.visible){t.useProgram(this._progLine);let r=t.getUniformLocation(this._progLine,"uscale");t.uniformMatrix2fv(r,!1,new Float32Array([i.scaleX*this.gScaleX*(this.gLog10X?1/Math.log(10):1),0,0,i.scaleY*this.gScaleY*this.gXYratio*(this.gLog10Y?1/Math.log(10):1)]));let o=t.getUniformLocation(this._progLine,"uoffset");t.uniform2fv(o,new Float32Array([i.offsetX+this.gOffsetX,i.offsetY+this.gOffsetY]));let s=t.getUniformLocation(this._progLine,"is_log");t.uniform2iv(s,new Int32Array([this.gLog10X?1:0,this.gLog10Y?1:0]));let n=t.getUniformLocation(this._progLine,"uColor");t.uniform4fv(n,[i.color.r,i.color.g,i.color.b,i.color.a]),t.bufferData(t.ARRAY_BUFFER,i.xy,t.STREAM_DRAW),t.drawArrays(t.TRIANGLE_STRIP,0,i.webglNumPoints)}})}_drawTriangles(e){let t=this.webgl;t.bufferData(t.ARRAY_BUFFER,e.xy,t.STREAM_DRAW),t.useProgram(this._progLine);let i=t.getUniformLocation(this._progLine,"uscale");t.uniformMatrix2fv(i,!1,new Float32Array([e.scaleX*this.gScaleX*(this.gLog10X?1/Math.log(10):1),0,0,e.scaleY*this.gScaleY*this.gXYratio*(this.gLog10Y?1/Math.log(10):1)]));let r=t.getUniformLocation(this._progLine,"uoffset");t.uniform2fv(r,new Float32Array([e.offsetX+this.gOffsetX,e.offsetY+this.gOffsetY]));let o=t.getUniformLocation(this._progLine,"is_log");t.uniform2iv(o,new Int32Array([0,0]));let s=t.getUniformLocation(this._progLine,"uColor");t.uniform4fv(s,[e.color.r,e.color.g,e.color.b,e.color.a]),t.drawArrays(t.TRIANGLE_STRIP,0,e.xy.length/2)}_drawThickLines(){this._thickLines.forEach(e=>{if(e.visible){let t=Math.min(this.gScaleX,this.gScaleY);e.setActualThickness(e.getThickness()/t),e.convertToTriPoints(),this._drawTriangles(e)}})}update(){this.clear(),this.draw()}draw(){this._drawLines(this.linesData),this._drawLines(this.linesAux),this._drawThickLines(),this._drawSurfaces(this.surfaces)}clear(){this.webgl.clear(this.webgl.COLOR_BUFFER_BIT)}_addLine(e){e._vbuffer=this.webgl.createBuffer(),this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER,e._vbuffer),this.webgl.bufferData(this.webgl.ARRAY_BUFFER,e.xy,this.webgl.STREAM_DRAW),e._coord=this.webgl.getAttribLocation(this._progLine,"coordinates"),this.webgl.vertexAttribPointer(e._coord,2,this.webgl.FLOAT,!1,0,0),this.webgl.enableVertexAttribArray(e._coord)}addDataLine(e){this._addLine(e),this.linesData.push(e)}addAuxLine(e){this._addLine(e),this.linesAux.push(e)}addThickLine(e){this._addLine(e),this._thickLines.push(e)}addSurface(e){this._addLine(e),this.surfaces.push(e)}initThinLineProgram(){let e=`
      attribute vec2 coordinates;
      uniform mat2 uscale;
      uniform vec2 uoffset;
      uniform ivec2 is_log;

      void main(void) {
         float x = (is_log[0]==1) ? log(coordinates.x) : coordinates.x;
         float y = (is_log[1]==1) ? log(coordinates.y) : coordinates.y;
         vec2 line = vec2(x, y);
         gl_Position = vec4(uscale*line + uoffset, 0.0, 1.0);
      }`,t=this.webgl.createShader(this.webgl.VERTEX_SHADER);this.webgl.shaderSource(t,e),this.webgl.compileShader(t);let i=`
         precision mediump float;
         uniform highp vec4 uColor;
         void main(void) {
            gl_FragColor =  uColor;
         }`,r=this.webgl.createShader(this.webgl.FRAGMENT_SHADER);this.webgl.shaderSource(r,i),this.webgl.compileShader(r),this._progLine=this.webgl.createProgram(),this.webgl.attachShader(this._progLine,t),this.webgl.attachShader(this._progLine,r),this.webgl.linkProgram(this._progLine)}popDataLine(){this.linesData.pop()}removeAllLines(){this._linesData=[],this._linesAux=[],this._thickLines=[],this._surfaces=[]}removeDataLines(){this._linesData=[]}removeAuxLines(){this._linesAux=[]}viewport(e,t,i,r){this.webgl.viewport(e,t,i,r)}log(e){this.debug&&console.log("[webgl-plot]:"+e)}};var c=class{constructor(){this.plots={}}initPlot(e,t){if(t||(t=new p(e.canvas,e.webglOptions)),!e._id){e._id=`plot${Math.floor(Math.random()*1e15)}`;let o={plot:t,settings:e};this.plots[e._id]=o}e.overlay&&(typeof e.overlay!="object"&&(e.overlay=document.createElement("canvas"),e.overlay.style.position="absolute",e.overlay.width=e.canvas.width,e.overlay.height=e.canvas.height,e.canvas.appendChild(e.overlay)),e.overlayCtx=e.overlay.getContext("2d"));let i=0,r=Object.keys(e.lines).length;e.nLines=r;for(let o in e.lines){let s=e.lines[o];if(s.color)Array.isArray(s.color)&&(s.color=new g(...s.color));else{let l=c.HSLToRGB(360*(i/r)%360,100,50);s.color=new g(...l,1)}let n;if(s.nPoints?n=s.nPoints:s.nSec&&s.sps?n=Math.ceil(s.nSec*s.sps):s.values&&(n=s.values.length),!n)return;if(s.points=n,s.width?s.line=new w(s.color,n,s.width):s.line=new m(s.color,n),s.line.arrangeX(),s.values){if(e.overlay){let l=Math.max(...s.values),h=Math.min(...s.values);s.ymin=h,s.ymax=l}s.values.length!==n&&(s.interpolate?s.values.length>n?s.values=c.downsample(s.values,n):s.values.length<n&&(s.values=c.upsample(s.values,n)):s.values.length>s.points?s.values=s.values.slice(s.values.length-s.points):s.values=[...new Array(s.points-s.values.length).fill(0),...s.values])}else s.values=new Array(n).fill(0);if("autoscale"in s||(s.autoscale=!0),s.position||(s.position=i),s.autoscale&&(s.values=c.autoscale(s.values,s.position?s.position:i,r,s.centerZero)),s.values.forEach((l,h)=>s.line.setY(h,l)),t.addDataLine(s.line),"xAxis"in s||(s.xAxis=!0),s.xAxis){s.xColor&&(Array.isArray(s.xColor)?s.xColor=new g(...s.xColor):s.xColor=new g(1,1,1,.3));let l=new m(s.xColor,2);s.autoscale?l.constY((i+1)*2/r-1-1/r):l.constY(.5),l.arrangeX(),s.x=l,t.addAuxLine(l)}if(r>1&&s.autoscale&&i!==r-1){e.dividerColor?Array.isArray(e.dividerColor)&&(e.dividerColor=new g(...e.dividerColor)):e.dividerColor=new g(1,1,1,1);let l=new m(e.dividerColor,2);l.constY((i+1)*2/r-1),l.arrangeX(),s.divider=l,t.addAuxLine(l)}i++}return this.plots[e._id]}deinitPlot(e){return e.plot.clear(),e.plot.removeAllLines(),!0}reinitPlot(e,t){return e.plot.clear(),e.plot.removeAllLines(),this.initPlot(t,e.plot)}update(e,t,i=!0){if(typeof e=="string"&&(e=this.plots[e]),!!e){if(t){for(let r in t)if(e.settings.lines[r]){let o=e.settings.lines[r];if(Object.assign(o,t[r]),o.values){if(e.settings.overlay){let s=Math.max(...o.values),n=Math.min(...o.values);o.ymin=n,o.ymax=s}o.values.length!==o.points&&(o.interpolate?o.values.length>o.points?o.values=c.downsample(o.values,o.points):o.values.length<o.points&&(o.values=c.upsample(o.values,o.points)):o.values.length>o.points?o.values=o.values.slice(o.values.length-o.points):o.values=[...new Array(o.points-o.values.length).fill(0),...o.values]),o.autoscale&&(o.values=c.autoscale(o.values,o.position,e.settings.nLines,o.centerZero)),o.values.forEach((s,n)=>o.line.setY(n,s))}}}if(typeof e.settings.overlay=="object"){let r=e.settings.overlay,o=e.settings.overlayCtx;o.clearRect(0,0,e.settings.overlay.width,e.settings.overlay.height),o.font="1em Courier",o.fillStyle="white";for(let s in e.settings.lines){let n=e.settings.lines[s];o.fillText(s,20,r.height*(n.position+.1)/e.settings.nLines),o.fillText(n.ymax,r.width-70,r.height*(n.position+.1)/e.settings.nLines),o.fillText(n.ymin,r.width-70,r.height*(n.position+.9)/e.settings.nLines)}}i&&e.plot.update()}}updateLine(e,t,i,r,o,s,n){return e.numPoints!==t.length&&(i?e.numPoints>t.length?t=c.downsample(t,e.numPoints):e.numPoints<t.length&&(t=c.upsample(t,e.numPoints)):t=t.slice(t.length-e.numPoints)),r&&(t=c.autoscale(t,o,s,n)),t.forEach((l,h)=>e.setY(h,l)),!0}static autoscale(e,t=0,i=1,r=!1){if(e?.length===0)return e;let o=Math.max(...e),s=Math.min(...e),n=1/i,l;if(r){let h=Math.max(Math.abs(s),Math.abs(o));return l=n/h,e.map(u=>u*l+(n*(t+1)*2-1-n))}else return l=n/(o-s),e.map(h=>2*((h-s)*l-1/(2*i))+(n*(t+1)*2-1-n))}static absmax(e){return Math.max(Math.abs(Math.min(...e)),Math.max(...e))}static downsample(e,t,i=1){if(e.length>t){let r=new Array(t),o=e.length/t,s=e.length-1,n=0,l=0;for(let h=o;h<e.length;h+=o){let u=Math.round(h);u>s&&(u=s);for(let f=n;f<u;f++)r[l]+=e[f];r[l]/=(u-n)*i,l++,n=u}return r}else return e}static upsample(e,t,i=1){var r=function(d,y,P){return(d+(y-d)*P)*i},o=new Array(t),s=(e.length-1)/(t-1);o[0]=e[0];for(var n=1;n<t-1;n++){var l=n*s,h=Math.floor(l),u=Math.ceil(l),f=l-h;o[n]=r(e[h],e[u],f)}return o[t-1]=e[e.length-1],o}static HSLToRGB(e,t,i){t/=100,i/=100;let r=(1-Math.abs(2*i-1))*t,o=r*(1-Math.abs(e/60%2-1)),s=i-r/2,n=0,l=0,h=0;return 0<=e&&e<60?(n=r,l=o,h=0):60<=e&&e<120?(n=o,l=r,h=0):120<=e&&e<180?(n=0,l=r,h=o):180<=e&&e<240?(n=0,l=o,h=r):240<=e&&e<300?(n=o,l=0,h=r):300<=e&&e<360&&(n=r,l=0,h=o),n=Math.round((n+s)*255),l=Math.round((l+s)*255),h=Math.round((h+s)*255),[n,l,h]}static circularBuffer(e,t){return t.length<e.length?e.splice(0,e.length-t.length,...e.slice(t.length)).splice(e.length-t.length,e.length,...t):t.length>e.length?e.splice(0,e.length,t.slice(t.length-e.length)):e.splice(0,e.length,...t),e}};})();
