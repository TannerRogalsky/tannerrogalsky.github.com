fn update(ratio, width, height) {
    let ctx = Context();
    let bg = Color(0.1, 0.1, 0.1, 1.0);
    ctx.clear(bg);

    let blue = Color(0.2, 0.2, 0.8, 1.0);

    let count = 5;
    let span = 360. / count.to_float();


    let pie = Arc3D(width / 3., 20, 20, 0., span, 0., 180.);
    let lines = pie.hull;

    ctx.set_orthographic();
    let tx = Translation(width / 2., height / 2., -width * 0.75);
    let tx = tx * Rotation(90., 0., 180.);
    if ratio > 0.5 {
        tx = tx * Rotation(0., 0., -ratio * 360.);
        tx = tx * Rotation(0., -ratio * 360., 0.);
        tx = tx * Rotation(ratio * 360., 0., 0.);
    }

    let shader = resources.shader;
    for index in range(0, count) {
        let inner_ratio = index.to_float() / count.to_float();
        let color = hsl(6.28 * inner_ratio, 1.0, 0.5);

        let v = (ratio * 180.).sin();
        let v = v * v * width * 0.1;
        let extension = Translation(-v, 0., v);
        let tx = tx * Rotation(0., index.to_float() * span, 0.) * extension;

        ctx.set_shader(shader);
        ctx.draw(pie, color, tx);
        ctx.set_shader();
        ctx.draw(lines, tx * Scale(1.01, 1.01, 1.01));
    }

    ctx
}