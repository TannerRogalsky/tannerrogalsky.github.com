fn load() {
    let resources = #{
        canvas: Canvas(720, 720),
    };

    Loop(720, 720, 3., resources)
}

fn update(ratio, width, height) {
    let ctx = Context();
    ctx.clear(Color(0.4, 0.4, 0.8, 1.0));

    ctx.set_canvas(resources.canvas);
    ctx.clear(Color(1.0, 1.0, 1.0, 1.0));
    let shape = RegularPolygon(0.0, 0.0, 6, 720.0);
    let tx = Translation(720.0 / 2.0, 720.0 / 2.0);
    let SHAPES = 5;
    for shape_index in range(0, SHAPES) {
        let shape_ratio = 1.0 - shape_index.to_float() / SHAPES.to_float() + ratio % 0.2;
        let tx = tx * Scale(shape_ratio);
        ctx.draw(shape, hsl(shape_ratio, 1.0, 0.5), tx);
    }
    ctx.set_canvas();

    let Z_INCR = -5.0;
    let Y_AXIS = 8;
    let X_AXIS = 4;

    let tx = Translation(0.0, 0.0, Z_INCR * (1.0 - ratio));

    for z in range(-1, 10) {
        for y in range(0, Y_AXIS) {
            let y_ratio = y.to_float() / Y_AXIS.to_float();
            for x in range(0, X_AXIS) {
                let index = x + y * X_AXIS;
                let inner_ratio = index.to_float() / (X_AXIS * Y_AXIS).to_float();

                let z = z.to_float() * Z_INCR - (inner_ratio * 360.0 * 4.0).sin() * Z_INCR * 0.8;

                let phi = (inner_ratio + ratio * 0.25) * 360.0;

                let rotate = ratio * 360.0 * 0.25;

                let box_geom = Box(1.0, 1.0, 1.0);
                let tx = tx * Translation(0.0, 0.0, z);
                let tx = tx * Rotation(0.0, 0.0, phi);
                let tx = tx * Translation(2.0 * (ratio * 180.0).sin() + 1.0, 0.0, 0.0);
                let tx = tx * Rotation(0.0, rotate, 0.0);
                ctx.image(box_geom, resources.canvas, tx);
            }
        }
    }

    ctx
}