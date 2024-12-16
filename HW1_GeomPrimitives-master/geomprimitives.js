//Purpose: The engine behind the 3D primitive operations for Mini Assignment 1

vec3 = glMatrix.vec3;

//////////////////////////////////////////////
///********         PART 1          *******///
//////////////////////////////////////////////


/**
 * Compute the angle between the vectors ab and ac
 * @param {vec3} a First point
 * @param {vec3} b Second point
 * @param {vec3} c Third point
 *
 * @return {float} Angle between vectors ab and ac in degrees
 */
function getAngle(a, b, c) {
	let ab = vec3.create()
	let ac = vec3.create()

	vec3.subtract(ab, b, a)
	vec3.subtract(ac, c, a)

	let dot_prod = vec3.dot(ab, ac)
	let mag_ab = vec3.length(ab)
	let mag_ac = vec3.length(ac)

	let theta = Math.acos(dot_prod/(mag_ab*mag_ac))
	if (mag_ab == 0 || mag_ac == 0){
		return -1
	}
	return theta = theta * (180/Math.PI)
}



/**
 * Project vector u onto vector v using the glMatrix library
 * @param {vec3} u Vector that's being projected
 * @param {vec3} v Vector onto which u is projected
 *
 * @return {vec3} The projection of u onto v
 */
function projVector(u, v) {
    // TODO: Fill this
	let uv= vec3.dot(u, v)
	let vv= vec3.dot(v, v)
	let proj = vec3.create()
	vec3.scale(proj,v, (uv/vv))
	if  (vec3.length(v)==0){
		return vec3.fromValues(0,0,0)
	}
	return proj
}


/**
 *
 * @param {vec3} u Vector that's being projected
 * @param {vec3} v Vector onto which u is perpendicularly projected
 *
 * @return {vec3} The perpendicular projection of u onto v
 */
function projPerpVector(u, v) {
    // TODO: Fill this in
	let uv= vec3.dot(u, v)
	let vv= vec3.dot(v, v)
	let proj = vec3.create()
	let perp = vec3.create()
 	vec3.scale(proj,v, (uv/vv))
	if  (vec3.length(v)==0){
		return vec3.fromValues(0,0,0)
	}
	perp =vec3.subtract(perp, u, proj)
	return perp
}


/**
 * Given three 3D vertices a, b, and c, compute the area
 * of the triangle they span
 * @param {vec3} a First point
 * @param {vec3} b Second point
 * @param {vec3} c Third point
 *
 * @return {float} Area of the triangle
 */
function getTriangleArea(a, b, c) {
    // TODO: Fill this in
	let ab = vec3.create()
	let ac = vec3.create()

	vec3.subtract(ab, b, a)
	vec3.subtract(ac, c, a)

	let cross_prod = vec3.create()
	vec3.cross(cross_prod, ab, ac)
	let mag_cross = vec3.length(cross_prod)
	let area = 1/2 * mag_cross
	return area
}


/**
 * For a plane determined by the points a, b, and c, with the plane
 * normal determined by those points in counter-clockwise order using
 * the right hand rule, decide whether the point d is above, below, or on the plane
 * @param {vec3} a First point on plane
 * @param {vec3} b Second point on plane
 * @param {vec3} c Third point on plane
 * @param {vec} d Test point
 *
 * @return {int} 1 if d is above, -1 if d is below, 0 if d is on
 */
function getAboveOrBelow(a, b, c, d) {
    // TODO: Fill this in
	let ab = vec3.create()
	let ac = vec3.create()
	let ad = vec3.create()


	vec3.subtract(ab, b, a)
	vec3.subtract(ac, c, a)
	vec3.subtract(ad, d, a)

	let n = vec3.create()
	vec3.cross(n, ab, ac)

	let dot_ab_ac =vec3.dot(ab, ac)
	let mag_ab = vec3.length(ab)
	let mag_ac = vec3.length(ac)

	if ((dot_ab_ac)/(mag_ab*mag_ac) == 1){
		return -2
	}


	let dot_nd=vec3.dot(n, ad)

	if (dot_nd > 0){
		return 1
	}
	else if (dot_nd < 0){
		return -1
	}
	else if (dot_nd = 0){
		return 0
	}
	else if (dot_nd > 0){
		return 1
	}
}







