fn load() {
    let resources = #{
        noise_texture: NoiseTexture(128, 128, 16, 2, true),
        shader: Shader(read_file("demoloop083_0.glsl")),
        bg_shader: Shader(read_file("demoloop083_1.glsl")),
        canvas: Canvas(720, 720),
        bg_canvas: Canvas(720, 720, true),
    };

    Loop(720, 720, 3., resources)
}

fn update(ratio, width, height) {
    let ctx = Context();
    let bg = Color(0.1, 0.1, 0.1, 1.0);
    ctx.clear(bg);

    let canvas = resources.canvas;
    ctx.set_canvas(canvas);
    ctx.clear(Color(1.0, 1.0, 1.0, 1.0));
    let shape = RegularPolygon(0.0, 0.0, 6, 720.0 * 0.75);
    let tx = Translation(720.0 / 2.0, 720.0 / 2.0);
    let SHAPES = 10;
    for shape_index in range(0, SHAPES) {
        let shape_ratio = 1.0 - shape_index.to_float() / SHAPES.to_float();
        // let shape_ratio = shape_ratio + ratio % 0.2;
        let tx = tx * Scale(shape_ratio);
        let hue = shape_ratio * 6.28;
        // let hue = (hue + ratio * 6.28) % 6.28; 
        ctx.draw(shape, hsl(hue, 1.0, 0.5), tx);
        ctx.stroke(shape, bg, tx);
    }
    ctx.set_canvas();

    let planet_ratio = 4.;
    let origin = Translation(0., 0., 0.);
    // let planet_tx = origin * Rotation(0., -ratio * 360., -360. / 8.);
    // let planet_tx = origin * Rotation(0., ratio * 360., (ratio * 360.).sin() * 360. / 8.);
    // let planet_tx = origin * Rotation(0., ratio * 360., -ratio * 360.);
    let planet_tx = origin * Rotation(ratio * 360., 0., 0.);
    // let planet_tx = origin;
    // let planet = Sphere(planet_ratio, 30, 20);
    let planet = Icosahedron(planet_ratio, 10);

    // let camera = Translation(0., 0., -2.);
    let camera = Translation(0., 0., planet_ratio * -1.09);
    // let camera = camera * Rotation(0., 0., 360. / 8.);
    // let camera = camera * Rotation(-360.0 / 8., 0., 0.);
    ctx.set_camera(camera);

    let path = Path();
    path.set_width(6.);
    let ring_count = 64;
    for ring in range(0, ring_count) {
        let ring_ratio = ring.to_float() / ring_count.to_float();
        let ring_phi = ring_ratio * 360.;
        let rx = ring_ratio * 0.5 + planet_ratio + 0.15;
        let ry = (ring_phi * 3.0).sin() * 0.25 * planet_ratio;
        let ring_tx = Translation(rx, ry, 0.);

        let count = 10;
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


    let bg_canvas = resources.bg_canvas;
    let shader = resources.shader;
    shader.send("tex1", resources.noise_texture, 1);
    shader.send("t", ratio);
    ctx.set_canvas(bg_canvas);
    ctx.clear(bg);
    ctx.set_shader(shader);
    ctx.image(planet, canvas, planet_tx);
    ctx.set_shader();
    ctx.line(path);
    ctx.set_canvas();


    ctx.set_camera(Translation(0., 0., 0.));
    let bg_shader = resources.bg_shader;
    bg_shader.send("t", ratio);
    ctx.set_shader(bg_shader);
    let screen = Rectangle(0., 0., width, height);
    ctx.image(screen, bg_canvas);
    ctx.set_shader();

    ctx
}