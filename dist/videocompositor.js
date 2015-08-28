var VideoCompositor=function(e){function t(i){if(r[i])return r[i].exports;var a=r[i]={exports:{},id:i,loaded:!1};return e[i].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e)){var r=[],i=!0,a=!1,o=void 0;try{for(var n,s=e[Symbol.iterator]();!(i=(n=s.next()).done)&&(r.push(n.value),!t||r.length!==t);i=!0);}catch(l){a=!0,o=l}finally{try{!i&&s["return"]&&s["return"]()}finally{if(a)throw o}}return r}throw new TypeError("Invalid attempt to destructure non-iterable instance")}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e){g.push(e)}function s(e){void 0===p&&(p=e);for(var t=(e-p)/1e3,r=0;r<g.length;r++)g[r].update(t);p=e,requestAnimationFrame(s)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),u=r(1),c=i(u),f=r(3),d=i(f),h=r(4),v=i(h),g=[],p=void 0,m=new Map;m.set("video",c["default"]).set("image",d["default"]).set("canvas",v["default"]),s();var _=function(){function e(t){o(this,e),this._canvas=t,this._ctx=this._canvas.getContext("experimental-webgl",{preserveDrawingBuffer:!0,alpha:!1}),this._playing=!1,this._mediaSources=new Map,this._mediaSourcePreloadNumber=2,this._playlist=void 0,this._eventMappings=new Map,this._effectShaderPrograms=new Map,this._transitionShaderPrograms=new Map,this._mediaSourceListeners=new Map;var r=e.createEffectShaderProgram(this._ctx);this._effectShaderPrograms.set("default",r),this._currentTime=0,this.duration=0,n(this)}return l(e,[{key:"play",value:function(){this._playing=!0;var e=new CustomEvent("play",{detail:{data:this._currentTime,instance:this}});this._canvas.dispatchEvent(e)}},{key:"pause",value:function(){this._playing=!1,this._mediaSources.forEach(function(e){e.pause()});var e=new CustomEvent("pause",{detail:{data:this._currentTime,instance:this}});this._canvas.dispatchEvent(e)}},{key:"addEventListener",value:function(e,t){this._eventMappings.has(e)?this._eventMappings.get(e).push(t):this._eventMappings.set(e,[t]),this._canvas.addEventListener(e,this._dispatchEvents,!1)}},{key:"removeEventListener",value:function(e,t){if(this._eventMappings.has(e)){var r=this._eventMappings.get(e),i=r.indexOf(t);if(-1!==i)return r.splice(i,1),!0}return!1}},{key:"registerMediaSourceListener",value:function(e,t){this._mediaSourceListeners.has(e)?this._mediaSourceListeners.get(e).push(t):this._mediaSourceListeners.set(e,[t])}},{key:"_dispatchEvents",value:function(e){for(var t=0;t<e.detail.instance._eventMappings.get(e.type).length;t++)e.detail.instance._eventMappings.get(e.type)[t](e.detail.data)}},{key:"_getPlaylistPlayingStatusAtTime",value:function(e,t){for(var r=[],i=[],a=[],o=0;o<e.tracks.length;o++)for(var n=e.tracks[o],s=0;s<n.length;s++){var l=n[s],u=l.start+l.duration;t>u?a.push(l):t>l.start&&u>t?i.push(l):t<=l.start&&r.push(l)}return[r,i,a]}},{key:"_sortMediaSourcesByStartTime",value:function(e){return e.sort(function(e,t){return e.start-t.start}),e}},{key:"_getEffectFromMediaSource",value:function(e){for(var t=this._playlist.effects,r=Object.keys(t),i=0;i<r.length;i++){var a=r[i],o=t[a];if(o.inputs.indexOf(e)>-1)return o}return void 0}},{key:"_getEffectShaderProgramForMediaSource",value:function(t){var r=this._playlist.effects,i=this._effectShaderPrograms.get("default");if(void 0===r)return i;var a=Object.keys(r);console.log(a);for(var o=0;o<a.length;o++){var n=a[o],s=r[n];if(s.inputs.indexOf(t)>-1){if(this._effectShaderPrograms.has(s.effect.id))return this._effectShaderPrograms.get(s.effect.id);var l=e.createEffectShaderProgram(this._ctx,s);return this._effectShaderPrograms.set(s.effect.id,l),l}}return i}},{key:"_loadMediaSource",value:function(e,t){void 0===t&&(t=function(){});var r=[];switch(this._mediaSourceListeners.has(e.id)&&(r=this._mediaSourceListeners.get(e.id)),e.type){case"video":var i=new c["default"](e,this._ctx);i.onready=t,i.mediaSourceListeners=r,i.load(),this._mediaSources.set(e.id,i);break;case"image":var a=new d["default"](e,this._ctx);a.onready=t,a.mediaSourceListeners=r,a.load(),this._mediaSources.set(e.id,a);break;case"canvas":var o=new v["default"](e,this._ctx);o.onready=t,o.mediaSourceListeners=r,o.load(),this._mediaSources.set(e.id,o);break;default:throw{error:5,msg:"mediaSourceReference "+e.id+" has unrecognized type "+e.type,toString:function(){return this.msg}}}}},{key:"_calculateMediaSourcesOverlap",value:function(e){for(var t=0,r=void 0,i=0;i<e.length;i++){var a=e[i];a.start>t&&(t=a.start);var o=a.start+a.duration;(void 0===r||r>o)&&(r=o)}return[t,r]}},{key:"_calculateActiveTransitions",value:function(e,t){if(void 0===this._playlist||this._playing===!1)return[];if(void 0===this._playlist.transitions)return[];for(var r=[],i=0;i<e.length;i++)r.push(e[i].id);var o=[],n=Object.keys(this._playlist.transitions);console.log(n);for(var i=0;i<n.length;i++){for(var s=n[i],l=this._playlist.transitions[s],u=!0,c=0;c<l.inputs.length;c++){var f=l.inputs[c];if(-1===r.indexOf(f)){u=!1;break}}if(u){for(var d={transition:l,transitionID:s,mediaSources:[]},c=0;c<l.inputs.length;c++)d.mediaSources.push(this._mediaSources.get(l.inputs[c]));o.push(d)}}for(var i=0;i<o.length;i++){var h=o[i].mediaSources,v=this._calculateMediaSourcesOverlap(h),g=a(v,2),p=g[0],m=g[1],_=(t-p)/(m-p);o[i].progress=_}return o}},{key:"update",value:function(e){if(void 0!==this._playlist&&this._playing!==!1){var t=this._getPlaylistPlayingStatusAtTime(this._playlist,this._currentTime),r=a(t,3),i=r[0],o=r[1],n=r[2];if(i=this._sortMediaSourcesByStartTime(i),0===i.length&&0===o.length){this.pause();var s=new CustomEvent("ended",{detail:{data:this.currentTime,instance:this}});return this.currentTime=0,void this._canvas.dispatchEvent(s)}for(var l=0;l<this._mediaSourcePreloadNumber&&l!==i.length;l++)this._mediaSources.has(i[l].id)===!1&&this._loadMediaSource(i[l]);for(var l=0;l<n.length;l++){var u=n[l];if(this._mediaSources.has(u.id)){var c=this._mediaSources.get(u.id);c.destroy(),this._mediaSources["delete"](u.id)}}for(var f=!0,l=0;l<o.length;l++){var d=o[l].id;this._mediaSources.has(d)?this._mediaSources.get(d).isReady()||(f=!1):(this._loadMediaSource(o[l]),f=!1)}if(f!==!1){o.reverse();this._calculateActiveTransitions(o,this._currentTime);this._ctx.viewport(0,0,this._ctx.canvas.width,this._ctx.canvas.height);for(var l=0;l<o.length;l++){var d=o[l].id,c=this._mediaSources.get(d);c.play();var h=this._getEffectShaderProgramForMediaSource(d),v=this._getEffectFromMediaSource(d),g=(this._currentTime-o[l].start)/o[l].duration,p={progress:g,duration:c.duration};if(void 0!==v){if(void 0!==v.effect.defaultParameters)for(var m in v.effect.defaultParameters)p[m]=v.effect.defaultParameters[m];if(void 0!==v.parameters)for(var m in v.parameters)p[m]=v.parameters[m]}c.render(h,p)}this._currentTime+=e}}}},{key:"currentTime",set:function(e){if(console.debug("Seeking to",e),void 0!==this._playlist){var t=this._getPlaylistPlayingStatusAtTime(this._playlist,e),r=a(t,3),i=(r[0],r[1]);r[2];this._mediaSources.forEach(function(e){e.destroy()}),this._mediaSources.clear();for(var o=0;o<i.length;o++){var n=i[o].id;this._mediaSources.has(n)===!1?this._loadMediaSource(i[o],function(t){t.seek(e)}):this._mediaSources.get(n).seek(e)}this._currentTime=e;var s=new CustomEvent("seek",{detail:{data:e,instance:this}});this._canvas.dispatchEvent(s)}},get:function(){return this._currentTime}},{key:"playlist",set:function(t){e.validatePlaylist(t),this.duration=e.calculatePlaylistDuration(t),this._playlist=t,this._mediaSources.forEach(function(e){e.destroy()}),this._mediaSources.clear()}}],[{key:"calculateTrackDuration",value:function(e){for(var t=0,r=0;r<e.length;r++){var i=e[r].start+e[r].duration;i>t&&(t=i)}return t}},{key:"calculatePlaylistDuration",value:function(t){for(var r=0,i=0;i<t.tracks.length;i++){var a=t.tracks[i],o=e.calculateTrackDuration(a);o>r&&(r=o)}return r}},{key:"validatePlaylist",value:function(e){for(var t=new Map,r=0;r<e.tracks.length;r++)for(var i=e.tracks[r],a=0;a<i.length;a++){var o=i[a];if(t.has(o.id))throw{error:1,msg:"MediaSourceReference "+o.id+" in track "+r+" has a duplicate ID.",toString:function(){return this.msg}};t.set(o.id,!0)}for(var r=0;r<e.tracks.length;r++)for(var i=e.tracks[r],a=0;a<i.length;a++){var o=i[a];if(void 0===o.id)throw{error:2,msg:"MediaSourceReference "+o.id+" in track "+r+" is missing a id property",toString:function(){return this.msg}};if(void 0===o.start)throw{error:2,msg:"MediaSourceReference "+o.id+" in track "+r+" is missing a start property",toString:function(){return this.msg}};if(void 0===o.duration)throw{error:2,msg:"MediaSourceReference "+o.id+" in track "+r+" is missing a duration property",toString:function(){return this.msg}};if(void 0===o.type)throw{error:2,msg:"MediaSourceReference "+o.id+" in track "+r+" is missing a type property",toString:function(){return this.msg}};if(void 0!==o.src&&void 0!==o.element)throw{error:2,msg:"MediaSourceReference "+o.id+" in track "+r+" has both a src and element, it must have one or the other",toString:function(){return this.msg}};if(void 0===o.src&&void 0===o.element)throw{error:2,msg:"MediaSourceReference "+o.id+" in track "+r+" has neither a src or an element, it must have one or the other",toString:function(){return this.msg}}}for(var r=0;r<e.tracks.length;r++)for(var i=e.tracks[r],n=0,a=0;a<i.length;a++){var o=i[a];if(o.start<n)throw{error:3,msg:"MediaSourceReferences "+o.id+" in track "+r+" starts before previous MediaSourceReference",toString:function(){return this.msg}};n=o.start}for(var r=0;r<e.tracks.length;r++)for(var i=e.tracks[r],s=void 0,a=0;a<i.length;a++){var o=i[a];if(void 0!==s){var l=s.start+s.duration,u=o.start;if(l>u)throw{error:4,msg:"Track MediaSourceReferences overlap. MediaSourceReference "+s.id+" in track "+r+" finishes after MediaSourceReference "+o.id+" starts.",toString:function(){return this.msg}}}else s=o}}},{key:"createEffectShaderProgram",value:function(t,r){var i="            uniform float progress;            uniform float duration;            attribute vec2 a_position;            attribute vec2 a_texCoord;            varying vec2 v_texCoord;            varying float v_progress;            varying float v_duration;            void main() {                v_progress = progress;                v_duration = duration;                gl_Position = vec4(2.0*a_position-1.0, 0.0, 1.0);                v_texCoord = a_texCoord;            }",a="            precision mediump float;            uniform sampler2D u_image;            varying vec2 v_texCoord;            varying float v_progress;            varying float v_duration;            void main(){                gl_FragColor = texture2D(u_image, v_texCoord);            }";void 0!==r&&(void 0!==r.effect.fragmentShader&&(a=r.effect.fragmentShader),void 0!==r.effect.vertexShader&&(i=r.effect.vertexShader));var o=e.createShaderProgram(t,i,a);return o}},{key:"createShaderProgram",value:function(t,r,i){var a=e.compileShader(t,r,t.VERTEX_SHADER),o=e.compileShader(t,i,t.FRAGMENT_SHADER),n=t.createProgram();if(t.attachShader(n,a),t.attachShader(n,o),t.linkProgram(n),!t.getProgramParameter(n,t.LINK_STATUS))throw console.log(t.getProgramParameter(n,t.LINK_STATUS)),{error:4,msg:"Can't link shader program for track",toString:function(){return this.msg}};return n}},{key:"compileShader",value:function(e,t,r){var i=e.createShader(r);e.shaderSource(i,t),e.compileShader(i);var a=e.getShaderParameter(i,e.COMPILE_STATUS);if(!a)throw"could not compile shader:"+e.getShaderInfoLog(i);return i}},{key:"renderPlaylist",value:function(t,r,i){var a=r.getContext("2d"),o=r.width,n=r.height,s=n/t.tracks.length,l=e.calculatePlaylistDuration(t),u=o/l,c={video:["#572A72","#3C1255"],image:["#7D9F35","#577714"],canvas:["#AA9639","#806D15"]};a.clearRect(0,0,o,n),a.fillStyle="#999";for(var f=0;f<t.tracks.length;f++)for(var d=t.tracks[f],h=0;h<d.length;h++){var v=d[h],g=v.duration*u,p=s,m=v.start*u,_=s*f;a.fillStyle=c[v.type][h%c[v.type].length],a.fillRect(m,_,g,p),a.fill()}void 0!==i&&(a.fillStyle="#000",a.fillRect(i*u,0,1,n))}}]),e}();_.VertexShaders={DEFAULT:"        uniform float progress;        uniform float duration;        uniform float inTime;        uniform float outTime;        attribute vec2 a_position;        attribute vec2 a_texCoord;        varying vec2 v_texCoord;        varying float v_progress;        varying float v_duration;        void main() {            v_progress = progress;            v_duration = duration;            gl_Position = vec4(vec2(2.0,2.0)*a_position-vec2(1.0, 1.0), 0.0, 1.0);            v_texCoord = a_texCoord;        }",OFFSETSCALEINOUT:"        uniform float progress;        uniform float duration;        uniform float inTime;        uniform float outTime;        uniform float scaleX;        uniform float scaleY;        uniform float offsetX;        uniform float offsetY;        attribute vec2 a_position;        attribute vec2 a_texCoord;        varying vec2 v_texCoord;        varying float v_progress;        varying float v_duration;        varying float v_inTime;        varying float v_outTime;        void main() {            v_progress = progress;            v_duration = duration;            v_inTime = inTime;            v_outTime = outTime;            gl_Position = vec4(vec2(2.0*scaleX,2.0*scaleY)*a_position-vec2(1.0+offsetX, 1.0+offsetY), 0.0, 1.0);            v_texCoord = a_texCoord;        }",INOUT:"        uniform float progress;        uniform float duration;        uniform float inTime;        uniform float outTime;        attribute vec2 a_position;        attribute vec2 a_texCoord;        varying vec2 v_texCoord;        varying float v_progress;        varying float v_duration;        varying float v_inTime;        varying float v_outTime;        void main() {            v_progress = progress;            v_duration = duration;            v_inTime = inTime;            v_outTime = outTime;            gl_Position = vec4(vec2(2.0,2.0)*a_position-vec2(1.0, 1.0), 0.0, 1.0);            v_texCoord = a_texCoord;        }",OFFSETSCALE:"        uniform float progress;        uniform float duration;        uniform float scaleX;        uniform float scaleY;        uniform float offsetX;        uniform float offsetY;        attribute vec2 a_position;        attribute vec2 a_texCoord;        varying vec2 v_texCoord;        varying float v_progress;        varying float v_duration;        void main() {            v_progress = progress;            v_duration = duration;            gl_Position = vec4(vec2(2.0*scaleX,2.0*scaleY)*a_position-vec2(1.0+offsetX, 1.0+offsetY), 0.0, 1.0);            v_texCoord = a_texCoord;        }"},_.FragmentShaders={MONOCHROME:"        precision mediump float;        uniform sampler2D u_image;        varying vec2 v_texCoord;        varying float v_progress;        void main(){            vec4 pixel = texture2D(u_image, v_texCoord);            float avg = (pixel[0]*0.2125 + pixel[1]*0.7154 + pixel[2]*0.0721)/3.0;            pixel = vec4(avg*1.5, avg*1.5, avg*1.5, pixel[3]);            gl_FragColor = pixel;        }",SEPIA:"        precision mediump float;        uniform sampler2D u_image;        varying vec2 v_texCoord;        varying float v_progress;        void main(){            vec4 pixel = texture2D(u_image, v_texCoord);            float avg = (pixel[0]*0.2125 + pixel[1]*0.7154 + pixel[2]*0.0721)/3.0;            pixel = vec4(avg*2.0, avg*1.6, avg, pixel[3]);            gl_FragColor = pixel;        }",BITCRUNCH:"        precision mediump float;        uniform sampler2D u_image;        varying vec2 v_texCoord;        varying float v_progress;        void main(){            vec4 pixel = texture2D(u_image, v_texCoord);            pixel = floor(pixel*vec4(8.0,8.0,8.0,8.0));            pixel = pixel/vec4(8.0,8.0,8.0,8.0);            gl_FragColor = pixel*vec4(1.0,1.0,1.0,1.0);        }",FADEINOUT:"        precision mediump float;        uniform sampler2D u_image;        varying vec2 v_texCoord;        varying float v_progress;        varying float v_duration;        varying float v_inTime;        varying float v_outTime;        void main(){            float alpha = 1.0;            if (v_progress * v_duration < v_inTime){                alpha = (v_progress * v_duration)/(v_inTime+0.001);            }            if ((v_progress * v_duration) > (v_duration - v_outTime)){                alpha = (v_outTime - ((v_progress * v_duration) - (v_duration - v_outTime)))/(v_outTime+0.001);            }            gl_FragColor = texture2D(u_image, v_texCoord) * vec4(1.0,1.0,1.0,alpha);        }"},_.Effects={MONOCHROME:{id:"monochrome-filter",fragmentShader:_.FragmentShaders.MONOCHROME},SEPIA:{id:"sepia-filter",fragmentShader:_.FragmentShaders.SEPIA},BITCRUNCH:{id:"bitcrunch-filter",fragmentShader:_.FragmentShaders.BITCRUNCH},GREENSCREENMAD:{id:"greenscreen-filter",fragmentShader:"                    precision mediump float;                    uniform sampler2D u_image;                    varying vec2 v_texCoord;                    varying float v_progress;                    void main(){                        vec4 pixel = texture2D(u_image, v_texCoord);                        float alpha = 1.0;                        float r = pixel[0];                        float g = pixel[1];                        float b = pixel[2];                        float y =  0.299*r + 0.587*g + 0.114*b;                        float u = -0.147*r - 0.289*g + 0.436*b;                        float v =  0.615*r - 0.515*g - 0.100*b;                        ;                        alpha = (v+u)*10.0 +2.0;                                                pixel = floor(pixel*vec4(2.0,2.0,2.0,2.0));                        pixel = pixel/vec4(2.0,2.0,2.0,2.0);                        pixel = vec4(pixel[2]*2.0, pixel[1]*2.0, pixel[0]*2.0, alpha);                        gl_FragColor = pixel;                    }"},GREENSCREEN:{id:"greenscreen-filter",fragmentShader:"                    precision mediump float;                    uniform sampler2D u_image;                    varying vec2 v_texCoord;                    varying float v_progress;                    void main(){                        vec4 pixel = texture2D(u_image, v_texCoord);                        float alpha = 1.0;                        float r = pixel[0];                        float g = pixel[1];                        float b = pixel[2];                        float y =  0.299*r + 0.587*g + 0.114*b;                        float u = -0.147*r - 0.289*g + 0.436*b;                        float v =  0.615*r - 0.515*g - 0.100*b;                        if (y > 0.2 && y < 0.8){                            alpha = (v+u)*40.0 +2.0;                        }                        pixel = vec4(pixel[0], pixel[1], pixel[2], alpha);                        gl_FragColor = pixel;                    }"},FADEINOUT:{id:"fadeinout",fragmentShader:_.FragmentShaders.FADEINOUT,vertexShader:_.VertexShaders.INOUT,defaultParameters:{inTime:1,outTime:1}},FADEINOUT1SEC:{id:"fadeinout",fragmentShader:_.FragmentShaders.FADEINOUT,vertexShader:_.VertexShaders.INOUT,defaultParameters:{inTime:1,outTime:1}},FADEINOUT2SEC:{id:"fadeinout",fragmentShader:_.FragmentShaders.FADEINOUT,vertexShader:_.VertexShaders.INOUT,defaultParameters:{inTime:2,outTime:2}},FADEIN1SEC:{id:"fadeinout",fragmentShader:_.FragmentShaders.FADEINOUT,vertexShader:_.VertexShaders.INOUT,defaultParameters:{inTime:1,outTime:0}},FADEIN2SEC:{id:"fadeinout",fragmentShader:_.FragmentShaders.FADEINOUT,vertexShader:_.VertexShaders.INOUT,defaultParameters:{inTime:2,outTime:0}},FADEOUT1SEC:{id:"fadeinout",fragmentShader:_.FragmentShaders.FADEINOUT,vertexShader:_.VertexShaders.INOUT,defaultParameters:{inTime:0,outTime:1}},FADEOUT2SEC:{id:"fadeinout",fragmentShader:_.FragmentShaders.FADEINOUT,vertexShader:_.VertexShaders.INOUT,defaultParameters:{inTime:0,outTime:2}}},t["default"]=_,e.exports=t["default"]},function(e,t,r){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),s=function(e,t,r){for(var i=!0;i;){var a=e,o=t,n=r;s=u=l=void 0,i=!1,null===a&&(a=Function.prototype);var s=Object.getOwnPropertyDescriptor(a,o);if(void 0!==s){if("value"in s)return s.value;var l=s.get;return void 0===l?void 0:l.call(n)}var u=Object.getPrototypeOf(a);if(null===u)return void 0;e=u,t=o,r=n,i=!0}},l=r(2),u=i(l),c=function(e){function t(e,r){a(this,t),s(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e,r),this.sourceStart=0,this._volume=1,void 0!==e.sourceStart&&(this.sourceStart=e.sourceStart),void 0!==e.volume&&(this._volume=e.volume)}return o(t,e),n(t,[{key:"play",value:function(){s(Object.getPrototypeOf(t.prototype),"play",this).call(this),this.element.readyState>0&&this.element.play()}},{key:"seek",value:function(e){s(Object.getPrototypeOf(t.prototype),"seek",this).call(this),this.element.readyState>0&&(e-this.start<0||e>this.start+this.duration?this.element.currentTime=this.sourceStart:this.element.currentTime=e-this.start+this.sourceStart)}},{key:"pause",value:function(){s(Object.getPrototypeOf(t.prototype),"pause",this).call(this),this.element.pause()}},{key:"load",value:function(){if(s(Object.getPrototypeOf(t.prototype),"load",this).call(this))return this.seek(0),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,this.element),this.ready=!0,void this.onready(this);this.element=document.createElement("video"),this.element.src=this.src,this.element.volume=this._volume,this.element.preload="auto",this.element.load();var e=this;this.element.addEventListener("loadeddata",function(){e.element.currentTime=e.sourceStart,e.seek(0),e.gl.texImage2D(e.gl.TEXTURE_2D,0,e.gl.RGBA,e.gl.RGBA,e.gl.UNSIGNED_BYTE,e.element),e.ready=!0,e.onready(e)},!1)}},{key:"render",value:function(e,r){s(Object.getPrototypeOf(t.prototype),"render",this).call(this,e,r)}},{key:"destroy",value:function(){this.element.pause(),this.disposeOfElementOnDestroy&&(this.element.src="",this.element.removeAttribute("src")),s(Object.getPrototypeOf(t.prototype),"destroy",this).call(this)}}]),t}(u["default"]);t["default"]=c,e.exports=t["default"]},function(e,t){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),a=function(){function e(t,i){r(this,e),this.gl=i,this.id=t.id,this.duration=t.duration,this.start=t.start,this.playing=!1,this.ready=!1,this.element=void 0,this.src=void 0,this.texture=void 0,this.mediaSourceListeners=[],this.disposeOfElementOnDestroy=!1,void 0!==t.src?(this.disposeOfElementOnDestroy=!0,this.src=t.src):(this.disposeOfElementOnDestroy=!1,this.element=t.element);var a=0,o=1;i.blendFunc(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA),i.enable(i.BLEND),this.texture=i.createTexture(),i.bindTexture(i.TEXTURE_2D,this.texture),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!0),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST);var n=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,n),i.enableVertexAttribArray(a),i.vertexAttribPointer(a,2,i.FLOAT,!1,0,0),i.bufferData(i.ARRAY_BUFFER,new Float32Array([1,1,-1,1,1,-1,1,-1,-1,1,-1,-1]),i.STATIC_DRAW),i.enableVertexAttribArray(o),i.vertexAttribPointer(o,2,i.FLOAT,!1,0,0)}return i(e,[{key:"play",value:function(){if(this.playing===!1)for(var e=0;e<this.mediaSourceListeners.length;e++)"function"==typeof this.mediaSourceListeners[e].play&&this.mediaSourceListeners[e].play(this);this.playing=!0}},{key:"pause",value:function(){console.debug("Pausing",this.id),this.playing=!1;for(var e=0;e<this.mediaSourceListeners.length;e++)"function"==typeof this.mediaSourceListeners[e].pause&&this.mediaSourceListeners[e].pause(this)}},{key:"seek",value:function(e){for(var t=0;t<this.mediaSourceListeners.length;t++)"function"==typeof this.mediaSourceListeners[t].seek&&this.mediaSourceListeners[t].seek(this,e)}},{key:"isReady",value:function(){for(var e=!0,t=0;t<this.mediaSourceListeners.length;t++)"function"==typeof this.mediaSourceListeners[t].isReady&&this.mediaSourceListeners[t].isReady(this)===!1&&(e=!1);return e===!0&&this.ready===!0?!0:!1}},{key:"load",value:function(){console.debug("Loading",this.id);for(var e=0;e<this.mediaSourceListeners.length;e++)"function"==typeof this.mediaSourceListeners[e].load&&this.mediaSourceListeners[e].load(this);return void 0!==this.element?!0:!1}},{key:"destroy",value:function(){console.debug("Destroying",this.id);for(var e=0;e<this.mediaSourceListeners.length;e++)"function"==typeof this.mediaSourceListeners[e].destroy&&this.mediaSourceListeners[e].destroy(this);this.disposeOfElementOnDestroy&&delete this.element}},{key:"render",value:function(e,t){for(var r=void 0,i=0;i<this.mediaSourceListeners.length;i++)if("function"==typeof this.mediaSourceListeners[i].render){var a=this.mediaSourceListeners[i].render(this,t);void 0!==a&&(r=a)}this.gl.useProgram(e);var o=Object.keys(t);for(var n in o){var s=o[n],l=this.gl.getUniformLocation(e,s);-1!==l&&this.gl.uniform1f(l,t[s])}this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture),void 0!==r?this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,r):this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,this.element),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}},{key:"onready",value:function(e){}}]),e}();t["default"]=a,e.exports=t["default"]},function(e,t,r){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),s=function(e,t,r){for(var i=!0;i;){var a=e,o=t,n=r;s=u=l=void 0,i=!1,null===a&&(a=Function.prototype);var s=Object.getOwnPropertyDescriptor(a,o);if(void 0!==s){if("value"in s)return s.value;var l=s.get;return void 0===l?void 0:l.call(n)}var u=Object.getPrototypeOf(a);if(null===u)return void 0;e=u,t=o,r=n,i=!0}},l=r(2),u=i(l),c=function(e){function t(e,r){a(this,t),s(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e,r)}return o(t,e),n(t,[{key:"play",value:function(){s(Object.getPrototypeOf(t.prototype),"play",this).call(this)}},{key:"seek",value:function(e){s(Object.getPrototypeOf(t.prototype),"seek",this).call(this,e)}},{key:"pause",value:function(){s(Object.getPrototypeOf(t.prototype),"pause",this).call(this)}},{key:"load",value:function(){if(s(Object.getPrototypeOf(t.prototype),"load",this).call(this))return this.seek(0),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,this.element),this.ready=!0,void this.onready(this);this.element=new Image;var e=this;this.element.onload=function(){e.gl.texImage2D(e.gl.TEXTURE_2D,0,e.gl.RGBA,e.gl.RGBA,e.gl.UNSIGNED_BYTE,e.element),e.ready=!0,e.onready(e)},this.element.src=this.src}},{key:"render",value:function(e,r){s(Object.getPrototypeOf(t.prototype),"render",this).call(this,e,r)}}]),t}(u["default"]);t["default"]=c,e.exports=t["default"]},function(e,t,r){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),s=function(e,t,r){for(var i=!0;i;){var a=e,o=t,n=r;s=u=l=void 0,i=!1,null===a&&(a=Function.prototype);var s=Object.getOwnPropertyDescriptor(a,o);if(void 0!==s){if("value"in s)return s.value;var l=s.get;return void 0===l?void 0:l.call(n)}var u=Object.getPrototypeOf(a);if(null===u)return void 0;e=u,t=o,r=n,i=!0}},l=r(2),u=i(l),c=function(e){function t(e,r){a(this,t),s(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e,r),this.width=e.width,this.height=e.height}return o(t,e),n(t,[{key:"play",value:function(){s(Object.getPrototypeOf(t.prototype),"play",this).call(this)}},{key:"seek",value:function(e){s(Object.getPrototypeOf(t.prototype),"seek",this).call(this,e)}},{key:"pause",value:function(){s(Object.getPrototypeOf(t.prototype),"pause",this).call(this)}},{key:"load",value:function(){return s(Object.getPrototypeOf(t.prototype),"load",this).call(this)?(this.seek(0),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,this.element),this.ready=!0,void this.onready(this)):(this.element=document.createElement("canvas"),this.element.width=this.width,this.element.height=this.height,this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,this.element),this.ready=!0,void this.onready(this))}},{key:"render",value:function(e,r){s(Object.getPrototypeOf(t.prototype),"render",this).call(this,e,r)}}]),t}(u["default"]);t["default"]=c,e.exports=t["default"]}]);