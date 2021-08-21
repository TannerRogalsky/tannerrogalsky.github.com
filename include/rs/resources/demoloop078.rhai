fn load() {
    let resources = #{
        shader: Shader(read_file("demoloop078.glsl")),
    };

    Loop(720, 720, 3., resources)
}

fn update(ratio, width, height) {
    let ctx = Context();
    ctx.clear(Color(0., 0., 0., 1.0));

    let ox = 0.;
    let oy = 0.;
    let oz = -3.;
    let origin = Translation(ox, oy, oz);

    let shape_color = Color(1., 1., 1., 1.);
    let shape = Dodecahedron(1.5, 0);

    let shader = resources.shader;
    let lx = (ratio * 360.0).sin() * 5.7;
    let ly = (ratio * 360.0).cos() * 5.7;

    shader.send("lightPos", lx, ly, -8.0);
    ctx.set_shader(shader);
    ctx.draw(shape, shape_color, origin);
    ctx.set_shader();

    let ring_count = 64;
    for ring in range(0, ring_count) {
        let ring_ratio = ring.to_float() / ring_count.to_float();
        let ring_phi = (ring_ratio + ratio / ring_count.to_float()) * 360.;
        let ring_tx = Rotation(
            ring_phi.cos() * 45.0, 
            0., 
            ring_phi.sin() * 45.0,
        );

        let count = 50;
        let path = Path();
        path.set_width(1.);
        for i in range(0, count) {
            let inner = i.to_float() / (count - 1).to_float();
            let phi = inner * 360.;
            let x = phi.cos() * 2.;
            let y = (phi + ratio * 360.).sin() * 0.25;
            let y = 0.;
            let z = phi.sin() * 2.;

            let tx = origin * ring_tx * Translation(x, y, z);
            let p = tx * Point(0., 0., 0.);

            path.line_to(p);
        }
        ctx.line(path);
    }

    let reflection_color = Color(0.2, 0.2, 0.2, 1.0);
    let origin = origin * Scale(1., -1., 1.) * Translation(0., 3.0, 0.);
    ctx.set_shader(shader);
    ctx.draw(shape, reflection_color, origin);
    ctx.set_shader();

    for ring in range(0, ring_count) {
        let ring_ratio = ring.to_float() / ring_count.to_float();
        let ring_phi = (ring_ratio + ratio / ring_count.to_float()) * 360.;
        let ring_tx = Rotation(
            ring_phi.cos() * 45.0, 
            0., 
            ring_phi.sin() * 45.0,
        );

        let count = 50;
        let path = Path();
        path.set_width(1.);
        path.set_color(reflection_color);
        for i in range(0, count) {
            let inner = i.to_float() / (count - 1).to_float();
            let phi = inner * 360.;
            let x = phi.cos() * 2.;
            let y = (phi + ratio * 360.).sin() * 0.25;
            let y = 0.;
            let z = phi.sin() * 2.;

            let tx = origin * ring_tx * Translation(x, y, z);
            let p = tx * Point(0., 0., 0.);

            path.line_to(p);
        }
        ctx.line(path);
    }

    ctx
}