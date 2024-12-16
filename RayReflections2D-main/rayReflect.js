var vec2 = glMatrix.vec2;

/**
 * Project vector u onto vector v using the glMatrix library
 * @param {vec2} u Vector that's being projected
 * @param {vec2} v Vector onto which u is projected
 * 
 * @return {vec2} The projection of u onto v
 */
function proj(u, v) {
	return vec2.scale(vec2.create(), v, (vec2.dot(u, v)/vec2.dot(v,v)));
}

/**
 * 
 * @param {vec2} u Vector that's being projected
 * @param {vec2} v Vector onto which u is perpendicularly projected
 * 
 * @return {vec2} The perpendicular projection of u onto v
 */
function projPerpVector(u, v) {
	let res = projVector(u, v);
	return vec2.subtract(res, u, res);
}


/**
 * Compute the ray that results from the reflection of the ray
 * p0 + t*v
 * with the line segment (a, b)
 * 
 * @param {vec2} p0 Endpoint of ray
 * @param {vec2} v Direction of ray
 * @param {vec2} a Left endpoint of line segment
 * @param {vec2} b Right endpoint of line segment
 */
function rayReflect(p0, v, a, b) {
    let reflected = {"p0":null, "v":null};
    // TODO: Fill this in
    

    return reflected;
}