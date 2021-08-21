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

    let step = 1. / 10.;
    let shape = Plane(step, step);

    let z = 1. / 2. / (90.).tan();

    for i in range(0, 4) {
        let c = red;
        if i % 2 == 0 {
            c = blue;
        }
        if i == 1 {
            c = green;
        }

        let inner = i.to_float() / 4.;
        let tx = Translation(0., 0., z - 1. / 2.);

        for y in range(0, 10) {
            let v = (y.to_float() / 9. * ratio);
            let v = clamp(v + ratio, -1., 1.);
            
            let inner = inner + v / 2.;

            for x in range(0, 10) {
                let x = (((x - 5).to_float() + 0.5) / 10.);
                let y = (((y - 5).to_float() + 0.5) / 10.);

                let tx = tx * Translation(0., 0., -0.5);
                let tx = tx * Rotation(0., inner * 360., 0.);
                let tx = tx * Translation(0., 0., 0.5);

                let tx = tx * Translation(x, y, 0.);

                ctx.draw(shape, c, tx);
            }
        }
    }

    ctx
}