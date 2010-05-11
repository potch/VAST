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
		var x = (n % 2) * Math.ceil(this.v.w/2) + this.o.x;
		var y = (n >> 1) * Math.ceil(this.v.h/2) + this.o.y;
		return new Rect(new Point(x,y), new Vect(w,h));
	},
	boundsPoint : function (_p) {
		return _p.x >= this.p(0).x && _p.x <= this.p(3).x && _p.y >= this.p(0).y && _p.y <= this.p(3);
	}
};


/**
 *	Quadtree primitive
 */
function Quadtree (_r, _cfg) {
	_cfg = _cfg || {};
	this.r = _r;
	this.maxNodes = _cfg.maxNodes || QUADTREE_MAX_POINTS;
	this.maxDepth = _cfg.maxDepth || QUADTREE_MAX_DEPTH;
	this.minSize = _cfg.minSize || QUADTREE_MIN_SIZE;
	this.parent = _cfg.parent || false;
	this.depth = this.parent ? this.parent.depth + 1 : 0;
	this.tree = [[],[],[],[]];
}
Quadtree.prototype = {
	inQuadrant : function (_p) {
		return ((_p.x < Math.ceil(this.r.o.x+this.r.v.w/2)) ? 0 : 1) + ((_p.y < Math.ceil(this.r.o.y+this.r.v.h/2)) ? 0 : 2);
	},
	add : function (_p) {
		_p = _arr(_p);
		for (var i = 0; i < _p.length; i++) {
			var p = _p[i];
			var idx = this.inQuadrant(p);
			var t = this.tree;
			if (t[idx] instanceof Array) {
				t[idx].push(p);
				if (t[idx].length > this.maxNodes && this.depth < QUADTREE_MAX_DEPTH && (this.r.v.w >= this.minSize.w * 2) && (this.r.v.h >= this.minSize.h * 2)) {
					var bin = t[idx];
					t[idx] = new Quadtree(this.r.quadrant(idx),{parent:this});
					t[idx].add(bin);
				}
			} else {
				t[idx].add(p);
			}
		}
	}
};


/**
 *	Utilities
 */

function _arr(a) {
	return (a.push) ? a : [a];
}

function _getRandomInt(min, max) {  
	return Math.floor(Math.random() * (max - min + 1)) + min;  
}

function _randInt(n) {
	return _getRandomInt(0,n-1);
}


/**
 *	Environment constants
 */
QUADTREE_MAX_POINTS = 8;
QUADTREE_MAX_DEPTH = 8;
QUADTREE_MIN_SIZE = new Vect(1,1);

