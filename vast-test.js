/**	
 *	VAST (the canVAS Toolkit)
 *	http://github.com/potch/vast
 *	by Matt Claypotch (me@potch.me)
 *	
 *	vast-test: basic demos
 *  version 0.1
 */

var _ = console.log;

function primtest() {
	_("primitives");

	var p = new Point(100, 60);
	var v = new Vect(80, 120);
	var r = new Rect(p, v);

	_(p);
	_(v);
	_(r);
}

function recttest() {
	_("rectangles");

	var p = new Point(210, 180);
	var v = new Vect(-80, -120);
	var r = new Rect(p, v);

	_( p );
	_( v );
	_( r );
	_( r.points );
	_( r.p(1).x );
	_( r instanceof Rect );
}

r = new Rect(new Point(0,0), new Vect(512,512));
q = new Quadtree(r);
for (var i = 1; i < 3000; i++) {
	q.add(new Point(_randInt(q.r.v.w),_randInt(q.r.v.h)));
}

var canvas = document.getElementById('quadtree');  
if (canvas.getContext){  
	var ctx = canvas.getContext('2d');  
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#000";
	drawqt(q,ctx);
}

function drawqt(q,ctx) {
	for (var i in [0,1,2,3]) {
		r = q.tree[i];
		if (r instanceof Quadtree) {
			rgn = r.r;
			ctx.fillStyle = "rgba(0,0,255,.1)";
			ctx.fillRect(rgn.o.x, rgn.o.y, rgn.v.w, rgn.v.h);
			ctx.fillStyle = "rgb(0,0,0)";
			drawqt(r,ctx);
		} else {
			for (var j = 0; j<r.length;j++) {
				p = r[j];
				ctx.fillStyle = "rgb(0,0,0)";
				ctx.fillRect(p.x-1,p.y,3,1);
				ctx.fillRect(p.x,p.y-1,1,3);
			}
		}
	}
}