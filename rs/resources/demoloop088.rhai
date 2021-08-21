fn load() {
    let resources = #{};

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

fn update(ratio, width, height) {
    let ctx = Context();
    let bg = Color(0.1, 0.1, 0.1, 1.0);
    ctx.clear(bg);

    let red = Color(1., 0.2, 0.4, 1.0);
    let blue = Color(0.4, 0.2, 1., 1.0);
    let green = Color(0.4, 0.8, 0.4, 1.0);
    let white = Color(1., 1., 1., 1.);

    let step = 1. / 10.;
    let shape = Plane(step, step);

    let z = 1. / 2. / (90.).tan();

    // let ratio = 1.;

    let d = width / 8.;
    for y in range(0, 8) {
        for x in range(0, 8) {
            let i = x + y * 8;
            let color = white;
            if (i + y) % 2 == 0 {
                color = bg;
            }
            ctx.draw(Rectangle(x * d, y * d, d, d), color);
        }
    }

    for i in range(0, 2) {
        let inner = i.to_float() / 4.;
        let z_off = (1.- ratio * 0.5);
        let tx = Translation(0., 0., z - z_off);

        let v = -quad_inout(ratio);
        let inner = inner + v / 4.;

        if i == 0 {
            for y in range(0, 4) {
                for x in range(0, 4) {
                    let i = x + y * 4;

                    let color = white;
                    if (i + y) % 2 == 1 {
                        color = bg;
                    }

                    let x = (x - 2. + 0.5) / 4.;
                    let y = (y - 2. + 0.5) / 4.;

                    let tx = tx * Translation(0., 0., -0.5);
                    let tx = tx * Rotation(0., inner * 360., 0.);
                    let tx = tx * Translation(0., 0., 0.5);

                    let tx = tx * Translation(x, y, 0.);

                    ctx.draw(Plane(1. / 4, 1. / 4), color, tx);
                }
            }
        } else {
            for y in range(0, 8) {
                for x in range(0, 8) {
                    let i = x + y * 8;

                    let color = white;
                    if (i + y) % 2 == 1 {
                        color = bg;
                    }

                    let x = (x - 4. + 0.5) / 8.;
                    let y = (y - 4. + 0.5) / 8.;

                    let tx = tx * Translation(0., 0., -0.5);
                    let tx = tx * Rotation(0., inner * 360., 0.);
                    let tx = tx * Translation(0., 0., 0.5);

                    let tx = tx * Translation(x, y, 0.);

                    ctx.draw(Plane(1. / 8, 1. / 8), color, tx);
                }
            }
        }
    }

    ctx
}