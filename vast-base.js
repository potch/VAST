/*	
 *	VAST (the canVAS Toolkit)
 *	http://github.com/potch/vast
 *	by Matt Claypotch (me@potch.me)
 *	
 *	vast-base: defines primitives
 *  version 0.1
 */

/*
 *	Point primitive
 */
function Point (_x, _y) {
	this.x = _x;
	this.y = _y;
}
Point.prototype = {
	move : function (_v) {
		return new Point(this.x + _v.w, this.y + _v.h);
	}
};

/*
 *	Vector primitive
 */
function Vect (_w, _h) {
	this.w = _w;
	this.h = _h;
}
Vect.prototype = {
	add : function (_v) {
		return new Vect(this.w + _v.w, this.h + _v.h);
	}
};


/**
 *	Rectangle primitive
 */
function Rect (_o, _v) {
	this.o = _o;
	this.v = _v;
	var top = _v.w < 0 ? _o.x + _v.w : _o.x;
	var left = _v.h < 0 ? _o.y + _v.h : _o.y;
	var bottom = _v.w >= 0 ? _o.x + _v.w : _o.x;
	var right = _v.h >= 0 ? _o.y + _v.h : _o.y;
	this.points = [
		new Point(left, top),
		new Point(left, top),
		new Point(right, bottom),
		new Point(right, bottom)
	];
}
Rect.prototype = {
	p : function (_n) {
		return this.points[_n];
	},
	quadrant : function (n) {
		var w = ((n % 2) ? Math.floor : Math.ceil).call(this,this.v.w/2);
		var h = ((n >> 1) ? Math.floor : Math.ceil).call(this,this.v.h/2);
		var x = (n % 2) * Math.ceil(this.v.w/2);
		var y = (n >> 1) * Math.ceil(this.v.h/2);
		return new Rect(new Point(x,y), new Vect(w,h));
	}
};


/**
 *	Quadtree primitive
 */
function Quadtree (_r, _cfg) {
	this.r = _r;
	this.maxNodes = _cfg.maxNodes || QUADTREE_MAX_POINTS;
	this.maxDepth = _cfg.maxDepth || QUADTREE_MAX_DEPTH;
	this.minSize = _cfg.minSize || QUADTREE_MIN_SIZE;
	this.tree = [[],[],[],[]];
}
Quadtree.prototype = {
	inQuadrant : function (_p) {
		return ((_p.x < Math.ceil(r.v.w/2)) ? 0 : 1) + ((_p.y < Math.ceil(r.v.h/2)) ? 0 : 2);
	},
	add : function () {}
};


/**
 *	Environment constants
 */
QUADTREE_MAX_POINTS = 1;
QUADTREE_MAX_DEPTH = 8;
QUADTREE_MIN_SIZE = new Vect(1,1);

