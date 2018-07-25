(function() {

    let data = { vertices: [],
                 faces: [],
                 links: []
                };

    self.onmessage = function(event) {
        let sArray = event.data.split('\n');

        for(let i=0, len=sArray.length; i<len; i+=1) {
            switch(sArray[i][0])
            {
                case 'v':
                    let v = sArray[i].match(/-*[.\d]+/g);
                    if(v.length !== 3) throw('abnormal file format - '+(i+1)+': '+sArray[i]);
                    data.vertices.push(+v[0], +v[1], +v[2]);
                    break;
                case 'f':
                    let f = sArray[i].match(/[.\d]+/g);
                    if(f.length !== 3) throw('abnormal file format - '+(i+1)+': '+sArray[i]);
                    let p = [+f[0]-1, +f[1]-1, +f[2]-1];
                    data.faces.push(...p);
                    addLinks(p);
                    break;
            }
        }

        postMessage(data);
    };

    function addLinks(p) {
        let list = [0, 1, 2, 0];
        for(let i=0, len=list.length; i<len-1; i+=1) {
            let p1 = p[list[i]],
                p2 = p[list[i+1]];
            if(!linkExists(p1, p2)) data.links.push(p1, p2);
        }
    }

    function linkExists(p1, p2) {
        let p = data.links;
        for(let i=0, len=p.length; i<len; i+=2) {
            if((p1===p[i] && p2===p[i+1]) || (p2===p[i] && p1===p[i+1])) return true;
        }
        return false;
    }

}());
