fn load() {
    let resources = #{
        shader: Shader(read_file("demoloop077.glsl")),
    };

    Loop(720, 720, 3., resources)
}

fn update(ratio, width, height) {
    let bg_color = Color(0.1, 0.1, 0.1, 1.0);

    let ctx = Context();
    // ctx.clear(Color(0.4, 0.4, 0.8, 1.0));
    ctx.clear(bg_color);

    const FAR = -200.0 / 2.;
    const LAYERS = 80 / 2;
    const Z_INCR = FAR / LAYERS.to_float();
    const Y_AXIS = 4;
    const X_AXIS = 2;
    const AXIS_TOTAL = X_AXIS * Y_AXIS;

    let tx = Translation(0.0, 0.0, Z_INCR * (1.0 - ratio));

    let geometry = Dodecahedron(0.25, 0);
    // let geometry = Box(0.25, 0.25, 0.25);

    let shader = resources.shader;
    shader.send("lightPos", 0., 0., -1.);
    shader.send("bgColor", bg_color);
    shader.send("ratio", ratio);
    ctx.set_shader(shader);

    for z in range(0, LAYERS) {
        let z_ratio = z.to_float() / LAYERS.to_float();
        for y in range(0, Y_AXIS) {
            for x in range(0, X_AXIS) {
                let index = x + y * X_AXIS;
                let inner_ratio = index.to_float() / AXIS_TOTAL.to_float();

                let z_pos = (z - 4).to_float() * Z_INCR * 0.25;

                let z_offset = 1.0 / AXIS_TOTAL.to_float() * z.to_float() * 0.25;
                let mu = inner_ratio + ratio * 0.25 + z_offset;
// 
                let xo = (mu * 360. * 1.5).sin();
                let xo = xo * xo + 0.5;

                let tx = tx * Translation(0.0, 0.0, z_pos);
                let tx = tx * Rotation(0.0, 0.0, mu * 360.0);
                let tx = tx * Translation(xo, 0.0, 0.0);
                ctx.draw(geometry, hsl((mu % 1.0) * 6.28, 1.0, 0.5), tx);
            }
        }
    }

    ctx
}