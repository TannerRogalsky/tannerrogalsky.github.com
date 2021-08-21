fn load() {
    Loop(720, 720, 3., #{})
}

fn update(ratio, width, height) {
    let ctx = Context();
    ctx.clear(Color(0.953, 0.945, 0.863, 1.));

    let tx = Translation(width / 2., height / 2.);

    const RED = Color(1., 0.725, 0.733, 1.);
    const BLACK = Color(0., 0., 0., 1.);
    const BLUE = Color(0.573, 0.680, 0.973, 1.);

    let rect = Rectangle(-width / 8., -height / 8., width / 4., height / 4.);
    let vertical = quad_inout(ratio);

    for i in range(-2, 2) {
        let tx = tx * Translation(0., height * i + vertical * height);

        const BG_SATS = 26;
        for i in range(0, BG_SATS) {
            let inner_ratio = i.to_float() / BG_SATS;
            let theta = (inner_ratio + ratio) * 360.;

            let y = (theta + (180. * (i % 2.))).sin();

            let x = ((ratio + inner_ratio) % 1.) * width * 1.75 - width / 2. * 1.5;
            let y = y * height / 2. / 3.;

            let tx = tx * Rotation(45.);
            let tx = tx * Translation(x, y);
            let tx = tx * Scale(0.25);
            ctx.draw(rect, BLUE, tx);
            ctx.stroke(rect, BLACK, tx);
        }

        {
            let tx = tx * Rotation(ratio * 360.);
            ctx.draw(rect, RED, tx);
            ctx.stroke(rect, BLACK, tx);
        }

        const SATS = 5;
        for i in range(0, SATS) {
            let inner_ratio = i.to_float() / SATS;
            let theta = inner_ratio * 360.;
            let tx = tx * Rotation(theta);
            let tx = tx * Translation(width / 4., 0.);
            let tx = tx * Scale(0.5);
            let tx = tx * Rotation(-ratio * 360.);
            ctx.draw(rect, RED, tx);
            ctx.stroke(rect, BLACK, tx);
        }
    }    

    ctx
}