//////////////////////////////////////////////
///********         PART 2          *******///
//////////////////////////////////////////////




/**
 * Compute the barycentric coordinates of a point p with respect to a triangle /\abc
 *
 * @param {vec3} a Point a on the triangle
 * @param {vec3} b Point b on the triangle
 * @param {vec3} c Point c on the triangle
 * @param {vec3} p The point whose barycentric coordinates we seek
 *
 * @return {vec3} An vec3 with the barycentric coordinates (alpha, beta, gamma)
 * 				  corresponding to a, b, and c, respectively, so that
 * 				  alpha + beta + gamma = 1, and alpha, beta, gamma >= 0
 *          CORNER CASES:
 * 				  (1) If p is not inside of /\abc, then return [0, 0, 0]
 *          (2) If /\abc is zero area, then return [1, 0, 0] iff p = a (=b=c)
 *              otherwise, return [0, 0, 0]
 */
function getBarycentricCoords(a, b, c, p) {
	// TODO: Fill this in
	function getTriangleArea(a, b, c) {
		// TODO: Fill this in
		let ab = vec3.create()
		let ac = vec3.create()

		vec3.subtract(ab, b, a)
		vec3.subtract(ac, c, a)

		let cross_prod = vec3.create()
		vec3.cross(cross_prod, ab, ac)
		let mag_cross = vec3.length(cross_prod)
		let area = 1/2 * mag_cross
		return area
	}


	function check_vector_equal (a, b, epsilon = 1e-6) {
		return (
			Math.abs(a[0]-b[0]) < epsilon &&
			Math.abs(a[1]-b[1]) < epsilon &&
			Math.abs(a[2]-b[2]) < epsilon
		)
	}


	let tri_area = getTriangleArea(a,b,c)

	if (tri_area == 0){
		if (check_vector_equal(p,a)) {
			return vec3.fromValues(1,0,0)
		}
		else {
			return vec3.fromValues(0,0,0)
		}
	}
	else {
		let alpha = getTriangleArea(b,c,p)/tri_area
		let beta = getTriangleArea(a,c,p)/tri_area
		let gamma = getTriangleArea(a,b,p)/tri_area

		let e = 0.0005

		// let bary_coords = vec3.fromValues(alpha, beta, gamma);

		if ((alpha+beta+gamma) <= (1+e) && (alpha+beta+gamma) >= (1-e) ){
			return vec3.fromValues(alpha, beta, gamma)
		}
		else {
			return vec3.fromValues(0,0,0)
		}
	}

}


/**
 * Find the intersection of a ray with a triangle
 *
 * @param {vec3} p0 Endpoint of ray
 * @param {vec3} v Direction of ray
 * @param {vec3} a Triangle vertex 1
 * @param {vec3} b Triangle vertex 2
 * @param {vec3} c Triangle vertex 3
 *
 * @return {list} A list of vec3 objects.  The list should be empty
 *          if there is no intersection, or it should contain
 *          exactly one vec3 object if there is an intersection
 *          CORNER CASES:
 *          (1) If the ray is parallel to the plane,
*               return an empty list
 */
function rayIntersectTriangle(p0, v, a, b, c) {
	// TODO: Fill this in
	return []; //This is a dummy value!  Replace with your answer
}


/**
 * Find the intersection of the ray p0 + tv, t >= 0, with the
 * sphere centered at c with radius r.
 *
 * @param {vec3} p0 Endpoint of the ray
 * @param {vec3} v Direction of the ray
 * @param {vec3} c Center of the sphere
 * @param {number} r Radius of the sphere
 *
 * @return {list of vec3} A list of intersection points,
 *   ***in the order in which the ray hits them***
 * If the ray doesn't hit any points, this list should be empty.
 * Note that a ray can hit at most 2 points on a sphere.
 */
function rayIntersectSphere(p0, v, c, r) {
	// TODO: Fill this in
	return []; //This is a dummy value!  Replace with your answer
}
