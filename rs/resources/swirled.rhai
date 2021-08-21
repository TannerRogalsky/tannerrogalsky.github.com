fn update(ratio, width, height) {
    let ctx = Context();
    ctx.clear(Color(1.0, 1.0, 1.0, 1.0));
    ctx.set_orthographic();

    // ratio = 0.0;

    ctx.set_canvas(resources.canvas);
    ctx.clear(Color(0.0, 0.0, 0.0, 1.0));

    let square = Rectangle(0.0, 0.0, 64.0, 64.0);
    let fg = Color(1.0, 1.0, 1.0, 1.0);
    for y in range(0, 8) {
        for x in range(0, 8) {
            let index = x + y * 9;
            let t = Translation(x.to_float() * 64.0, y.to_float() * 64.0);
            if index % 2 == 1 {
                ctx.draw(square, fg, t);
            }
        }
    }
    ctx.set_canvas();

    let center = Translation(width / 2.0, height / 2.0, 0.0);
    let neg_center = Translation(-width / 2.0, -height / 2.0, 0.0);

    let scale = 1.0 / (1.0 - (ratio * (1.0 - 1.0 / 8.0)));

    let c = Translation(0.0, 0.0, 0.0);
    let c = c * center;
    let c = c * Translation(0.0, 0.0, -8.0 * 64.0);
    
    let c = c * Scale(scale, scale, scale);
    let c = c * Translation(ratio * 32.0, ratio * 32.0, 0.0);
    let c = c * neg_center;
    ctx.set_camera(c);

    let geom = Box(64.0, 64.0, 64.0);
    let black = Color(0.0, 0.0, 0.0, 1.0);
    let white = Color(1.0, 1.0, 1.0, 1.0);

    ctx.set_shader(resources.shader);

    let t = center;
    let t = t * Rotation(0.0, ratio * 360.0 * 0.5, 0.0);
    for y in range(0, 8) {
        for x in range(0, 8) {
            let index = x + y * 9;
            let ox = x.to_float() * 64.0 + 32.0;
            let oy = y.to_float() * 64.0 + 32.0;
            let oz = (index % 3 - 1).to_float() * 64.0;
            let t = t * Translation(ox, oy, oz) * neg_center;
            if index % 2 != 0 {
                ctx.image(geom, resources.canvas, t);
            }
        }
    }


    ctx
}