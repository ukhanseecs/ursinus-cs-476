function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

vec3 = glMatrix.vec3;
mat4 = glMatrix.mat4;

/**
 * Extracts the elements of a mat4 object into an array
 * in row-major order
 * @param {glMatrix.mat4} M Input matrix
 * @returns list of elements in row-major order
 */
function getMat4Array(M) {
    let ret = []
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            ret.push(M[j*4+i]);
        }
    }
    return ret;
}


function makeDinoScene() {
    let scene = JSON.parse(`{
        "lights":[
            {
                "pos":[0, 200, 0],
                "color":[1, 1, 1]
            },
            {
                "pos":[-5, 2, -10],
                "color":[1, 1, 1]
            },
            {
                "pos":[5, 2, 10],
                "color":[1, 1, 1]
            }
        ],

        "cameras":[
        {
        "pos": [1,2.5,2.8],
        "rot": [0.08,0.75,0.09,0.65],
        "fovy": 1.0
        },
        {
        "pos": [2,40.5,-2],
        "rot": [0.74,-0.00,-0.00,0.67],
        "fovy": 1.0
        },
        {
        "pos": [14,35.5,-4],
        "rot": [0.09,0.69,0.71,0.09],
        "fovy": 1.0},
        {
        "pos": [1,2.5,2.8],
        "rot": [0.08,0.75,0.09,0.65],
        "fovy": 1.0
        }
        ],

        "name":"dinos",
        "materials":{
            "red":{
                "kd":[1.0, 0, 0.2]
            }
        },
        "children":[
            {
                "transform":[1, 0, 0, 0,
                             0, 0, 1, 0,
                             0, -1, 0, 0,
                             0, 0, 0, 1],
                "shapes":[
                    {
                        "type":"mesh",
                        "filename":"../meshes/dinopet.off"
                    }
                ]
            }
        ]
    }`);

    const radius = 18
    const numDinos = 20

    for (let i = 0; i < numDinos; i++) {
        const theta = (2 * Math.PI * i) / numDinos;

        const x = radius * Math.cos(theta);
        const z = radius * Math.sin(theta);

        const xz_rot_mat = mat4.create()
        mat4.fromXRotation(xz_rot_mat, 3*Math.PI/2)

        const xz_tra_mat = mat4.create()
        mat4.fromTranslation(xz_tra_mat, vec3.fromValues(x, 0, z))

        const rotationMat = mat4.create();
        mat4.fromZRotation(rotationMat, (2*Math.PI)- (theta + Math.PI/numDinos));

        const mat1 = mat4.create();
        mat4.mul(mat1, xz_tra_mat, xz_rot_mat);
        mat4.mul(mat1, mat1, rotationMat);



        let dino = {
            "transform":
                getMat4Array(mat1)
            ,
            "shapes": [
                {
                    "type": "mesh",
                    "filename": "../meshes/dinopet.off"
                }
            ]
         };
        scene.children.push(dino);
    }


    let s = JSON.stringify(scene, null, 4);
    document.getElementById("dinoCode").innerHTML = s;
    //download(s, "dinos.json", "text/javascript");

}
