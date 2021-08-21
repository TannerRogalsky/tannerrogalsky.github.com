fn update(ratio, width, height) {
    let ctx = Context();
    let bg = Color(0.1, 0.1, 0.1, 1.0);
    ctx.clear(bg);

    // let cube = CsgCube(1., 1., 2.);
    // let cube = cube.rotate(0., 1., 0., ratio * 360.);
    // let cube = cube + CsgCube(1., 1., 2.).rotate(1., 0., 1., ratio * 360.);

    let sphere = CsgCube(1., 1., 1.) ^ CsgSphere(1.35 / 2., 10, 10);
    let sphere = sphere.scale(1.5, 1.5, 1.5);
    // let sphere = sphere - sphere.scale(0.8, 0.8, 0.8);
    // let sphere = sphere + CsgCylinder(-0.5, 0., 0., 1.5, 0., 0., 0.5, 8);

    let inset = CsgCylinder(-2., 0., 0., 2., 0., 0., 0.5, 8)
        + CsgCylinder(0., -2., 0.,0., 2., 0., 0.5, 8)
        + CsgCylinder(0., 0., -2., 0., 0., 2., 0.5, 8);

    let shape = sphere - inset.rotate(1., 0.5, 0.25, ratio * 360.);
    // let shape = cube;

    let tx = Translation(0., 0., -2.);
    // let tx = tx * Rotation(0., ratio * 360., 0.);

    ctx.set_shader(resources.shader);
    ctx.draw(shape, tx);

    let tx = tx * Translation(0., 0., -4.);
    const COUNT = 5;
    for x in range(0, COUNT) {
        let ix = x.to_float() / (COUNT - 1);
        for y in range(0, COUNT) {
            let ir = (x * COUNT + y).to_float() / (COUNT * COUNT) + ratio;
            let iy = y.to_float() / (COUNT - 1);

            let x = (ix - 0.5) * COUNT * 2.;
            let y = (iy - 0.5) * COUNT * 2.;

            let tx = tx * Translation(x, y, 0.);
            let tx = tx * Rotation(ir * 360., -ir * 360., 0.);
            ctx.draw(shape, tx);
        }
    }

    ctx.set_shader();

    ctx
}