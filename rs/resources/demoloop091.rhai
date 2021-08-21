fn load() {


    let resources = #{
        shader: Shader(read_file("demoloop091.glsl")),
        canvas: Canvas(720, 720),
    };

    Loop(720, 720, 3., resources)
}

fn min(x, y) {
    if y < x {
        y
    } else {
        x
    }
}

fn max(x, y) {
    if y > x {
        y
    } else {
        x
    }
}

fn clamp(x, min_val, max_val) {
    min(max(x, min_val), max_val)
}

fn lerp(v0, v1, t) {
  return v0 + t * (v1 - v0);
}

fn update(ratio, width, height) {
    let ctx = Context();
    let bg = Color(0.1, 0.1, 0.1, 1.0);
    ctx.clear(bg);

    let canvas = resources.canvas;
    ctx.set_canvas(canvas);
    ctx.clear(Color(0., 0., 0., 1.));

    ctx.draw(Rectangle(0., 0., 720. / 2., 720. / 2.), Color(1., 0., 0., 1.));
    ctx.set_canvas();


    let origin = Translation(0., 0., -3.);
    let shape = Dodecahedron(1., 0);
    ctx.image(shape, canvas, origin * Rotation(0., ratio * 360., 0.));
    
    ctx
}