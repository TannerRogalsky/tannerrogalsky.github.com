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

fn lerp(v0, v1, t) {
  return v0 + t * (v1 - v0);
  // return (1 - t) * v0 + t * v1;
}

fn update(ratio, width, height) {
    let ctx = Context();
    let bg = Color(0.1, 0.1, 0.1, 1.0);
    ctx.clear(bg);

    let white = Color(1., 1., 1., 1.);
    
    let ratio = 1.0;

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

    let size_factor = 0.25;
    // let size_factor_1 = 0.75;
    let size_factor_1 = 1.;

    let step = 1.;
    // let shape = Plane(step, step);

    let w = width / 4.;
    let wr = w / width;

    let z = 1. * size_factor / (90.).tan();
    let z1 = 1. * size_factor_1 / (90.).tan();
    let z2 = lerp(z, z1, ratio);

    // print(wr);

    let dx = d * 2. / width;
    let dy = d * -2. / -height;

    let dx = 0.;
    let dy = 0.;

    let tx = Translation(dx / wr, dy / wr, -0.5 / wr);
    // let tx = tx * Rotation(0., 0., ratio * 90.);
    ctx.set_camera(tx);

    let count = 8;
    for y in range(0, count) {
        let dx = -y.to_float() * ratio;

        let tx = Translation(dx / (count - 1), 0., 0.);
        let tx_y = Rotation(0., dx / (count - 1) * 180., 0.);
        for x in range(0, count) {
            let i = x + y * count;

            let color = white;
            if (i + y) % 2 == 1 {
                color = bg;
            }

            let x = (x - count / 2. + 0.5) / count;
            let y = (y - count / 2. + 0.5) / count;

            let tx = tx * Translation(x, y, 0.);

            ctx.draw(Plane(1. / count, 1. / count), color, tx);
        }
    }

    // for i in range(0, 4) {
    //     let c = white;
    //     if i % 2 == 0 {
    //         c = bg;
    //     }

    //     let inner = i.to_float() / 4. - ratio * 0.75;
    //     // let sf = lerp(size_factor, size_factor_1, (ratio + j / 4.) % 1.);
    //     let sf = lerp(size_factor, size_factor_1, ratio);
    //     let tx = Translation(0., 0., z - 0.5 / sf);
    //     // let tx = tx * Translation(0., 0., z_off);

    //     let tx = tx * Translation(0., 0., -step / 2.);
    //     let tx = tx * Rotation(0., inner * 360., 0.);
    //     let tx = tx * Translation(0., 0., step / 2.);

    //     let count = i * 2 + 2;
    //     for y in range(0, count) {
    //         for x in range(0, count) {
    //             let i = x + y * count;

    //             let color = white;
    //             if (i + y) % 2 == 1 {
    //                 color = bg;
    //             }

    //             let x = (x - count / 2. + 0.5) / count;
    //             let y = (y - count / 2. + 0.5) / count;

    //             let tx = tx * Translation(x, y, 0.);

    //             ctx.draw(Plane(1. / count, 1. / count), color, tx);
    //         }
    //     }
    // }

    ctx
}