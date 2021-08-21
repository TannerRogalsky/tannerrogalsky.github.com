fn load() {
    let sphere = CsgCube(1., 1., 1.) ^ CsgSphere(1.35 / 2., 10, 10);
    let sphere = sphere.scale(1.5, 1.5, 1.5);
    // let sphere = sphere - sphere.scale(0.8, 0.8, 0.8);
    // let sphere = sphere + CsgCylinder(-0.5, 0., 0., 1.5, 0., 0., 0.5, 8);

    let inset = CsgCylinder(-2., 0., 0., 2., 0., 0., 0.5, 8)
        + CsgCylinder(0., -2., 0.,0., 2., 0., 0.5, 8)
        + CsgCylinder(0., 0., -2., 0., 0., 2., 0.5, 8);

    let shape = sphere - inset;

    let resources = #{
        shader: Shader(read_file("demoloop081.glsl")),
        shape: Geometry(shape),
    };

    Loop(720, 720, 6., resources)
}

fn update(ratio, width, height) {
    let ctx = Context();
    let bg = Color(0.05, 0.05, 0.05, 1.0);
    ctx.clear(bg);

    let shader = resources.shader;
    ctx.set_shader(shader);

    // let ratio = 0.;

    let tx = Translation(0., 0., -1.5);
    // let tx = tx * Rotation(0., 360. * 0.25, 0.);
    let tx = tx * Rotation(0., ratio * 360., 0.);

    let shape = resources.shape;
    ctx.draw(shape, tx);

    for j in range(0, 2) {
        const SAT_COUNT = 20;
        let r = j.to_float() / 2. * 180.;
        let tx = tx * Rotation(0., r, 0.);
        for i in range(0, SAT_COUNT) {
            let i = i.to_float();
            let ir = i / SAT_COUNT;

            let r = (ir + ratio) * 360.;

            let x = r.cos();
            let y = (r * 2.).sin() / 2.;
            let z = r.sin();
            let tx = tx * Rotation(45., 0., 0.);
            let tx = tx * Translation(z * 0.1, x * 1.2, y);
            let tx = tx * Rotation(y * 90., 0., 0.);

            ctx.draw(Box(0.1, 0.1, 0.1), tx);
        }
    }

    ctx.set_shader();

    ctx
}