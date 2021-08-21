fn load() {
    Loop(720, 720, 4., #{})
}

fn hex_pos(radius, x, y) {
    let apothem = radius * (180. / 6).cos();
    let tx = (x - 0.125 * x - (y * 0.25)) * radius * 2.;
    let ty = (y - 0.25 * x) * apothem * 2.;
    Translation(tx, ty)
}

fn tri_radius(radius) {
    let apothem = radius * (180. / 6.).cos();
    let side = 2. * apothem * (180. / 6.).tan();
    side / 2. / (180. / 3.).sin() / 2.
}

fn update(ratio, width, height) {
    let ctx = Context();

    const HEXAGON_COLOR = hsl(0., 0.9, 0.6);
    const TRIANGLE_COLOR = hsl(3.14, 0.9, 0.6);
    const BLACK = Color(0., 0., 0., 1.);

    let radius = width / 10.;
    let t_radius = tri_radius(radius);

    let hexagon = RegularPolygon(0., 0., 6, radius);
    let triangle = RegularPolygon(0., 0., 3, t_radius);
    let bg = Rectangle(0., 0., width, height);

    ctx.clear(BLACK);
    if ratio < 1. / 3. {
        ctx.draw(bg, TRIANGLE_COLOR);
        for y in range(0, 9) {
            for x in range(0, 9) {
                let tt = hex_pos(radius, x, y);
                let tt = tt * Rotation(ratio * 180.);
                ctx.draw(hexagon, HEXAGON_COLOR, tt);
                ctx.stroke(hexagon, BLACK, tt);
            }
        }
    } else {
        ctx.draw(bg, HEXAGON_COLOR);
        for y in range(0, 9) {
            for x in range(0, 9) {
                let tt = hex_pos(radius, x, y);
                ctx.stroke(hexagon, BLACK, tt);
            }
        }

        for y in range(0, 9) {
            for x in range(0, 9) {
                let tt = hex_pos(radius, x, y);

                {
                    let tt = tt * Translation(-radius, -t_radius);
                    let tt = tt * Rotation(ratio * 180. + 180. / 2. + 180. / 3.);
                    ctx.draw(triangle, TRIANGLE_COLOR, tt);
                    ctx.stroke(triangle, BLACK, tt);
                }
                
                {
                    let tt = tt * Translation(radius, t_radius);
                    let tt = tt * Rotation(ratio * 180. - 180. / 2. + 180. / 3.);
                    ctx.draw(triangle, TRIANGLE_COLOR, tt);
                    ctx.stroke(triangle, BLACK, tt);
                }
            }
        }
    }

    ctx
}