var _TubeGeometry=function(){function k(k,f,l,d,w,e){function r(a){n=k.getPointAt(a/f,n);var e=p.normals[a];a=p.binormals[a];for(b=0;b<=d;b++){var g=b/d*Math.PI*2+w,h=Math.sin(g);g=-Math.cos(g);c.x=g*e.x+h*a.x;c.y=g*e.y+h*a.y;c.z=g*e.z+h*a.z;c.normalize();t.push(c.x,c.y,c.z);m.x=n.x+l*c.x;m.y=n.y+l*c.y;m.z=n.z+l*c.z;u.push(m.x,m.y,m.z)}}THREE.BufferGeometry.call(this);this.type="TubeBufferGeometry";this.parameters={path:k,tubularSegments:f,radius:l,radialSegments:d,closed:e};f=f||64;l=l||1;d=d||8;
e=e||!1;var p=k.computeFrenetFrames(f,e);this.tangents=p.tangents;this.normals=p.normals;this.binormals=p.binormals;var m=new THREE.Vector3,c=new THREE.Vector3,h=new THREE.Vector2,n=new THREE.Vector3,a,b,u=[],t=[],v=[],q=[];for(a=0;a<f;a++)r(a);r(!1===e?f:0);for(a=0;a<=f;a++)for(b=0;b<=d;b++)h.x=a/f,h.y=b/d,v.push(h.x,h.y);(function(){for(b=1;b<=f;b++)for(a=1;a<=d;a++){var c=(d+1)*b+(a-1),e=(d+1)*b+a,g=(d+1)*(b-1)+a;q.push((d+1)*(b-1)+(a-1),c,g);q.push(c,e,g)}})();this.setIndex(q);this.addAttribute("position",
new THREE.Float32BufferAttribute(u,3));this.addAttribute("normal",new THREE.Float32BufferAttribute(t,3));this.addAttribute("uv",new THREE.Float32BufferAttribute(v,2))}Object.create(THREE.Geometry.prototype);k.prototype=Object.create(THREE.BufferGeometry.prototype);return k.prototype.constructor=k}();