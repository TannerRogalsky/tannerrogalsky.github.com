fn load() {
    let resources = #{};

    Loop(720, 720, 3., resources)
}

fn update(ratio, width, height) {
    let ctx = Context();
    let bg = Color(0.1, 0.1, 0.1, 1.0);
    ctx.clear(bg);

    let shape = Box();
    let tx = Translation(0., 0., -25.);
    // let tx = tx * Rotation(0., ratio * 360., 0.);
    let tx = tx * Rotation(45., 0., 45.);

    let phi = (ratio * 360. * 0.5).sin();
    let mu = phi * phi * phi;

    const noiseScale = 0.006;
    const noiseAmt = 2.;

    const D = 10;
    const H = D / 2;
    for z in range(0, D) {
        let zf = z.to_float() - H;
        for y in range(0, D) {
            let yf = y.to_float() - H;
            for x in range(0, D) {
                let xf = x.to_float() - H;

                let tx = tx * Translation(xf / H * D, yf / H * D, -zf / H * D);

                let n = noise(noiseScale * xf + 123, noiseScale * yf + 234, noiseScale * zf + 345);
                let on = n;
                let n = 2. * noiseAmt - noiseAmt * n;
                let n = (ratio + n) % 1.;

                // let color = hsl(x.to_float() / D * 6.28, y.to_float() / D, z.to_float() / D);
                let color = hsl(n * 6.28, 1.0, 0.5);

                let tx = tx * Scale(n + 0.5, n + 0.5, n + 0.5);

                ctx.draw(shape, color, tx);
            }
        }
    }

    ctx
}