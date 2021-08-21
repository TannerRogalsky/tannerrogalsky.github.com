fn min(a, b) {
    if a < b {
        a
    } else {
        b
    }
}

fn max(a, b) {
    if a > b {
        a
    } else {
        b
    }
}

fn update(ratio, width, height) {
    let ctx = Context();
    ctx.clear(Color(0.2, 0.2, 0.2, 0.0));

    let p = width / 18.5;
    const LAYERS = 10;

    let ww = 317.;
    let wh = 597.;
    
    // let ar =  min(ww / wh, 1.);
    // let ar =  min(ww / wh, wh / ww);
    // let ar = ww / wh;

    let sx = ww / width;
    let sy = wh / height;
    let s = min(sx, sy);

    // ctx.set_orthographic(Rectangle(-width / ar - width / 2., 0., width * ar, height));
    // ctx.set_orthographic(Rectangle(0., 0., width * sx / s, height * sy / s));
    // ctx.set_orthographic(Rectangle(-ww / 2. + width / 2., 0., width * ar, height));

    // ctx.set_orthographic(Rectangle(-ww / 2. + width / 2., 0., width * sx, height * sy));
    // ctx.set_orthographic(Rectangle(0., 0., width * sx / ar, height * sy / ar));

    ctx.set_orthographic(Rectangle(
        // (-ww / 2. + width / 2.), 
        // (-wh / 2. + height / 2.),
        -width * sx / s / 2. + width / 2.,
        -height * sy / s / 2. + height / 2.,
        // -height * sy, 
        // -ww / 2. + width / 2.,
        // -wh / 2. + height / 2.,
        // 0., 
        // 0.,
        // -height * sy,
        width * sx / s, 
        height * sy / s
    ));

    for i in range(0, LAYERS) {
        let i = i.to_float();
        let p = p * i;

        let hue = ((i / LAYERS) * 6.28) % 6.28;

        let w = width - p * 2.;
        let h = height - p * 2.;

        let tx = Translation(w / 2. + p, h / 2. + p);
        // let tx = tx * Rotation((i / 10. + ratio) * 360. / 5.);
        // let tx = tx * Translation(p, p);

        ctx.draw(Rectangle(-w / 2., -h / 2., w, h), hsl(hue, 1.0, 0.5), tx);
        // ctx.draw(RegularPolygon(0., 0., 5, w), hsl(hue, 1.0, 0.5), tx);
    }

    ctx
}