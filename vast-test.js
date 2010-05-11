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

r = new Rect(new Point(10,11), new Vect(81,31));
for (i in [0,1,2,3]) {
	_(r.quadrant(i));
}



