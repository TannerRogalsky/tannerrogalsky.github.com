fn load() {
    let resources = #{
        shader: Shader(read_file("demoloop079.glsl")),
    };

    Loop(720, 720, 3., resources)
}

fn update(ratio, width, height) {
    let ctx = Context();
    let bg = Color(0.05, 0.05, 0.05, 1.0);
    // let bg = Color(0., 0., 0., 1.);
    ctx.clear(bg);

    let ox = 1.;
    let oy = 0.;
    let oz = -4.;
    let origin = Translation(ox, oy, oz);

    let camera = Translation(0., -2., -2.);
    let camera = camera * Rotation(15., 0., 0.);
    ctx.set_camera(camera);

    let shape_color = bg;
    let shape_radius = 1.5;
    let shape = Box(1., 1., 1.);
    let shape = Sphere(shape_radius, 30, 20);

    let shader = resources.shader;
    let lx = (ratio * 360.0).sin() * 5.7;
    let ly = (ratio * 360.0).cos() * 5.7;

    shader.send("lightPos", 10., -10., -8.0);
    ctx.set_shader(shader);
    ctx.draw(shape, bg, origin);
    ctx.set_shader();

    let path = Path();
    path.set_width(2.);
    let ring_count = 64;
    for ring in range(0, ring_count) {
        let ring_ratio = ring.to_float() / ring_count.to_float();
        let ring_phi = ring_ratio * 360.;
        let rx = ring_ratio * 2.5 + shape_radius + 0.1;
        let ry = (ring_phi * 3.0).sin() * 0.2;
        let ring_tx = Translation(rx, ry, 0.);

        let count = 50;
        for i in range(0, count) {
            let inner = i.to_float() / (count - 1).to_float();
            let ry = inner * 45. + ring_ratio * 360.0 * 10. + -ratio * 360.0;
            let tx = Rotation(0., ry, 0.);

            let tx = origin * tx * ring_tx;

            let p = tx * Point(0., 0., 0.);

            let c = 1. - inner;
            let c = Color(c, c, c, c);
            path.set_color(c);

            if i == 0 {
                path.move_to(p);
            }
            path.line_to(p);
        }
    }
    ctx.line(path);

    ctx
}