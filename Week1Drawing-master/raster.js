class RasterImage {
    /**
     * Construct the object and store canvas information
     * @param {string} divName DOM name of div wrapping canvas
     * @param {string} canvasName DOM name of canvas
     */
    constructor(divName, canvasName) {
        const div = document.getElementById(divName);
        this.canvas = document.getElementById(canvasName);
        this.canvas.width = div.clientWidth;
        this.canvas.height = div.clientHeight;
        this.ctx = this.canvas.getContext("2d"); //For drawing
        //Need this to disable that annoying menu that pops up on right click
        this.canvas.addEventListener("contextmenu", function(e){ e.stopPropagation(); e.preventDefault(); return false; });

        // Translations
        this.dx = 0;
        this.dy = 0;
        // Scale
        this.scale = 1;

        // Setup menu
        this.setupMenu();
    }

    setupMenu() {
        let menu = new dat.GUI();
        this.menu = menu;
        menu.add(this, 'dx', -this.canvas.width, this.canvas.width)
            .listen().onChange(this.repaint.bind(this));
        menu.add(this, 'dy', -this.canvas.width, this.canvas.width)
            .listen().onChange(this.repaint.bind(this));
        menu.add(this, 'scale', 0.1, 10)
            .listen().onChange(this.repaint.bind(this));

        menu.add(this, 'repaint');
    }



    /**
     * Draw a pixel at a particular position of the canvas
     * @param {int} x X coordinate of pixel
     * @param {int} y Y coordinate of pixel
     * @param {list of [float, float, float]} color Red/green/blue values in [0, 255]
     */
    drawPixel(x, y, color) {
        x = Math.floor(x);
        y = Math.floor(y);
        this.ctx.fillStyle = "rgb("+color[0]+","+color[1]+","+color[2]+")";
        this.ctx.fillRect(x, y, 1, 1);
    }

    /**
     * Fill in a rectangle using the drawPixel method
     *
     * @param {int} x x coordinate at upper left of rectangle
     * @param {int} y y coordinate at upper left of rectangle
     * @param {int} w Width of rectangle
     * @param {int} h Height of rectangle
     * @param {list of [float, float, float]} color Red/green/blue values in [0, 255]
     */
    fillRect(x, y, w, h, color) {
        // TODO: Fill this in
    }


    /**
     * Draw a line segment from point a to point b
     *
     * @param {glMatrix.vec2} a First point
     * @param {glMatrix.vec2} b Second point
     */
    drawLine(a, b) {
        // TODO: Fill this in
    }


    /**
     * Fill in a disc using the drawPixel method
     *
     * @param {int} cx x coordinate of center of disc
     * @param {int} cy y coordinate of center of disc
     * @param {int} w Width of rectangle
     * @param {int} h Height of rectangle
     * @param {list of [float, float, float]} color Red/green/blue values in [0, 255]
     */
    fillCircle(cx, cy, r, color) {
        // TODO: Fill this in
    }

    /**
     * Fill in a triangle with a solid color
     *
     * @param {glMatrix.vec2} a First point
     * @param {glMatrix.vec2} b Second point
     * @param {glMatrix.vec2} c Third point
     * @param {list of [float, float, float]} color Red/green/blue values in [0, 255]
     */
    fillTriangle(a, b, c, color) {
        // TODO: Fill this in
    }

    /**
     * Shade in a triangle using Barycentric interpolation
     *
     * @param {glMatrix.vec2} a First point
     * @param {list of [float, float, float]} ca First point red/green/blue values in [0, 255]
     * @param {glMatrix.vec2} b Second point
     * @param {list of [float, float, float]} cb Second point red/green/blue values in [0, 255]
     * @param {glMatrix.vec2} c Third point
     * @param {list of [float, float, float]} cc Third point red/green/blue values in [0, 255]
     */
    shadeTriangle(a, ca, b, cb, c, cc) {
        // TODO: Fill this in
    }

    /**
     * Method to paint a picture!
     */
    repaint() {
        let tic = (new Date()).getTime();

        const W = this.canvas.width;
        const H = this.canvas.height;
        this.ctx.clearRect(0, 0, W, H);

        // TODO: Draw some stuff here


        let toc = (new Date()).getTime();
        const ptime = document.getElementById("time");
        ptime.innerHTML = (toc-tic) + " milliseconds elapsed (" + (Math.round(10000/(toc-tic))/10) + "fps)";
    }
}
